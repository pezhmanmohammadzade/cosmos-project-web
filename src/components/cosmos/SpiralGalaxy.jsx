import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GALAXY_PARAMS = {
  count: 16000, 
  size: 0.04,
  radius: 12,
  branches: 3,
  spin: 1,
  randomness: 0.35,
  randomnessPower: 2.8,
  insideColor: '#ff5e33', // More radiant but controlled
  outsideColor: '#3d7fff', // More vivid but controlled
};

/**
 * GalaxyShader: Handles star distribution and soft glowing aesthetics.
 */
const GalaxyShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uSize: { value: 125.0 }, // True middle ground between 85 and 150
  },
  vertexShader: `
    uniform float uTime;
    uniform float uSize;
    attribute float aScale;
    attribute vec3 aRandomness;
    varying vec3 vColor;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Rotation based on distance from center
      float angle = atan(modelPosition.x, modelPosition.z);
      float distanceToCenter = length(modelPosition.xz);
      float angleOffset = (1.0 / distanceToCenter) * uTime * 0.08; // Slower, calmer
      angle += angleOffset;
      
      modelPosition.x = cos(angle) * distanceToCenter;
      modelPosition.z = sin(angle) * distanceToCenter;

      // Add randomness (shimmer)
      modelPosition.xyz += aRandomness * (sin(uTime * 0.4) * 0.1);

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;
      
      // Point size based on scale and distance
      gl_PointSize = uSize * aScale;
      gl_PointSize *= (1.0 / - viewPosition.z);
      
      vColor = color;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    void main() {
      // Soft but defined point (The Middle Ground)
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 5.0); // Softer than 6.0, sharper than 4.0

      // Richer luminance
      vec3 finalColor = vColor * (0.8 + strength * 1.5);
      gl_FragColor = vec4(finalColor, strength * 0.9);
    }
  `,
};

export default function SpiralGalaxy() {
  const pointsRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(GALAXY_PARAMS.count * 3);
    const colors = new Float32Array(GALAXY_PARAMS.count * 3);
    const scales = new Float32Array(GALAXY_PARAMS.count);
    const randomness = new Float32Array(GALAXY_PARAMS.count * 3);

    const insideColor = new THREE.Color(GALAXY_PARAMS.insideColor);
    const outsideColor = new THREE.Color(GALAXY_PARAMS.outsideColor);

    for (let i = 0; i < GALAXY_PARAMS.count; i++) {
      const i3 = i * 3;

      // Position
      const radius = Math.random() * GALAXY_PARAMS.radius;
      const spinAngle = radius * GALAXY_PARAMS.spin;
      const branchAngle = ((i % GALAXY_PARAMS.branches) / GALAXY_PARAMS.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;
      const randomY = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;
      const randomZ = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
      positions[i3 + 1] = 0; // Flat plane initial
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      // Color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / GALAXY_PARAMS.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Scale
      scales[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

    return geo;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      pointsRef.current.rotation.y += 0.0005; // Very slow calm rotation
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} rotation={[Math.PI / 4, 0, 0]}>
      <shaderMaterial
        args={[GalaxyShaderMaterial]}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

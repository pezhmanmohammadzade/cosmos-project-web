import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * WormholeShader: A custom GLSL shader for the 'Cosmic Interlink'.
 * Creates a swirling, pulsing tunnel effect.
 */
const WormholeShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorCenter: { value: new THREE.Color('#00F2FF') }, // Cyan
    uColorEdge: { value: new THREE.Color('#8A00FF') },   // Purple
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorCenter;
    uniform vec3 uColorEdge;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simplex Noise (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec4(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw), 0.0), 0.0).xyz;
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Swirling coordinate logic
      vec2 st = vUv * 2.0 - 1.0;
      float angle = atan(st.y, st.x) + uTime * 0.5;
      float dist = length(st);
      
      // Multi-layered noise for 'Data Stream' texture
      float noise = snoise(vec2(angle * 2.0, dist * 5.0 - uTime * 2.0));
      noise += snoise(vec2(angle * 4.0, dist * 10.0 - uTime * 3.0)) * 0.5;
      
      // Color mixing based on noise and distance
      vec3 color = mix(uColorEdge, uColorCenter, dist + noise * 0.3);
      float alpha = smoothstep(1.0, 0.2, dist) * (0.3 + noise * 0.7);
      
      // Enhance brightness (Cinematic boost)
      color *= 1.5 + noise;
      
      gl_FragColor = vec4(color, alpha * 0.4);
    }
  `
};

/**
 * WormholeConnector: The 3D component that visually 'interlinks' the two columns.
 */
export default function WormholeConnector() {
  const meshRef = useRef();
  
  // Create a horizontal spline for the 'Bridge' shape
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(-5, 1, -2),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(5, -1, -2),
      new THREE.Vector3(10, 0, 0),
    ]);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.z += 0.001; // Gentle axial rotation
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* 1. THE MAIN DATA TUNNEL */}
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, 100, 2, 32, false]} />
        <shaderMaterial
          args={[WormholeShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. INNER ENERGY STREAM (Sparkling particles) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sparkles
          count={200}
          scale={[15, 4, 4]}
          size={3}
          speed={0.5}
          opacity={0.3}
          color="#00F2FF"
        />
      </Float>

      {/* 3. ATMOSPHERIC HALO */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.05, 16, 100]} />
        <MeshDistortMaterial
          color="#8A00FF"
          transparent
          opacity={0.1}
          distort={0.5}
          speed={5}
        />
      </mesh>
    </group>
  );
}

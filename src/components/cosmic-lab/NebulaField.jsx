import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Custom Nebula Shader
const NebulaShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#7A00FF') },
    uOpacity: { value: 0.15 },
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
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 a0 = x - floor(x + 0.5);
      vec3 g = h - floor(h + 0.5);
      vec3 r = 1.0 - 1.7 * abs(a0) - 0.85 * abs(g);
      vec3 l = 1.0 / sqrt(a0*a0 + g*g + r*r);
      return 130.0 * dot(m, l * (a0*x0 + g*x12.xy + r*x12.zw));
    }

    void main() {
      float noise = snoise(vUv * 3.0 + uTime * 0.1);
      noise += 0.5 * snoise(vUv * 6.0 - uTime * 0.2);
      
      float alpha = smoothstep(-0.5, 1.0, noise) * uOpacity;
      // Edge fade
      float edge = 1.0 - length(vUv - 0.5) * 2.0;
      alpha *= smoothstep(0.0, 0.5, edge);

      gl_FragColor = vec4(uColor, alpha);
    }
  `
};

function NebulaLayer({ color, scale, speed, position, opacity }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * speed;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uOpacity: { value: opacity },
  }), [color, opacity]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={NebulaShader.fragmentShader}
        vertexShader={NebulaShader.vertexShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function NebulaField({ opacity = 1 }) {
  const isHighAtmosphere = opacity > 0.8;
  
  const layers = [
    { color: '#180B3A', scale: [30, 20, 30], speed: 0.2, position: [0, 0, -10], opacity: 0.15 * opacity },
    { color: '#7A00FF', scale: [25, 15, 25], speed: 0.3, position: [5, -5, -15], opacity: 0.1 * opacity },
    { color: '#00D2FF', scale: [20, 12, 20], speed: 0.4, position: [-5, 5, -20], opacity: 0.08 * opacity },
    { color: '#BD00FF', scale: [35, 25, 35], speed: 0.1, position: [0, 0, -30], opacity: 0.05 * opacity },
    // Volumetric Core - Only visible in high opacity (Nebula Mode)
    { color: '#00FFD1', scale: [15, 10, 15], speed: 0.6, position: [0, 0, -5], opacity: (isHighAtmosphere ? 0.2 : 0) * opacity },
  ];

  if (opacity <= 0.05) return null;

  return (
    <group>
      {/* Cosmic Dust layer - Dense in Nebula Mode */}
      <Sparkles
        count={isHighAtmosphere ? 1500 : 200}
        scale={[40, 30, 40]}
        size={isHighAtmosphere ? 3 : 2}
        speed={isHighAtmosphere ? 0.5 : 0.2}
        opacity={0.4 * opacity}
        color={isHighAtmosphere ? "#00FFD1" : "#00D2FF"}
      />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {layers.map((props, i) => (
          <NebulaLayer key={i} {...props} />
        ))}
      </Float>

      {/* Internal Glow Lights */}
      <pointLight position={[10, 5, -10]} intensity={2 * opacity} color="#7A00FF" distance={30} />
      <pointLight position={[-10, -5, -15]} intensity={2 * opacity} color="#00D2FF" distance={30} />
    </group>
  );
}

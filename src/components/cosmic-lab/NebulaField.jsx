import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { sharedGeometries } from '../../utils/shared-resources';

// Custom Nebula Shader stays the same as it's unique
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
      vec3 gx = vec3(a0.x * x0.x, a0.y * x12.x, a0.z * x12.z) + vec3(g.x * x0.y, g.y * x12.y, g.z * x12.w);
      return 130.0 * dot(m, gx);
    }

    void main() {
      float noise = snoise(vUv * 3.0 + vec2(uTime * 0.1));
      noise += 0.5 * snoise(vUv * 6.0 - vec2(uTime * 0.2));
      
      float alpha = smoothstep(-0.5, 1.0, noise) * uOpacity;
      float edge = 1.0 - length(vUv - vec2(0.5)) * 2.0;
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
      <primitive object={sharedGeometries.mediumPolySphere} attach="geometry" />
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
  if (opacity <= 0) return null;
  
  const isHighAtmosphere = opacity > 0.8;
  
  const layers = [
    { color: '#FF4500', scale: [30, 20, 30], speed: 0.15, position: [0, 0, -10], opacity: 0.12 * opacity },
    { color: '#76FF03', scale: [25, 15, 25], speed: 0.25, position: [5, -5, -15], opacity: 0.1 * opacity },
    { color: '#00D2FF', scale: [20, 12, 20], speed: 0.35, position: [-5, 5, -20], opacity: 0.15 * opacity },
    { color: '#0A0510', scale: [35, 25, 35], speed: 0.05, position: [0, 0, -30], opacity: 0.2 * opacity },
    { color: '#FF7043', scale: [15, 10, 15], speed: 0.5, position: [0, 0, -5], opacity: (isHighAtmosphere ? 0.25 : 0) * opacity },
  ];

  return (
    <group>
      <Sparkles
        count={isHighAtmosphere ? 2000 : 300}
        scale={[50, 40, 50]}
        size={isHighAtmosphere ? 4 : 2}
        speed={isHighAtmosphere ? 0.6 : 0.2}
        opacity={0.5 * opacity}
        color={isHighAtmosphere ? "#FF7043" : "#00D2FF"}
      />
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
        {layers.map((props, i) => (
          <NebulaLayer key={i} {...props} />
        ))}
      </Float>

      <pointLight position={[10, 5, -10]} intensity={3 * opacity} color="#FF4500" distance={40} />
      <pointLight position={[-10, -5, -15]} intensity={3 * opacity} color="#00D2FF" distance={40} />
    </group>
  );
}


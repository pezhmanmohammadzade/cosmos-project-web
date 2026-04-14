import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function CentralAstroObject() {
  const sphereRef = useRef();
  const auraRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.rotation.x = t * 0.1;
    }
    if (auraRef.current) {
      auraRef.current.rotation.y = -t * 0.1;
      // Gentle pulsing effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      auraRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, -10]}>
      {/* Core Energy Sphere */}
      <Sphere ref={sphereRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial 
          color="#00D2FF" 
          emissive="#BD00FF" 
          emissiveIntensity={0.5} 
          distort={0.4} 
          speed={2} 
          roughness={0.2} 
          metalness={0.8}
        />
      </Sphere>

      {/* Atmospheric Aura */}
      <Sphere ref={auraRef} args={[3, 32, 32]}>
        <meshBasicMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending} 
          side={THREE.BackSide} 
        />
      </Sphere>

      {/* Central Point Light to illuminate surrounding dust */}
      <pointLight 
        color="#00D2FF" 
        intensity={2} 
        distance={20} 
        decay={2} 
      />
    </group>
  );
}

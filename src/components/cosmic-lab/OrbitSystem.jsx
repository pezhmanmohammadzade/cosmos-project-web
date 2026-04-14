import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Orbiter({ radius, speed, size, color, offset = 0, intensity = 1 }) {
  const meshRef = useRef();
  const trailRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * intensity + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 0.5) * (radius * 0.2);
    
    meshRef.current.position.set(x, y, z);
  });

  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 0.5) * (radius * 0.2), Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(points, true);
  }, [radius]);

  return (
    <group>
      {/* Orbit Line */}
      <line rotation={[0, 0, 0]}>
        <bufferGeometry attach="geometry" setFromPoints={curve.getPoints(100)} />
        <lineBasicMaterial attach="material" color={color} transparent opacity={0.2 * intensity} />
      </line>

      {/* Orbiting Body */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2 * intensity} 
            toneMapped={false}
          />
          <pointLight color={color} intensity={1 * intensity} distance={5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function OrbitSystem({ intensity = 1 }) {
  const orbiters = [
    { radius: 6, speed: 0.5, size: 0.4, color: '#00D2FF', offset: 0 },
    { radius: 9, speed: 0.3, size: 0.6, color: '#BD00FF', offset: Math.PI / 2 },
    { radius: 12, speed: 0.2, size: 0.8, color: '#00FFD1', offset: Math.PI },
  ];

  return (
    <group>
      {/* Central Star */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#ffffff"
            emissive="#00D2FF"
            emissiveIntensity={1.5 * intensity}
            speed={2}
            distort={0.4}
            radius={1}
            toneMapped={false}
          />
        </Sphere>
        <pointLight intensity={5 * intensity} distance={20} color="#00D2FF" />
      </Float>

      {/* Orbiters */}
      {orbiters.map((props, i) => (
        <Orbiter key={i} {...props} intensity={intensity} />
      ))}
    </group>
  );
}

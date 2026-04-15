import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { keplerToCartesian, PLANET_DATA } from '../../utils/physics-utils';
import { sharedGeometries } from '../../utils/shared-resources';

function Orbiter({ planet, intensity = 1 }) {
  const meshRef = useRef();
  const { a, e, i, w, O, L, size, color, period, hasRings } = planet;
  
  // Logarithmic Distance Scaling: ensures Neptune isn't 30x further than Earth visually
  const getScaledA = (semiMajorAxis) => {
    return 8 + 12 * Math.log10(semiMajorAxis + 0.1);
  };

  const scaledA = useMemo(() => getScaledA(a), [a]);
  const SIZE_SCALE = 0.6;

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    const M = (L * (Math.PI / 180)) + (time / period) * 2 * Math.PI;
    
    const pos = keplerToCartesian(scaledA, e, i, w, O, M);
    if (meshRef.current) {
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  const curvePoints = useMemo(() => {
    const points = [];
    const segments = 128; // Keep at 128 for smooth orbit lines
    for (let j = 0; j <= segments; j++) {
      const M = (j / segments) * 2 * Math.PI;
      const pos = keplerToCartesian(scaledA, e, i, w, O, M);
      points.push(pos);
    }
    return points;
  }, [scaledA, e, i, w, O]);

  // LOD: Select geometry based on planet size
  const planetGeometry = useMemo(() => {
    if (size < 0.15) return sharedGeometries.lowPolySphere;
    return sharedGeometries.mediumPolySphere;
  }, [size]);

  return (
    <group>
      {/* Orbit Path - Already efficient with line + bufferGeometry */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={curvePoints} />
        <lineBasicMaterial attach="material" color={color} transparent opacity={0.2 * intensity} />
      </line>

      {/* Planet Body */}
      <group ref={meshRef}>
        <mesh scale={size * SIZE_SCALE}>
          <primitive object={planetGeometry} attach="geometry" />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.6 * intensity} 
            toneMapped={false}
          />
        </mesh>
        
        {/* Saturn's Rings (or other gas giants) */}
        {hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={size * 1.2}>
            <primitive object={sharedGeometries.unitRing} attach="geometry" />
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={0.4 * intensity} 
              side={THREE.DoubleSide} 
              toneMapped={false}
            />
          </mesh>
        )}

        <pointLight color={color} intensity={1 * intensity} distance={8} decay={2} />
      </group>
    </group>
  );
}

export default function OrbitSystem({ intensity = 1 }) {
  if (intensity <= 0) return null;

  return (
    <group>
      {/* The Sun (Central Star) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.1}>
        <mesh scale={2.5}>
          <primitive object={sharedGeometries.highPolySphere} attach="geometry" />
          <MeshDistortMaterial
            color="#FFFFFF"
            emissive="#FFD700"
            emissiveIntensity={2.5 * intensity}
            speed={2.5}
            distort={0.35}
            radius={1}
            toneMapped={false}
          />
        </mesh>
        <pointLight intensity={10 * intensity} distance={60} color="#FFD700" decay={1.5} />
      </Float>

      {/* Full Solar System rendering */}
      {PLANET_DATA.map((planet) => (
        <Orbiter key={planet.name} planet={planet} intensity={intensity} />
      ))}
    </group>
  );
}


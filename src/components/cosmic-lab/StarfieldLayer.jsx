import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarfieldLayer({ count = 3000, radius = 50, depth = 50, speed = 0.05 }) {
  const points = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorChoices = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#00D2FF'),
      new THREE.Color('#BD00FF'),
      new THREE.Color('#00FFD1'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution with variation
      const r = radius * (0.1 + Math.random() * 0.9);
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.15 + 0.05;
    }

    return { positions, colors, sizes };
  }, [count, radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += state.clock.getDelta() * speed;
      points.current.rotation.z += state.clock.getDelta() * (speed * 0.5);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

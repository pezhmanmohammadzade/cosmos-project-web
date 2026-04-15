import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { sharedMaterials } from '../../utils/shared-resources';

function DeepFieldGalaxy({ position, scale, color, rotationSpeed, type = 'spiral' }) {
  const points = useRef();
  
  const particles = useMemo(() => {
    const isSpiral = type === 'spiral';
    const count = isSpiral ? 800 : 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const baseColor = new THREE.Color(color);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      let x, y, z;
      if (isSpiral) {
        const angle = Math.random() * Math.PI * 8;
        const radius = Math.pow(Math.random(), 0.6) * 4;
        const armOffset = (i % 2) * Math.PI;
        x = radius * Math.cos(angle + armOffset) + (Math.random() - 0.5) * 0.4;
        y = (Math.random() - 0.5) * 0.15;
        z = radius * Math.sin(angle + armOffset) + (Math.random() - 0.5) * 0.4;
      } else {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.pow(Math.random(), 0.5) * 3;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta) * 0.6;
        z = r * Math.cos(phi);
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const dist = Math.sqrt(x*x + y*y + z*z) / 4;
      const mixedColor = new THREE.Color().lerpColors(new THREE.Color('#ffffff'), baseColor, dist);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [color, type]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <points ref={points} position={position} scale={scale}>
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
      <primitive object={sharedMaterials.galaxyPoints} attach="material" />
    </points>
  );
}


export default function GalaxiesField({ intensity = 1 }) {
  if (intensity <= 0) return null;

  // Redshift Color Logic: Distant galaxies (smaller scale) are redder
  const galaxies = useMemo(() => {
    const list = [];
    const count = 25;
    
    for (let i = 0; i < count; i++) {
      const zDepth = -30 - Math.random() * 70;
      const scaleVal = 0.5 + (Math.abs(zDepth) / 100) * 2;
      
      // Farther galaxies = Redder (Redshift)
      const redshiftFactor = Math.abs(zDepth) / 100;
      const goldColor = new THREE.Color('#FFD700');
      const redColor = new THREE.Color('#FF4500');
      const finalColor = new THREE.Color().lerpColors(goldColor, redColor, redshiftFactor);

      list.push({
        position: [
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 60,
          zDepth
        ],
        scale: [scaleVal, scaleVal * 0.8, scaleVal],
        color: `#${finalColor.getHexString()}`,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        type: Math.random() > 0.4 ? 'spiral' : 'elliptical'
      });
    }
    return list;
  }, []);

  return (
    <group>
      {galaxies.map((props, i) => (
        <DeepFieldGalaxy key={i} {...props} />
      ))}
    </group>
  );
}

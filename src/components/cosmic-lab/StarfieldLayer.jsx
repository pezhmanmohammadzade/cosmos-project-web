import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { raDecToVector3, bvToRGB } from '../../utils/physics-utils';
import starsData from '../../data/stars.json';
import { sharedMaterials } from '../../utils/shared-resources';

export default function StarfieldLayer({ radius = 100, speed = 0.05 }) {
  const points = useRef();

  const particles = useMemo(() => {
    const features = starsData.features;
    const count = features.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    features.forEach((feature, i) => {
      const i3 = i * 3;
      const { mag, bv } = feature.properties;
      const [ra, dec] = feature.geometry.coordinates;

      const pos = raDecToVector3(ra, dec, radius);
      positions[i3] = pos.x;
      positions[i3 + 1] = pos.y;
      positions[i3 + 2] = pos.z;

      const color = bvToRGB(parseFloat(bv) || 0);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.max(0.05, (6 - mag) * 0.05);
    });

    return { positions, colors, sizes };
  }, [radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += state.clock.getDelta() * speed;
      points.current.rotation.z += state.clock.getDelta() * (speed * 0.3);
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
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={sharedMaterials.starPoints} attach="material" />
    </points>
  );
}


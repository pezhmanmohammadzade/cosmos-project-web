import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Points, PointMaterial, Plane } from '@react-three/drei';
import * as THREE from 'three';

/**
 * BrandedCore: The high-fidelity 3D representation of the project identity.
 * Replaces generic astronomy placeholders with the's actual project assets.
 */
function BrandedCore({ iconUrl, xPct = 0, yPct = 0 }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const texture = useLoader(THREE.TextureLoader, iconUrl);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // High-inertia tilt following the mouse percentages
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, xPct * 0.4, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -yPct * 0.4, 0.1);
      
      // Floating animation
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.05 + Math.sin(t * 2) * 0.02);
      glowRef.current.position.z = -0.1;
    }
  });

  if (!iconUrl) return null;

  return (
    <group>
      {/* The main project asset plane */}
      <Plane ref={meshRef} args={[5.8, 5.8]}>
        <meshBasicMaterial 
          map={texture} 
          transparent 
          alphaTest={0.05}
          side={THREE.DoubleSide}
        />
        
        {/* Subtle holographic glow backing */}
        <Plane ref={glowRef} args={[5.9, 5.9]}>
          <meshBasicMaterial 
            map={texture} 
            transparent 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
            color="#FFFFFF"
          />
        </Plane>
      </Plane>
    </group>
  );
}

/**
 * PortalEnvironment: A cinematic deep-space starfield specifically for the portal background.
 */
function PortalEnvironment() {
  const points = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return positions;
  }, []);

  const pointRef = useRef();
  useFrame((state) => {
    if (pointRef.current) {
      pointRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Points positions={points} ref={pointRef}>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function CelestialCore({ appId, iconUrl, xPct = 0, yPct = 0 }) {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Cinematic Backdrop */}
          <PortalEnvironment />

          {/* Branded Hero Asset */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <BrandedCore iconUrl={iconUrl} xPct={xPct} yPct={yPct} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

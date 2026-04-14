import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { Trail, Sphere, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CometScene: The core logic for the 'Calm Comet' cursor.
 * Implements high-inertia tracking and a multi-spectral tapered trail.
 */
function CometScene() {
  const { mouse, viewport } = useThree();
  const headRef = useRef();
  const auraRef = useRef();
  const nucleusRef = useRef();
  const sparklesRef = useRef();
  
  const prevPos = useRef(new THREE.Vector3(0, 0, 0));
  const [color, setColor] = useState(new THREE.Color('#00D2FF'));

  // Pre-defined color nodes for the multi-spectral mix
  const colors = useMemo(() => ({
    cyan: new THREE.Color('#00D2FF'),
    purple: new THREE.Color('#BF00FF'),
    red: new THREE.Color('#FF2D00'),
    green: new THREE.Color('#39FF14')
  }), []);

  useFrame((state) => {
    if (!headRef.current) return;

    // Map mouse position to 3D world space
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    // CALM TRACKING: Reduced lerp factor (0.12) for smoother, weighted movement
    headRef.current.position.x = THREE.MathUtils.lerp(headRef.current.position.x, targetX, 0.12);
    headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, targetY, 0.12);
    
    // Sync other components
    auraRef.current.position.copy(headRef.current.position);
    nucleusRef.current.position.copy(headRef.current.position);
    sparklesRef.current.position.copy(headRef.current.position);

    // Speed calculation
    const velocity = headRef.current.position.distanceTo(prevPos.current);
    prevPos.current.copy(headRef.current.position);
    const speedFactor = Math.min(velocity * 12, 1.0);

    /** 
     * MULTI-SPECTRAL COLOR LOGIC
     * Mixes Cyan/Purple/Red/Green based on movement intensity
     */
    let nextColor = colors.cyan.clone();
    if (speedFactor > 0.2) nextColor.lerp(colors.purple, (speedFactor - 0.2) * 1.5);
    if (speedFactor > 0.6) nextColor.lerp(colors.red, (speedFactor - 0.6) * 1.5);
    if (speedFactor > 0.8) nextColor.lerp(colors.green, (speedFactor - 0.8) * 2.0);
    
    setColor(nextColor);

    // Nucleus and Aura dynamic updates
    if (nucleusRef.current.material) {
      nucleusRef.current.material.emissiveIntensity = 3 + speedFactor * 8;
      nucleusRef.current.scale.setScalar(1 + speedFactor * 0.3);
    }

    if (auraRef.current.material) {
      auraRef.current.material.distort = 0.3 + speedFactor * 0.3;
      auraRef.current.material.speed = 1.5 + speedFactor * 5;
      auraRef.current.material.opacity = 0.2 + speedFactor * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      {/* 1. STARDUST: Particles concentrated near the head */}
      <Sparkles
        ref={sparklesRef}
        count={60}
        scale={1.2}
        size={2.5}
        speed={0.3}
        opacity={0.3}
        color={color}
      />

      {/* 2. THE CALM TRAIL: Shorter length (7) with quadratic tapering */}
      <Trail
        width={1.4}
        length={7}
        color={color}
        attenuation={(t) => t * t * t} // Aggressive tapering for a sharp comet tail
      >
        <Sphere ref={headRef} args={[0.02, 16, 16]}>
          <meshBasicMaterial transparent opacity={0} />
        </Sphere>
      </Trail>

      {/* 3. THE COMA: Soft modern glow */}
      <Sphere ref={auraRef} args={[0.2, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.2}
          distort={0.3}
          speed={2}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 4. THE NUCLEUS: Bright white hot center */}
      <Sphere ref={nucleusRef} args={[0.06, 32, 32]}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={4}
          metalness={1}
          roughness={0}
        />
      </Sphere>
    </>
  );
}

export default function CometCursor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
        eventSource={typeof document !== 'undefined' ? document.body : null}
        eventPrefix="client"
      >
        <CometScene />
      </Canvas>
    </div>
  );
}

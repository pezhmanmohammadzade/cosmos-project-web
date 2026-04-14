import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PointMaterial, Points } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import CentralAstroObject from './CentralAstroObject';

function CosmicDust({ count = 1000 }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth group-level reaction to mouse
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
    
    pointsRef.current.rotation.z = t * 0.01;
    pointsRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D2FF"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
}

function DeepStarfield() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.003;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Stars radius={150} depth={50} count={12000} factor={2} saturation={0.5} fade speed={0.5} />
      <Stars radius={80} depth={50} count={3000} factor={6} saturation={1} fade speed={1.2} />
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const x = (state.pointer.x * 2) + Math.sin(t * 0.3) * 0.5;
    const y = (state.pointer.y * 2) + Math.cos(t * 0.3) * 0.5;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.02);
    state.camera.lookAt(0, 0, -20);
  });
  return null;
}

function LightRig() {
  const lightRef = useRef();
  useFrame((state) => {
    if (!lightRef.current || !state.viewport) return;
    lightRef.current.position.set(
      (state.pointer.x * state.viewport.width) / 2,
      (state.pointer.y * state.viewport.height) / 2,
      2
    );
  });
  return <pointLight ref={lightRef} intensity={2} color="#00D2FF" distance={20} />;
}

export default function AnimatedBackground() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-black">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ fov: 75, position: [0, 0, 8] }}
        gl={{ antialias: false, stencil: false, depth: false }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          
          <ambientLight intensity={0.1} />
          <LightRig />
          
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
            <DeepStarfield />
          </Float>
          
          <CosmicDust count={800} />
          
          {isHome && (
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
               <CentralAstroObject />
            </Float>
          )}
        </Suspense>
      </Canvas>
      
      {/* Cinematic Depth Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030303] to-transparent z-0 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.03)_0%,transparent_70%)] mix-blend-screen" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
    </div>
  );
}

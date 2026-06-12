import { Suspense, useMemo, useEffect, memo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import gsap from 'gsap';
import StarfieldLayer from './StarfieldLayer';
import OrbitSystem from './OrbitSystem';
import NebulaField from './NebulaField';
import GalaxiesField from './GalaxiesField';
import { LAB_MODES, modeConfigs } from '../../data/cosmicLabModes';

// Memoize heavy 3D sub-components
const MemoizedStarfield = memo(StarfieldLayer);
const MemoizedOrbitSystem = memo(OrbitSystem);
const MemoizedNebulaField = memo(NebulaField);
const MemoizedGalaxiesField = memo(GalaxiesField);

function CameraHandler({ distance }) {
  const { camera } = useThree();
  
  useEffect(() => {
    gsap.to(camera.position, {
      z: distance,
      duration: 2,
      ease: 'power3.inOut'
    });
  }, [distance, camera]);

  return null;
}

export default function CosmicLabScene({ mode = LAB_MODES.EXPLORE, isInteractive = false }) {
  const config = useMemo(() => modeConfigs[mode], [mode]);

  return (
    <div className="absolute inset-0 z-0 bg-cosmo-dark cursor-crosshair">
      <Canvas
        shadows
        gl={{ antialias: false, alpha: true, stencil: false, depth: true }}
        camera={{ position: [0, 0, 20], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ touchAction: isInteractive ? 'none' : 'pan-y' }}
      >
        <color attach="background" args={['#010103']} />
        
        <Suspense fallback={null}>
          <CameraHandler distance={config.cameraDist} />
          <ambientLight intensity={0.1} />
          
          <Grid 
            position={[0, -5, 0]}
            args={[100, 100]} 
            sectionSize={10} 
            sectionColor="#ffffff" 
            sectionThickness={0.5} 
            cellColor={config.accent} 
            cellThickness={0.2} 
            fadeDistance={50} 
            infiniteGrid
            fadeStrength={2}
            opacity={0.05}
          />

          <MemoizedStarfield 
            count={mode === LAB_MODES.EXPLORE ? 5000 : 2000} 
            speed={mode === LAB_MODES.EXPLORE ? 0.08 : 0.03} 
          />

          {config.galaxyIntensity > 0 && (
            <MemoizedGalaxiesField 
              intensity={config.galaxyIntensity} 
            />
          )}
          
          {config.orbitIntensity > 0 && (
            <MemoizedOrbitSystem 
              intensity={config.orbitIntensity} 
            />
          )}
          
          {config.nebulaOpacity > 0 && (
            <MemoizedNebulaField 
              opacity={config.nebulaOpacity} 
            />
          )}

          <Environment preset="city" />
          
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom 
              intensity={config.bloom} 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              height={200} // Reduced height for better performance
              mipmapBlur // Specialized blurring for better performance/quality
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Noise opacity={0.05} />
          </EffectComposer>
          
          <OrbitControls 
            enableZoom={isInteractive} 
            enablePan={false} 
            enableRotate={isInteractive}
            autoRotate={!isInteractive} 
            autoRotateSpeed={mode === LAB_MODES.EXPLORE ? 0.5 : 0.05}
            makeDefault
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cosmo-dark/40 via-transparent to-cosmo-dark/80" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}


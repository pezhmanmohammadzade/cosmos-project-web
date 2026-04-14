import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, Float, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import StarfieldLayer from './StarfieldLayer';
import OrbitSystem from './OrbitSystem';
import NebulaField from './NebulaField';
import { LAB_MODES, modeConfigs } from '../../data/cosmicLabModes';

export default function CosmicLabScene({ mode = LAB_MODES.EXPLORE }) {
  const config = useMemo(() => modeConfigs[mode], [mode]);

  return (
    <div className="absolute inset-0 z-0 bg-cosmo-dark cursor-crosshair">
      <Canvas
        shadows
        gl={{ antialias: false, alpha: true, stencil: false, depth: true }}
        camera={{ position: [0, 0, config.cameraDist], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#010103']} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          
          {/* Spatial Grid for orientation */}
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

          <StarfieldLayer 
            count={mode === LAB_MODES.EXPLORE ? 5000 : 2000} 
            speed={mode === LAB_MODES.EXPLORE ? 0.08 : 0.03} 
          />
          
          <OrbitSystem 
            intensity={config.orbitIntensity} 
          />
          
          <NebulaField 
            opacity={config.nebulaOpacity} 
          />

          <Environment preset="city" />
          
          <EffectComposer disableNormalPass>
            <Bloom 
              intensity={config.bloom} 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              height={300} 
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Noise opacity={0.05} />
          </EffectComposer>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={mode === LAB_MODES.EXPLORE ? 0.5 : 0.05}
            makeDefault
          />
        </Suspense>
      </Canvas>
      
      {/* Cinematic HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cosmo-dark/40 via-transparent to-cosmo-dark/80" />
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}

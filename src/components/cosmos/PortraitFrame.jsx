import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * PortraitSphereContent: High-visibility version.
 * Uses a front-facing Plane for the portrait to ensure 100% clarity and no distortion.
 */
function PortraitSphereContent({ url }) {
  const groupRef = useRef();
  const portraitRef = useRef();
  const sphereRef = useRef();
  const { mouse } = useThree();
  const [texture, setTexture] = useState(null);
  const [loadError, setLoadError] = useState(false);
  
  // High-reliability texture loading
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    
    // Trying absolute path first, then relative if needed
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
      setLoadError(false);
    }, undefined, (err) => {
      console.error("Texture loading failed for:", url, err);
      setLoadError(true);
    });
  }, [url]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Dynamic tilt following the mouse
      gsap.to(groupRef.current.rotation, {
        x: (mouse.y * -0.4),
        y: (mouse.x * 0.4),
        duration: 1.2,
        ease: 'power2.out'
      });
    }

    if (portraitRef.current) {
      // Subtle internal parallax shift
      gsap.to(portraitRef.current.position, {
        x: (mouse.x * 0.2),
        y: (mouse.y * 0.2),
        duration: 2,
        ease: 'power2.out'
      });
    }

    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.015);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. THE PORTRAIT PLANE: Ensuring maximum visibility and clarity */}
      <mesh ref={portraitRef} position={[0, 0, 0.5]}>
        <planeGeometry args={[3.8, 5.2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          opacity={texture ? 1 : 0.2}
          color={loadError ? "#FF0000" : (texture ? "#FFFFFF" : "#333333")}
        />
        
        {/* Border Frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.0, 5.4]} />
          <meshBasicMaterial color="#00D2FF" transparent opacity={0.3} />
        </mesh>
      </mesh>

      {/* 2. THE GLASS SPHERE */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[4.5, 64, 64]} />
        <meshPhysicalMaterial 
          color="#00D2FF" 
          transparent 
          opacity={0.1} 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0} 
          ior={1.1} // Near-zero refraction for maximum picture clarity
        />
      </mesh>

      {/* 3. ASTRONOMICAL DECORATIONS */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[4.7, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00D2FF" transparent opacity={0.4} />
      </mesh>
      
      {/* Background Soft Glow */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial 
          color="#00D2FF" 
          transparent 
          opacity={0.04} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}

export default function PortraitFrame() {
  return (
    <div className="w-full h-[600px] pointer-events-none md:pointer-events-auto">
      <Canvas alpha dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        <ambientLight intensity={1} /> {/* High ambient light for debug */}
        
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
          <PortraitSphereContent url="/assets/me.png" />
        </Float>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

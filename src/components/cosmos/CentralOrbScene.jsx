import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Ring } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * AccretionDiskMaterial: A custom shader for the swirling incandescent matter
 * around the singularity.
 */
const AccretionDiskMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#FFD700') }, // Gold
    uColorB: { value: new THREE.Color('#FFFFFF') }, // White
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;

    // Classic Perlin Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      float dist = length(vUv - 0.5) * 2.0;
      if (dist > 1.0 || dist < 0.4) discard;

      // Swirling noise for matter flow
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      float swirl = snoise(vec3(cos(angle) * 2.0, sin(angle) * 2.0, uTime * 0.5 + dist * 5.0));
      
      float alpha = smoothstep(0.4, 0.5, dist) * smoothstep(1.0, 0.8, dist);
      vec3 color = mix(uColorA, uColorB, swirl * 0.5 + 0.5);
      
      gl_FragColor = vec4(color * (1.5 + swirl), alpha * (0.8 + swirl * 0.2));
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide
};

function CinematicBlackHole() {
  const groupRef = useRef();
  const diskRef = useRef();
  const materialRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }
    
    if (groupRef.current) {
      // Slow gravitational precession
      groupRef.current.rotation.y = time * 0.05;
      
      // Adaptive tilt using lerp instead of creating new gsap tweens every frame
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (mouse.y * 0.15) + (time * 0.02),
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        (mouse.x * -0.15),
        0.05
      );
    }

    if (diskRef.current) {
      diskRef.current.rotation.z = -time * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Shadow: Event Horizon */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* The Photon Ring: Inner Glow */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
          side={THREE.BackSide}
        />
      </mesh>

      {/* The Accretion Disk */}
      <group ref={diskRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <Ring args={[2, 5, 128]}>
          <shaderMaterial ref={materialRef} args={[AccretionDiskMaterial]} />
        </Ring>
      </group>

      {/* Gravitational Lensing (Classic Interstellar Arc) */}
      <group rotation={[Math.PI / 12, 0, 0]}>
        <Ring args={[2.2, 2.5, 128]} position={[0, 0, 0.1]}>
          <meshBasicMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      <pointLight intensity={15} color="#FFD700" distance={20} />
      <pointLight position={[0, 0, -5]} intensity={5} color="#FFFFFF" />
    </group>
  );
}

export default function CentralOrbScene() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[4, 0, 0]}>
            <CinematicBlackHole />
          </group>
        </Float>

        <Sparkles 
          count={150} 
          scale={20} 
          size={1.5} 
          speed={0.15} 
          opacity={0.4} 
          color="#FFD700" 
        />
      </Canvas>
    </div>
  );
}

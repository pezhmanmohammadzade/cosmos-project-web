import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * SupernovaDiskMaterial: A high-contrast, architectural shader for the swirling accretion nebula.
 * Features irregular 'jagged matter' flow and a multi-spectral color map (Purple, Red, Blue, Green).
 */
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorPurple;
  uniform vec3 uColorRed;
  uniform vec3 uColorBlue;
  uniform vec3 uColorGreen;

  // Simplex Noise
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
    if (dist > 1.0 || dist < 0.2) discard;

    // Matter Flow noise
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float noise = snoise(vec3(cos(angle) * 3.0, sin(angle) * 3.0, uTime * 0.4 + dist * 5.0));
    
    // High-Vibrancy color mixing
    vec3 color = mix(uColorBlue, uColorPurple, noise * 0.5 + 0.5);
    if (noise > 0.3) color = mix(color, uColorRed, (noise - 0.3) * 2.0);
    if (noise < -0.3) color = mix(color, uColorGreen, (abs(noise) - 0.3) * 2.0);

    // Boosted output for visibility
    float edgeAlpha = smoothstep(0.2, 0.4, dist) * smoothstep(1.0, 0.7, dist);
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
    
    gl_FragColor = vec4(color * (3.0 + noise * 1.5) * pulse, edgeAlpha * (0.8 + noise * 0.2));
  }
`;

function CinematicSupernova() {
  const groupRef = useRef();
  const diskRef = useRef();
  const { mouse } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorPurple: { value: new THREE.Color('#BF00FF') },
    uColorRed: { value: new THREE.Color('#FF2D00') },
    uColorBlue: { value: new THREE.Color('#00D2FF') },
    uColorGreen: { value: new THREE.Color('#39FF14') },
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (diskRef.current) {
      diskRef.current.material.uniforms.uTime.value = time;
      diskRef.current.rotation.z = -time * 0.1;
    }

    if (groupRef.current) {
      // Smooth dynamic precession
      groupRef.current.rotation.y = time * 0.05;
      
      // High-Inertia Interactive Parallax (Increased range)
      gsap.to(groupRef.current.rotation, {
        x: (mouse.y * 0.4),
        z: (mouse.x * -0.4),
        duration: 1.5,
        ease: 'power2.out'
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. RADIANT CORE: Ultra-bright center */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      
      <mesh scale={1.15}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#BF00FF" transparent opacity={0.6} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>

      {/* 2. INFRARED ACCRETION DISK: Vibrant matter flow */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <shaderMaterial 
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. LENSING RING: Architectural outer Halo */}
      <group rotation={[Math.PI / 10, 0, 0]}>
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[8, 8.2, 128]} />
          <meshBasicMaterial color="#00D2FF" transparent opacity={0.4} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 4. STELLAR DEBRIS: Colorful particles */}
      <Sparkles count={250} scale={15} size={3} speed={0.2} opacity={0.6} color="#00D2FF" />
      <Sparkles count={200} scale={18} size={2} speed={0.25} opacity={0.5} color="#BF00FF" />

      <pointLight intensity={30} color="#BF00FF" distance={25} />
      <pointLight position={[0, 0, 5]} intensity={15} color="#FFFFFF" />
    </group>
  );
}

export default function GalacticCore() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none lg:pointer-events-auto">
      <Canvas alpha dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={30} />
        
        <ambientLight intensity={0.5} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <CinematicSupernova />
        </Float>

        <Stars radius={120} depth={50} count={4000} factor={6} saturation={0} fade speed={1.5} />
      </Canvas>
    </div>
  );
}

import{j as e,C as p,F as u,d as h,c as f,u as g,R as c}from"./three-fiber-oTuMs_Tf.js";import{r as o}from"./react-vendor-f6Fq2e2n.js";import{G as y,ag as n,D as d,w as x,r as v}from"./three-core-BsgSCmlZ.js";import{g as a}from"./animation-vendor-CqTqHfsO.js";import{S as j}from"./ScrollTrigger-YNBYSNen.js";const w={uniforms:{uTime:{value:0},uColorA:{value:new x("#FFD700")},uColorB:{value:new x("#FFFFFF")}},vertexShader:`
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
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
  `,transparent:!0,blending:n,side:d};function b(){const t=o.useRef(),r=o.useRef(),i=o.useRef(),{mouse:l}=f();return g(m=>{const s=m.clock.getElapsedTime();i.current&&(i.current.uniforms.uTime.value=s),t.current&&(t.current.rotation.y=s*.05,t.current.rotation.x=v.lerp(t.current.rotation.x,l.y*.15+s*.02,.05),t.current.rotation.z=v.lerp(t.current.rotation.z,l.x*-.15,.05)),r.current&&(r.current.rotation.z=-s*.2)}),e.jsxs("group",{ref:t,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1.5,64,64]}),e.jsx("meshBasicMaterial",{color:"#000000"})]}),e.jsxs("mesh",{scale:1.02,children:[e.jsx("sphereGeometry",{args:[1.5,64,64]}),e.jsx("meshBasicMaterial",{color:"#FFD700",transparent:!0,opacity:.8,blending:n,side:y})]}),e.jsx("group",{ref:r,rotation:[Math.PI/2.2,0,0],children:e.jsx(c,{args:[2,5,128],children:e.jsx("shaderMaterial",{ref:i,args:[w]})})}),e.jsx("group",{rotation:[Math.PI/12,0,0],children:e.jsx(c,{args:[2.2,2.5,128],position:[0,0,.1],children:e.jsx("meshBasicMaterial",{color:"#FFD700",transparent:!0,opacity:.4,blending:n,side:d})})}),e.jsx("pointLight",{intensity:15,color:"#FFD700",distance:20}),e.jsx("pointLight",{position:[0,0,-5],intensity:5,color:"#FFFFFF"})]})}function S(){return e.jsx("div",{className:"w-full h-full absolute inset-0 pointer-events-none",children:e.jsxs(p,{camera:{position:[0,0,10],fov:45},gl:{powerPreference:"high-performance",antialias:!0,alpha:!0},dpr:[1,1.5],children:[e.jsx("ambientLight",{intensity:.1}),e.jsx(u,{speed:1.5,rotationIntensity:.2,floatIntensity:.3,children:e.jsx("group",{position:[4,0,0],children:e.jsx(b,{})})}),e.jsx(h,{count:150,scale:20,size:1.5,speed:.15,opacity:.4,color:"#FFD700"})]})})}a.registerPlugin(j);function R(){const t=o.useRef(null);return o.useEffect(()=>{const r=a.context(()=>{a.from(".overview-element",{scrollTrigger:{trigger:t.current,start:"top 75%"},y:40,opacity:0,duration:1.2,stagger:.15,ease:"power3.out"})},t);return()=>r.revert()},[]),e.jsx("div",{ref:t,className:"relative w-full py-32 px-6 lg:px-24 bg-gradient-to-b from-transparent to-cosmo-dark/50",children:e.jsxs("div",{className:"max-w-4xl mx-auto text-center z-10 relative",children:[e.jsx("span",{className:"overview-element section-label text-cosmo-blue",children:"The Ecosystem"}),e.jsxs("h2",{className:"overview-element text-3xl md:text-5xl font-outfit font-bold mb-10 leading-snug",children:["Four Layers of ",e.jsx("br",{})," Cosmic Engagement"]}),e.jsxs("div",{className:"overview-element grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-left",children:[e.jsxs("div",{className:"p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors",children:[e.jsx("h3",{className:"text-xl font-bold font-outfit mb-3 text-white",children:"Discovery"}),e.jsx("p",{className:"text-sm text-white/50 leading-relaxed",children:"Experience the universe through poetic stories and interactive visual timelines."})]}),e.jsxs("div",{className:"p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors",children:[e.jsx("h3",{className:"text-xl font-bold font-outfit mb-3 text-white",children:"Analysis"}),e.jsx("p",{className:"text-sm text-white/50 leading-relaxed",children:"Dive into real NASA datasets, hunting for exoplanets using scientific methods."})]}),e.jsxs("div",{className:"p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors",children:[e.jsx("h3",{className:"text-xl font-bold font-outfit mb-3 text-white",children:"Simulation"}),e.jsx("p",{className:"text-sm text-white/50 leading-relaxed",children:"Guide civilizations through cosmic evolution and filter events to shape history."})]}),e.jsxs("div",{className:"p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors",children:[e.jsx("h3",{className:"text-xl font-bold font-outfit mb-3 text-white",children:"Exploration"}),e.jsx("p",{className:"text-sm text-white/50 leading-relaxed",children:"Embark on profound journeys across atmospheric 3D space environments."})]})]})]})})}export{S as C,R as a};

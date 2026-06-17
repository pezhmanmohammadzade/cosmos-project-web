import{j as e,C as u,h,F as g,a as v,c as f,u as b,d as m}from"./three-fiber-oTuMs_Tf.js";import{H as y}from"./index-CXGpBd6X.js";import{r as s}from"./react-vendor-f6Fq2e2n.js";import{g as n}from"./animation-vendor-CqTqHfsO.js";import"./CosmosOverview-C7bIeiDs.js";import{w as a,G as j,ag as d,D as x}from"./three-core-BsgSCmlZ.js";import"./ScrollTrigger-YNBYSNen.js";const w=`
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,N=`
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
`;function C(){const i=s.useRef(),t=s.useRef(),{mouse:o}=f(),r=s.useMemo(()=>({uTime:{value:0},uColorPurple:{value:new a("#BF00FF")},uColorRed:{value:new a("#FF2D00")},uColorBlue:{value:new a("#00D2FF")},uColorGreen:{value:new a("#39FF14")}}),[]);return b(l=>{const c=l.clock.getElapsedTime();t.current&&(t.current.material.uniforms.uTime.value=c,t.current.rotation.z=-c*.1),i.current&&(i.current.rotation.y=c*.05,n.to(i.current.rotation,{x:o.y*.4,z:o.x*-.4,duration:1.5,ease:"power2.out"}))}),e.jsxs("group",{ref:i,children:[e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1.2,64,64]}),e.jsx("meshBasicMaterial",{color:"#FFFFFF"})]}),e.jsxs("mesh",{scale:1.15,children:[e.jsx("sphereGeometry",{args:[1.2,64,64]}),e.jsx("meshBasicMaterial",{color:"#BF00FF",transparent:!0,opacity:.6,blending:d,side:j})]}),e.jsxs("mesh",{ref:t,rotation:[Math.PI/2.2,0,0],children:[e.jsx("planeGeometry",{args:[16,16]}),e.jsx("shaderMaterial",{vertexShader:w,fragmentShader:N,uniforms:r,transparent:!0,blending:d,side:x,depthWrite:!1})]}),e.jsx("group",{rotation:[Math.PI/10,0,0],children:e.jsxs("mesh",{position:[0,0,.1],children:[e.jsx("ringGeometry",{args:[8,8.2,128]}),e.jsx("meshBasicMaterial",{color:"#00D2FF",transparent:!0,opacity:.4,blending:d,side:x})]})}),e.jsx(m,{count:250,scale:15,size:3,speed:.2,opacity:.6,color:"#00D2FF"}),e.jsx(m,{count:200,scale:18,size:2,speed:.25,opacity:.5,color:"#BF00FF"}),e.jsx("pointLight",{intensity:30,color:"#BF00FF",distance:25}),e.jsx("pointLight",{position:[0,0,5],intensity:15,color:"#FFFFFF"})]})}function z(){return e.jsx("div",{className:"w-full h-full absolute inset-0 pointer-events-none lg:pointer-events-auto",children:e.jsxs(u,{alpha:!0,dpr:[1,2],children:[e.jsx(h,{makeDefault:!0,position:[0,0,24],fov:30}),e.jsx("ambientLight",{intensity:.5}),e.jsx(g,{speed:2,rotationIntensity:.5,floatIntensity:.5,children:e.jsx(C,{})}),e.jsx(v,{radius:120,depth:50,count:4e3,factor:6,saturation:0,fade:!0,speed:1.5})]})})}const p=(...i)=>i.filter(Boolean).join(" ");function E(){const i=s.useRef(null);return s.useEffect(()=>{const t=n.context(()=>{n.utils.toArray(".about-anim").forEach(r=>{n.from(r,{scrollTrigger:{trigger:r,start:"top 90%",toggleActions:"play none none none"},y:30,opacity:0,duration:1.2,ease:"power3.out"})})},i);return()=>t.revert()},[]),e.jsxs("div",{ref:i,className:"relative w-full min-h-screen pt-40 pb-40 px-6 lg:px-24",children:[e.jsxs(y,{children:[e.jsx("title",{children:"About | Pezhman Mohammadzadeh"}),e.jsx("meta",{name:"description",content:"Product designer and front-end architect specializing in building immersive, high-performance digital environments. Explore the trajectory and identity of a digital architect."}),e.jsx("meta",{property:"og:title",content:"About Pezhman Mohammadzadeh | Digital Architecture"})]}),e.jsx("div",{className:"fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-cosmo-navy/20 to-cosmo-dark/80"}),e.jsxs("div",{className:"relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-40",children:[e.jsxs("div",{className:"max-w-4xl",children:[e.jsx("span",{className:"about-anim section-label text-cosmo-blue/50 tracking-[0.5em] mb-6 block",children:"01 / Identity"}),e.jsxs("h1",{className:"about-anim text-5xl md:text-7xl font-outfit font-bold leading-[1.1] mb-8 text-white",children:["Pezhman ",e.jsx("span",{className:"text-cosmo-cyan",children:"Mohammadzadeh"})]}),e.jsx("p",{className:"about-anim text-2xl text-white/70 font-light max-w-3xl leading-relaxed mb-6",children:"A creative product designer and front-end architect specializing in building immersive, high-performance digital environments."}),e.jsxs("div",{className:"about-anim flex flex-wrap items-center gap-4 mb-8",children:[e.jsx("div",{className:"px-4 py-2 rounded-lg bg-cosmo-cyan/10 border border-cosmo-cyan/20 text-cosmo-cyan text-[10px] font-bold uppercase tracking-widest",children:"Architectural Logic"}),e.jsx("div",{className:"px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest",children:"DBE @ University of FEDERICO II"})]}),e.jsx("p",{className:"about-anim text-lg text-white/40 font-light max-w-2xl leading-relaxed",children:"My workflow is rooted in Architectural Logic applying spatial thinking, structural integrity, and human-centric proportions to digital architecture. I blend systematic engineering with cinematic visual identity to create tools that resonate emotionally."})]}),e.jsx("div",{className:"about-anim w-full h-[600px] flex justify-center lg:justify-end relative",children:e.jsx(z,{})})]}),e.jsxs("div",{className:"relative z-10 max-w-6xl mb-40",children:[e.jsx("span",{className:"about-anim section-label text-cosmo-purple/50 tracking-[0.5em] mb-8",children:"02 / Credentials"}),e.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8",children:[{id:"CS50x",title:"CS50x: Computer Science",org:"Harvard University",year:"2025",color:"bg-[#A51C30]",desc:"Foundations of computational thinking, algorithms, and data structures across multiple languages.",url:"https://cs50.harvard.edu/certificates/677883b6-1bc6-42bf-8eb4-8d9af87774a8"},{id:"cs50python",title:"CS50 Python: Programming",org:"Harvard University",year:"2025",color:"bg-[#A51C30]",desc:"Advanced scripting, automated testing, and robust object-oriented programming patterns.",url:"https://cs50.harvard.edu/certificates/ff32bb7e-76fb-4c96-893e-f608429e8b8d"},{id:"CS50AI",title:"CS50 AI: Artificial Intelligence",org:"Harvard University",year:"2025",color:"bg-[#A51C30]",desc:"Exploration of search algorithms, machine learning, and neural networks for intelligent systems.",url:"https://cs50.harvard.edu/certificates/f80cc9c2-0797-4a69-b57e-8a4e72dbf982"}].map(t=>e.jsxs("div",{className:"about-anim relative p-10 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/[0.06] transition-all duration-500 group flex flex-col min-h-[450px]",children:[e.jsx("div",{className:`absolute -top-20 -right-20 w-80 h-80 ${t.color} opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-700`}),e.jsxs("div",{className:"flex justify-between items-start mb-8 z-10",children:[e.jsx("div",{className:"w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{d:"M12 15l-3 3-5-5M22 4L12 14l-3-3",className:"text-white/80"})})}),e.jsx("p",{className:"text-[10px] font-mono text-white/30 tracking-[0.3em]",children:t.year})]}),e.jsxs("div",{className:"relative z-10 mb-auto",children:[e.jsx("h3",{className:"text-2xl font-bold font-outfit text-white mb-2 group-hover:text-cosmo-blue transition-colors duration-500",children:t.title}),e.jsx("p",{className:"text-xs text-white/40 uppercase tracking-[0.2em] mb-6",children:t.org}),e.jsx("p",{className:"text-sm text-white/60 font-light leading-relaxed max-w-[90%]",children:t.desc})]}),e.jsxs("div",{className:"relative w-full h-32 mt-8 mb-8 rounded-xl overflow-hidden bg-black/40 border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]",children:[e.jsx("img",{src:`/assets/certificates/${t.id}.png`,alt:t.title,className:"w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500",onError:o=>o.target.style.display="none"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"})]}),e.jsxs("div",{className:"mt-4 pt-6 border-t border-white/5 flex items-center justify-between z-10",children:[e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 group/link",children:["Verify Credential",e.jsx("span",{className:"w-4 h-[1px] bg-white/20 group-hover/link:w-8 transition-all duration-300"})]}),e.jsx("div",{className:`w-2 h-2 rounded-full ${t.color} animate-pulse opacity-50`})]})]},t.id))})]}),e.jsxs("div",{className:"relative z-10 max-w-6xl",children:[e.jsx("span",{className:"about-anim section-label text-cosmo-cyan/50 tracking-[0.5em] mb-8",children:"03 / Trajectory"}),e.jsx("div",{className:"about-anim relative w-full p-1 lg:p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 to-transparent",children:e.jsxs("div",{className:"w-full bg-black/80 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-10 md:p-20 flex flex-col items-start relative",children:[e.jsx("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cosmo-blue/5 blur-[150px] pointer-events-none"}),e.jsxs("div",{className:"w-full flex flex-col md:flex-row md:items-start justify-between gap-12 z-10 mb-20",children:[e.jsxs("div",{className:"max-w-xl",children:[e.jsx("h3",{className:"text-5xl lg:text-6xl font-bold font-outfit mb-6",children:"Professional Record"}),e.jsx("p",{className:"text-xl text-white/50 font-light leading-relaxed",children:"Design leadership, technical architecture, and a specialized background in spatial design."})]}),e.jsxs("a",{href:"/assets/resume.pdf",download:!0,className:"shrink-0 group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500",children:[e.jsx("div",{className:"absolute inset-0 bg-white group-hover:bg-cosmo-blue transition-colors duration-500"}),e.jsx("span",{className:"relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-black",children:"Download Resume"})]})]}),e.jsx("div",{className:"w-full space-y-20 z-10",children:[{date:"OCT 2025 - JUL 2026",role:"Apple Developer Academy Participant",company:"Federico II University of Naples",points:["Focus on UI/UX design and human-centered product design.","Translating user needs into intuitive interfaces within the Apple ecosystem.","Designing digital products from concept to MVP in multidisciplinary teams."],isCurrent:!0},{date:"2025",role:"Computer Science & AI (CS50)",company:"Harvard University",points:["Completed CS50x (Computer Science), CS50 Python, and CS50 AI programs.","Built a strong foundation in algorithms, machine learning, and intelligent systems.","Applied automated testing and robust object-oriented programming patterns."]},{date:"DEC 2025 - PRESENT",role:"Founder & Architect",company:"Cosmos Project Ecosystem",points:["Developing an interconnected ecosystem of space-focused applications.","Integrating data science and real-world NASA datasets for scientific exploration (e.g., CosmoQuest AI).","Goal: To create digital experiences that merge art, science, and innovation into emotionally engaging and futuristic designs."],isCurrent:!0},{date:"NOV 2024 - PRESENT",role:"Digital Product & Interaction Designer",company:"Freelance / Specialized Projects",points:["Built high-fidelity web experiences using HTML, Python, React, Three.js, and GSAP.","Focused on immersive interaction patterns, AI integration, and micro-animations."]},{date:"OCT 2023 - PRESENT",role:"Master's degree in Design for the Built Environment",company:"Federico II University of Naples",points:["Digital Design specialization.","Combining architectural thinking with emerging technologies and UI/UX design."]}].map((t,o)=>e.jsxs("div",{className:p("grid grid-cols-1 md:grid-cols-4 gap-8 group/milestone",t.isCurrent&&"relative"),children:[e.jsx("div",{className:"md:col-span-1",children:e.jsx("p",{className:p("text-xs font-mono tracking-widest mb-2 transition-colors duration-500",t.isCurrent?"text-cosmo-blue":"text-white/30 group-hover/milestone:text-white/60"),children:t.date})}),e.jsxs("div",{className:"md:col-span-3 border-l border-white/10 pl-8 md:pl-12 pb-4",children:[e.jsx("h4",{className:"text-2xl font-bold mb-2 text-white group-hover/milestone:text-cosmo-blue transition-colors duration-500",children:t.role}),e.jsx("p",{className:"text-sm font-bold text-white/40 uppercase tracking-widest mb-6",children:t.company}),e.jsx("ul",{className:"space-y-4",children:t.points&&t.points.map((r,l)=>e.jsxs("li",{className:"text-sm text-white/50 font-light flex items-start gap-4 leading-relaxed",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0"}),r]},l))})]})]},o))})]})})]})]})}export{E as default};

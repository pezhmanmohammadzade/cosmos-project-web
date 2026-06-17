import{u as c,j as e,F as m,d,M as x,C as p}from"./three-fiber-oTuMs_Tf.js";import{H as u}from"./index-CXGpBd6X.js";import{r as o}from"./react-vendor-f6Fq2e2n.js";import{g as i}from"./animation-vendor-CqTqHfsO.js";import{av as h,d as r,D as v,ag as g,w as l}from"./three-core-BsgSCmlZ.js";const f={uniforms:{uTime:{value:0},uColorCenter:{value:new l("#00F2FF")},uColorEdge:{value:new l("#8A00FF")}},vertexShader:`
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uTime;
    uniform vec3 uColorCenter;
    uniform vec3 uColorEdge;
    varying vec2 vUv;
    varying vec3 vPosition;

    // Simplex Noise (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec4(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw), 0.0), 0.0).xyz;
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Swirling coordinate logic
      vec2 st = vUv * 2.0 - 1.0;
      float angle = atan(st.y, st.x) + uTime * 0.5;
      float dist = length(st);
      
      // Multi-layered noise for 'Data Stream' texture
      float noise = snoise(vec2(angle * 2.0, dist * 5.0 - uTime * 2.0));
      noise += snoise(vec2(angle * 4.0, dist * 10.0 - uTime * 3.0)) * 0.5;
      
      // Color mixing based on noise and distance
      vec3 color = mix(uColorEdge, uColorCenter, dist + noise * 0.3);
      float alpha = smoothstep(1.0, 0.2, dist) * (0.3 + noise * 0.7);
      
      // Enhance brightness (Cinematic boost)
      color *= 1.5 + noise;
      
      gl_FragColor = vec4(color, alpha * 0.4);
    }
  `};function b(){const a=o.useRef(),t=o.useMemo(()=>new h([new r(-10,0,0),new r(-5,1,-2),new r(0,0,1),new r(5,-1,-2),new r(10,0,0)]),[]);return c(s=>{a.current&&(a.current.material.uniforms.uTime.value=s.clock.getElapsedTime(),a.current.rotation.z+=.001)}),e.jsxs("group",{position:[0,0,-5],children:[e.jsxs("mesh",{ref:a,children:[e.jsx("tubeGeometry",{args:[t,100,2,32,!1]}),e.jsx("shaderMaterial",{args:[f],transparent:!0,depthWrite:!1,blending:g,side:v})]}),e.jsx(m,{speed:2,rotationIntensity:.5,floatIntensity:.5,children:e.jsx(d,{count:200,scale:[15,4,4],size:3,speed:.5,opacity:.3,color:"#00F2FF"})}),e.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[8,.05,16,100]}),e.jsx(x,{color:"#8A00FF",transparent:!0,opacity:.1,distort:.5,speed:5})]})]})}function n({label:a,value:t,colorClass:s="text-cosmo-blue"}){return e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-[0.3em] text-white/20",children:a}),e.jsx("span",{className:`text-[10px] uppercase tracking-widest font-mono ${s}`,children:t})]})}function z(){const a=o.useRef(null);return o.useEffect(()=>{const t=i.context(()=>{i.from(".contact-beautify-anim",{y:30,opacity:0,duration:1.2,stagger:.1,ease:"power3.out",delay:.4})},a);return()=>t.revert()},[]),e.jsxs("div",{ref:a,className:"relative w-full min-h-screen pt-40 pb-40 px-6 lg:px-24 overflow-hidden",children:[e.jsxs(u,{children:[e.jsx("title",{children:"Contact | Initiate Connection"}),e.jsx("meta",{name:"description",content:"Reach out for architectural challenges, innovative collaborations, and cosmic inquiries. My communication bridge is open."}),e.jsx("meta",{property:"og:title",content:"Contact Pezhman Mohammadzadeh | Secure Transmission"})]}),e.jsx("div",{className:"fixed inset-0 z-0 pointer-events-none opacity-60",children:e.jsxs(p,{camera:{position:[0,0,10],fov:45},children:[e.jsx("ambientLight",{intensity:.5}),e.jsx(b,{})]})}),e.jsxs("div",{className:"relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start",children:[e.jsxs("div",{className:"contact-beautify-anim p-10 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]",children:[e.jsxs("div",{className:"flex justify-between items-start mb-12",children:[e.jsx("span",{className:"section-label text-cosmo-cyan/50 tracking-[0.5em] text-[10px] uppercase",children:"Origin_Signal"}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx(n,{label:"Status",value:"Linked",colorClass:"text-green-400"}),e.jsx(n,{label:"Coord",value:"40.71° N"})]})]}),e.jsxs("h1",{className:"text-5xl md:text-7xl font-outfit font-bold leading-[1.1] mb-8 text-white",children:["Initiate ",e.jsx("br",{})," ",e.jsx("span",{className:"text-cosmo-cyan",children:"Contact."})]}),e.jsx("p",{className:"text-xl text-white/50 font-light leading-relaxed mb-16 max-w-md",children:"My communication bridge is open for architectural challenges, innovative collaborations, and cosmic inquiries."}),e.jsx("div",{className:"space-y-12",children:e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsx("span",{className:"w-16 h-[1px] bg-white/10"}),e.jsx("div",{className:"flex gap-6",children:[{name:"Instagram",url:"https://www.instagram.com/_thepejman/",icon:e.jsx("path",{d:"M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z M16.5 7.5a.5.5 0 11-1 0 .5.5 0 011 0z"})},{name:"LinkedIn",url:"https://www.linkedin.com/in/pezhman-mohammadzadeh-21462838a/",icon:e.jsx("path",{d:"M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.7-2.1 1.2v-1h-3v7.8h3v-4.2c0-.2 0-.5.1-.7.2-.5.6-.9 1.2-.9.8 0 1.1.6 1.1 1.5v4.3h3M7.3 18.5V8.8h-3v9.7h3M5.8 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"})},{name:"GitHub",url:"https://github.com/pezhmanmohammadzade",icon:e.jsx("path",{d:"M12 2A10 10 0 0 0 2 12c0 4.4 2.8 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.4-1 .6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-1.9 1.1-2.6-.1-.3-.5-1.2.1-2.5 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.3.2 2.2.1 2.5.7.7 1.1 1.5 1.1 2.6 0 3.8-2.3 4.7-4.5 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z"})}].map(t=>e.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer","aria-label":`Follow Pezhman on ${t.name}`,className:"w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 hover:text-cosmo-cyan transition-all duration-500 hover:scale-110 hover:bg-cosmo-cyan/10 hover:border-cosmo-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] group",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",children:t.icon})},t.name))})]})})]}),e.jsxs("div",{className:"contact-beautify-anim p-10 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]",children:[e.jsxs("div",{className:"flex justify-between items-start mb-12",children:[e.jsx("span",{className:"section-label text-cosmo-purple/50 tracking-[0.5em] text-[10px] uppercase",children:"Comm_Channel"}),e.jsx(n,{label:"Encryption",value:"Quantum_256",colorClass:"text-cosmo-cyan"})]}),e.jsxs("form",{name:"contact",method:"POST","data-netlify":"true",className:"space-y-12",children:[e.jsx("input",{type:"hidden",name:"form-name",value:"contact"}),e.jsxs("div",{className:"relative group",children:[e.jsx("input",{id:"contact-name",name:"name",type:"text",required:!0,className:"w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-blue transition-all duration-500 peer",placeholder:"Name"}),e.jsx("label",{htmlFor:"contact-name",className:"absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-blue peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none",children:"Identifier"})]}),e.jsxs("div",{className:"relative group",children:[e.jsx("input",{id:"contact-email",name:"email",type:"email",required:!0,className:"w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-purple transition-all duration-500 peer",placeholder:"Email"}),e.jsx("label",{htmlFor:"contact-email",className:"absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-purple peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none",children:"Return Vector"})]}),e.jsxs("div",{className:"relative group",children:[e.jsx("input",{id:"contact-message",name:"message",required:!0,className:"hidden"}),e.jsx("textarea",{id:"contact-message-area",name:"message",required:!0,className:"w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-cyan transition-all duration-500 peer resize-none",rows:"3",placeholder:"Message"}),e.jsx("label",{htmlFor:"contact-message-area",className:"absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-cyan peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none",children:"Payload"})]}),e.jsxs("button",{className:"w-full py-6 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 bg-white/[0.05] hover:bg-white hover:text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] group overflow-hidden relative",children:[e.jsx("span",{className:"relative z-10",children:"Initiate Transmission"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-cosmo-cyan/0 via-white/10 to-cosmo-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"})]}),e.jsx("div",{className:"pt-12 border-t border-white/5 mt-16",children:e.jsxs("a",{href:"mailto:pejmanmohamadzade22@gmail.com",className:"group flex items-center justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cosmo-cyan/30 transition-all duration-500",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-widest text-white/20 mb-1",children:"Direct Link"}),e.jsx("span",{className:"text-sm font-mono text-white/60 group-hover:text-cosmo-cyan transition-colors",children:"pejmanmohamadzade22@gmail.com"})]}),e.jsx("div",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cosmo-cyan group-hover:text-black transition-all duration-500",children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"7",y1:"17",x2:"17",y2:"7"}),e.jsx("polyline",{points:"7 7 17 7 17 17"})]})})]})})]})]})]})]})}export{z as default};

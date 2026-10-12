import{a as i,s as w,j as e,c as $,S as B,B as l,A as v,m as j,d as k,X as D}from"./index-Br3Jnrrq.js";import{V as N,t as S}from"./video-modal-DVLX04Ex.js";import{g as R}from"./youtube-id-COWL1nLO.js";import{u as F}from"./use-cms-content-DZE2CL6a.js";import{S as G}from"./search-CYFDqWFy.js";import{C}from"./chevron-left-D-Z9EiTs.js";import{C as _}from"./chevron-right-cZt7zZGI.js";import{P as O}from"./play-BPu78BLq.js";const q={heading:"Take a Virtual Tour of Our Clinic",subtext:"Explore our facilities from the comfort of your home.",button_text:"Watch Tour Video",video_url:"",autoplay:!1,is_active:!0},M=["All","Clinic","Team","Patients","Events","Videos"];function U(s){if(!s)return"";if(s.includes("supabase.co")&&s.includes("/storage/v1/object/public/")){const p=s.replace("/storage/v1/object/public/","/storage/v1/render/image/public/"),m=p.includes("?")?"&":"?";return`${p}${m}width=800&quality=75&format=webp`}return s}function Z(){const[s,p]=i.useState([]),[m,P]=i.useState([]),[c,T]=i.useState("All"),[x,d]=i.useState(null),[h,g]=i.useState(null),[E,f]=i.useState(!1),r=F("virtual_tour",q),b=i.useRef(null);i.useEffect(()=>{w.from("gallery_items").select("*").eq("status","published").order("display_order").then(({data:t})=>p(t||[])),w.from("podcasts").select("*").eq("is_active",!0).order("order_index",{ascending:!0}).then(({data:t})=>P(t||[]))},[]);const n=i.useMemo(()=>c==="All"?s:c==="Videos"?s.filter(t=>t.media_type==="video"):s.filter(t=>t.category===c),[s,c]),z=()=>d(t=>t===null?null:(t+1)%n.length),A=()=>d(t=>t===null?null:(t-1+n.length)%n.length);return e.jsxs($,{title:"Gallery",breadcrumb:"Gallery",children:[e.jsxs(B,{bg:"white",children:[e.jsx("div",{className:"flex flex-wrap justify-center gap-3 mb-10",children:M.map(t=>{const o=c===t;return e.jsx("button",{onClick:()=>T(t),className:"px-5 py-2 rounded-full font-semibold text-sm transition-all",style:{background:o?l.pink:"white",color:o?"white":l.pink,border:`1px solid ${l.pink}`},children:t},t)})}),n.length===0?e.jsx("div",{className:"text-center py-16 text-muted-foreground",children:"No items in this category yet."}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              .gallery-img-wrap { position: relative; }
              .gallery-img-skeleton {
                position: absolute; inset: 0;
                background: linear-gradient(90deg, #f0e0e8 25%, #fce4ec 50%, #f0e0e8 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: inherit;
                transition: opacity 0.3s ease;
              }
              .gallery-img-loaded { opacity: 0; pointer-events: none; }
            `}),e.jsx("div",{style:{columnCount:3,columnGap:16,contentVisibility:"auto",containIntrinsicSize:"300px"},className:"max-md:!columns-2 max-sm:!columns-1",children:e.jsx(v,{mode:"popLayout",children:n.map((t,o)=>{const y=t.media_type==="video",L=t.thumbnail||t.url,V=U(L);return e.jsxs(j.div,{layout:!0,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.35},className:"mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden gallery-img-wrap",onClick:()=>y?g(t.video_url||t.url):d(o),children:[e.jsx("img",{src:V,alt:t.title||"",loading:"lazy",decoding:"async",onLoad:u=>{const a=u.currentTarget.parentElement?.querySelector(".gallery-img-skeleton");a&&a.classList.add("gallery-img-loaded")},className:"w-full transition-transform duration-300 group-hover:scale-[1.03]",style:{objectFit:"cover",display:"block"}}),e.jsx("div",{className:"gallery-img-skeleton","aria-hidden":"true"}),y?e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx("div",{className:"rounded-full flex items-center justify-center transition-all duration-[250ms]",style:{width:60,height:60,background:"rgba(255,255,255,0.92)",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"},onMouseEnter:u=>{const a=u.currentTarget;a.style.background="#ffffff",a.style.transform="scale(1.12)",a.style.boxShadow="0 0 0 8px rgba(230,0,126,0.15)"},onMouseLeave:u=>{const a=u.currentTarget;a.style.background="rgba(255,255,255,0.92)",a.style.transform="scale(1)",a.style.boxShadow="0 4px 20px rgba(0,0,0,0.2)"},children:e.jsx("span",{style:{color:"#E6007E",fontSize:22,lineHeight:1,marginLeft:3},children:"▶"})})}):e.jsx("div",{className:"absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100",style:{background:"rgba(230,0,126,0.15)"},children:e.jsx("div",{className:"w-12 h-12 rounded-full bg-white/90 flex items-center justify-center",children:e.jsx(G,{className:"w-6 h-6",style:{color:l.pink}})})})]},t.id)})})})]})]}),m.length>0&&e.jsx("section",{style:{padding:"60px 5%",background:"white"},children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx(k,{children:"Take a Look at our Podcast"}),e.jsx("style",{children:`
              .podcast-strip-wrap { position: relative; }
              .podcast-strip {
                display: flex; flex-direction: row; gap: 20px;
                overflow-x: auto; scroll-behavior: smooth;
                padding-bottom: 16px;
                scrollbar-width: thin;
                scrollbar-color: rgba(139,15,80,0.3) transparent;
                -webkit-overflow-scrolling: touch;
              }
              .podcast-strip::-webkit-scrollbar { height: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb { background: rgba(139,15,80,0.3); border-radius: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb:hover { background: rgba(139,15,80,0.5); }
              .podcast-card {
                min-width: 280px; max-width: 280px;
                border-radius: 16px; overflow: hidden; background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid rgba(139,15,80,0.10);
                flex-shrink: 0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .podcast-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 40px rgba(139,15,80,0.15);
              }
              .podcast-arrow {
                position: absolute; top: 50%; transform: translateY(-50%);
                width: 44px; height: 44px; border-radius: 50%;
                background: #8B0F50; color: white; font-size: 18px;
                border: none; cursor: pointer;
                box-shadow: 0 4px 16px rgba(139,15,80,0.3);
                display: flex; align-items: center; justify-content: center;
                z-index: 2; transition: background 0.2s;
              }
              .podcast-arrow:hover { background: #6D0A3E; }
              .podcast-arrow-left { left: -8px; }
              .podcast-arrow-right { right: -8px; }
              .podcast-title {
                font-family: 'Playfair Display', serif;
                font-size: 15px; font-weight: 700; color: #2D0A1E;
                margin: 0 0 6px 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
              .podcast-desc {
                font-size: 13px; color: #7A2050; line-height: 1.5; margin: 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
            `}),e.jsxs("div",{className:"podcast-strip-wrap",children:[e.jsx("button",{type:"button","aria-label":"Scroll podcasts left",className:"podcast-arrow podcast-arrow-left",onClick:()=>b.current?.scrollBy({left:-300,behavior:"smooth"}),children:e.jsx(C,{className:"w-5 h-5"})}),e.jsx("div",{ref:b,className:"podcast-strip",children:m.map(t=>{const o=R(t.youtube_url);return e.jsxs("div",{className:"podcast-card",children:[e.jsx("div",{style:{width:"100%",height:160,background:"#000"},children:o?e.jsx("iframe",{src:o,width:"100%",height:"160",frameBorder:0,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,loading:"lazy",title:t.title||"Podcast",style:{display:"block",border:0}}):null}),e.jsxs("div",{style:{padding:16},children:[t.title&&e.jsx("h3",{className:"podcast-title",children:t.title}),t.description&&e.jsx("p",{className:"podcast-desc",children:t.description})]})]},t.id)})}),e.jsx("button",{type:"button","aria-label":"Scroll podcasts right",className:"podcast-arrow podcast-arrow-right",onClick:()=>b.current?.scrollBy({left:300,behavior:"smooth"}),children:e.jsx(_,{className:"w-5 h-5"})})]})]})}),r.is_active!==!1&&e.jsx("section",{style:{padding:"60px 5%",background:`linear-gradient(135deg, ${l.pinkSoft} 0%, ${l.blueSoft} 100%)`},children:e.jsxs("div",{className:"max-w-3xl mx-auto text-center",children:[e.jsx(k,{children:r.heading}),r.subtext&&e.jsx("p",{className:"mb-8",style:{color:l.navLink,marginTop:-20},children:r.subtext}),e.jsxs("button",{onClick:()=>f(!0),className:"inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold transition-transform hover:scale-105",style:{background:`linear-gradient(90deg, ${l.pink}, ${l.pinkDark})`},children:[e.jsx(O,{className:"w-4 h-4 fill-current"})," ",r.button_text]})]})}),e.jsx(v,{children:x!==null&&n[x]&&e.jsxs(j.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-[1000000] flex items-center justify-center p-4",style:{background:"rgba(0,0,0,0.9)"},onClick:()=>d(null),children:[e.jsx("button",{"aria-label":"Close image viewer",onClick:t=>{t.stopPropagation(),d(null)},className:"absolute top-5 right-5 text-white p-2",children:e.jsx(D,{className:"w-8 h-8"})}),e.jsx("button",{"aria-label":"Previous image",onClick:t=>{t.stopPropagation(),A()},className:"absolute left-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20",children:e.jsx(C,{className:"w-6 h-6"})}),e.jsx("img",{src:n[x].url,alt:n[x].title||"",className:"max-h-[85vh] max-w-[90vw] rounded-xl",onClick:t=>t.stopPropagation()}),e.jsx("button",{"aria-label":"Next image",onClick:t=>{t.stopPropagation(),z()},className:"absolute right-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20",children:e.jsx(_,{className:"w-6 h-6"})})]})}),e.jsx(N,{open:E,onClose:()=>f(!1),title:"Virtual Clinic Tour",src:(()=>{if(!r.video_url)return;const t=S(r.video_url)??r.video_url,o=t.includes("?")?"&":"?";return r.autoplay?`${t}${o}autoplay=1&mute=1`:`${t}${o}autoplay=0`})()}),e.jsx(N,{open:h!==null,onClose:()=>g(null),src:h?S(h)??h:void 0,title:"Gallery Video"})]})}export{Z as component};

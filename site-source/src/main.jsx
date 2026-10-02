import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, Button, Tooltip, createDarkTheme, createLightTheme } from '@fluentui/react-components';
import { ArrowRight, ArrowUpRight, ArrowsClockwise, Check, CheckCircle, PaperPlaneTilt, FlowArrow, Moon, Sun, List, X, CaretRight, Headset, FileText, Wrench, Pause, Play } from '@phosphor-icons/react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import '@fontsource-variable/geist';
import './styles.css';
import './outdoors.css';
import '../public/assets/4runner-trace.css';
import '../public/assets/4runner-motion.css';
import '../public/assets/4runner-body.css';
import './refinements.css';

const linkedin = 'https://www.linkedin.com/in/jared-giampietro/';
const brand = { 10:'#100a1e',20:'#211339',30:'#322054',40:'#412a6f',50:'#513589',60:'#6040a4',70:'#704ac0',80:'#7954c7',90:'#8967cf',100:'#9b7cd8',110:'#ac93e0',120:'#bfaae8',130:'#d2c2ef',140:'#e0d5f5',150:'#eeE7fa',160:'#f8f4fe' };
const themeBase = { fontFamilyBase: '"Geist Variable", sans-serif', borderRadiusMedium:'10px', borderRadiusLarge:'16px', borderRadiusXLarge:'24px' };
const lightTheme = { ...createLightTheme(brand), ...themeBase };
const darkTheme = { ...createDarkTheme(brand), ...themeBase };

function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:.12 }} transition={{ duration:.65, delay, ease:[.22,1,.36,1] }} {...props}>{children}</motion.div>;
}

function Mark({ type, size = 'normal' }) {
  return <span className={`product-mark mark-${type} mark-${size}`} aria-hidden="true"><img src={`/assets/${type}.svg`} alt="" /></span>;
}

function PlatformVisual() {
  const [paused,setPaused]=useState(false);
  const [visible,setVisible]=useState(true);
  const visualRef=useRef(null);
  const reduce=useReducedMotion();
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.1});
    if(visualRef.current)observer.observe(visualRef.current);
    return()=>observer.disconnect();
  },[]);
  const products=[{type:'apps',title:'Power Apps',role:'Build'},{type:'automate',title:'Power Automate',role:'Connect'},{type:'sharepoint',title:'SharePoint',role:'Organize'},{type:'bi',title:'Power BI',role:'Understand'}];
  return <div ref={visualRef} className="platform-visual" data-paused={paused||!visible} role="group" aria-label="Power Apps, Power Automate, SharePoint, and Power BI connected as one ecosystem">
    <div className="platform-ring">
      <div className="platform-orbit" aria-hidden="true"/>
      <div className="platform-rotor">
        {products.map(({type,title,role},index)=><div key={type} className="platform-slot" style={{'--position':`${index*90}deg`}}><div className="platform-anchor"><div className="platform-upright"><a href={`#skill-${type}`} className={`platform-product platform-${type}`}><div className="platform-product-surface"><img src={`/assets/${type}.svg`} alt=""/></div><strong>{title}</strong><span>{role}</span></a></div></div></div>)}
      </div>
    </div>
    <div className="platform-center"><span>Power Platform</span><strong>Better together.</strong></div>
    {!reduce&&<Tooltip content={paused?'Resume rotation':'Pause rotation'} relationship="label"><Button className="orbit-toggle" appearance="transparent" aria-label={paused?'Resume product rotation':'Pause product rotation'} icon={paused?<Play size={14}/>:<Pause size={14}/>} onClick={()=>setPaused(!paused)}/></Tooltip>}
  </div>;
}

function FocusCard({children,className,id,delay=0}) {
  const reduce=useReducedMotion();
  const bounds=useRef(null);
  const x=useMotionValue(0),y=useMotionValue(0),lift=useMotionValue(0);
  const rotateX=useSpring(x,{stiffness:190,damping:26});
  const rotateY=useSpring(y,{stiffness:190,damping:26});
  const translateY=useSpring(lift,{stiffness:220,damping:25});
  function enter(event){
    if(reduce||event.pointerType!=='mouse'||!window.matchMedia('(hover: hover)').matches)return;
    bounds.current=event.currentTarget.getBoundingClientRect();lift.set(-6);
  }
  function move(event){
    if(reduce||!bounds.current)return;
    const rect=bounds.current;
    x.set(-(event.clientY-rect.top-rect.height/2)/rect.height*3.5);
    y.set((event.clientX-rect.left-rect.width/2)/rect.width*3.5);
  }
  function reset(){bounds.current=null;x.set(0);y.set(0);lift.set(0);}
  return <Reveal id={id} className={`focus-cell ${className}`} delay={delay}><motion.article className={`focus-tile ${className}`} style={{rotateX,rotateY,y:translateY,transformPerspective:1000}} onPointerEnter={enter} onPointerMove={move} onPointerLeave={reset}>{children}</motion.article></Reveal>;
}

function WorkflowExample() {
  const [phase, setPhase] = useState(-1);
  const timers = useRef([]);
  const reduce = useReducedMotion();
  const busy = phase >= 0 && phase < 3;
  const stages = [{ label:'Request', detail:'Captured', Icon:PaperPlaneTilt }, { label:'Approval', detail:'Routed', Icon:CheckCircle }, { label:'Update', detail:'Sent', Icon:FlowArrow }];
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function run() {
    timers.current.forEach(clearTimeout);
    if (reduce) { setPhase(3); return; }
    setPhase(0);
    timers.current = [setTimeout(()=>setPhase(1),850),setTimeout(()=>setPhase(2),1700),setTimeout(()=>setPhase(3),2550)];
  }
  return <div className="workflow-example">
    <div className="example-heading"><span>A simple approval flow</span><span className="example-label">Interactive example</span></div>
    <ol className={`flow-steps ${busy ? 'is-running' : ''}`}>
      {stages.map(({label,detail,Icon},i)=><li key={label} className={`${phase > i ? 'complete' : ''} ${phase === i ? 'current' : ''}`}><span className="flow-node">{phase > i ? <Check weight="bold" /> : <Icon weight="regular" />}</span><span className="step-label">{label}</span><span className="step-detail">{phase > i ? detail : 'Ready'}</span></li>)}
    </ol>
    <div className="example-footer">
      <span className="flow-status" role="status" aria-live="polite">{phase === 3 ? 'Request approved. Everyone is in the loop.' : busy ? `${stages[phase].label} in progress...` : 'Three steps. One connected process.'}</span>
      <Button appearance="subtle" className="run-button" icon={phase === 3 ? <ArrowsClockwise /> : <ArrowRight />} iconPosition="after" onClick={run} disabled={busy}>{phase === 3 ? 'Run again' : busy ? 'Running' : 'Try the flow'}</Button>
    </div>
  </div>;
}

function SupportingSkills() {
  const skills=[
    {Icon:Headset,title:'Microsoft 365 support',text:'Help people get more from the tools they use every day.'},
    {Icon:Wrench,title:'Troubleshooting',text:'Work through issues with a calm, practical approach.'},
    {Icon:FlowArrow,title:'Process improvement',text:'Find repetitive steps and make the next task easier.'},
    {Icon:FileText,title:'Clear documentation',text:'Create guides people can follow, reuse, and trust.'},
  ];
  return <div className="supporting-skills">
    <div className="support-top"><h3>The support behind the solution.</h3></div>
    <div className="support-details">{skills.map(({Icon,title,text})=><div key={title}><Icon size={25} weight="light"/><div><h4>{title}</h4><p>{text}</p></div></div>)}</div>
  </div>;
}

function Outdoors({ open, onClose }) {
  const vehicleRef = useRef(null);
  const particlesRef = useRef(null);
  const reduce = useReducedMotion();
  useEffect(()=>{
    if (!open) return;
    // The approved vehicle source is retained verbatim as the pixel sprite.
    const scripts = ['/assets/4runner-trace.js','/assets/4runner-body.js'];
    let cancelled = false;
    const loaded = [];
    async function load() {
      for (const src of scripts) {
        if (cancelled) break;
        await new Promise(resolve=>{
          const script = document.createElement('script'); script.src=src; script.onload=resolve; script.onerror=resolve; loaded.push(script); document.body.appendChild(script);
        });
      }
    }
    load();
    return ()=>{ cancelled=true; loaded.forEach(s=>s.remove()); };
  },[open]);
  useEffect(()=>{
    if (!open || reduce) return;
    const drive = vehicleRef.current;
    const layer = particlesRef.current;
    const emitter = setInterval(()=>{
      if (!drive || !layer) return;
      const rect = drive.getBoundingClientRect();
      if (rect.left < -200 || rect.left > window.innerWidth) return;
      for(const wheel of [.17,.78]) {
        const particle=document.createElement('i');
        particle.className='outdoor-dust';
        particle.style.left=`${rect.left+rect.width*wheel}px`; particle.style.top=`${rect.bottom-8}px`;
        particle.style.setProperty('--drift',`${20+Math.random()*35}px`); particle.style.setProperty('--size',`${3+Math.random()*5}px`);
        layer.appendChild(particle); particle.addEventListener('animationend',()=>particle.remove(),{once:true});
      }
    },120);
    const stop=setTimeout(()=>clearInterval(emitter),4900);
    return ()=>{ clearInterval(emitter); clearTimeout(stop); layer?.replaceChildren(); };
  },[open,reduce]);
  useEffect(()=>{
    if(!open)return;
    const escape=e=>{ if(e.key==='Escape')onClose(); }; document.addEventListener('keydown',escape);
    return()=>document.removeEventListener('keydown',escape);
  },[open,onClose]);
  return <>
    <div className={`outdoor-scene ${open ? 'open' : ''}`} aria-hidden="true"><div className="ridge ridge-far" /><div className="ridge ridge-near" /><div className="trees" />
      <div ref={vehicleRef} className={`fourrunner-drive ${open && !reduce ? 'is-driving' : ''}`}><div className="fourrunner-illustration traced-4runner"><span className="traced-4runner-sprite" data-pixel-sprite /><i className="traced-wheel traced-wheel-front"><b /></i><i className="traced-wheel traced-wheel-rear"><b /></i></div></div>
    </div>
    <div ref={particlesRef} className="outdoor-particles" aria-hidden="true" />
    <AnimatePresence>{open && <motion.aside className="outdoor-note" aria-label="Beyond the desk" initial={reduce ? false : {opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.3}}>
      <button className="outdoor-close" onClick={onClose} aria-label="Close Beyond the Desk"><X size={18} /></button>
      <span className="outdoor-label">Beyond the desk</span>
      <p>When I’m not working, I’m usually out camping, off-roading, or exploring somewhere new with my dog. When I’m home, I like to relax and play video games.</p>
    </motion.aside>}</AnimatePresence>
  </>;
}

function App() {
  const [isDark,setDark]=useState(()=>window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [menu,setMenu]=useState(false);
  const [outdoors,setOutdoors]=useState(false);
  const [active,setActive]=useState('');
  const portraitRef=useRef(null);
  const reduce=useReducedMotion();
  useEffect(()=>{ document.documentElement.dataset.theme=isDark?'dark':'light'; document.querySelector('meta[name="theme-color"]').content=isDark?'#131217':'#f7f7fa'; },[isDark]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting)setActive(entry.target.id); }),{rootMargin:'-20% 0px -60% 0px',threshold:0});
    document.querySelectorAll('main > section[id]').forEach(section=>observer.observe(section));
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!menu)return;
    const escape=e=>{if(e.key==='Escape')setMenu(false);}; document.addEventListener('keydown',escape);
    return()=>document.removeEventListener('keydown',escape);
  },[menu]);
  function closeOutdoors(){setOutdoors(false);portraitRef.current?.focus();}
  const navLinks=['About','Focus','Approach','Contact'];
  // Tooltips inherit theme tokens, but must not inherit the full-page surface styles.
  return <FluentProvider theme={isDark?darkTheme:lightTheme} applyStylesToPortals={false} className="site-provider">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <nav className="navigation shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="JG. Jared home">JG<span>.</span></a>
        <div className={`nav-links ${menu?'menu-open':''}`} id="nav-links">{navLinks.map(label=><a key={label} href={`#${label.toLowerCase()}`} aria-current={active===label.toLowerCase()?'location':undefined} onClick={()=>setMenu(false)}>{label}</a>)}</div>
        <div className="nav-tools">
          <Tooltip content={isDark?'Use light appearance':'Use dark appearance'} relationship="label"><Button appearance="transparent" className="theme-toggle" aria-label={isDark?'Use light appearance':'Use dark appearance'} icon={isDark?<Sun size={18}/>:<Moon size={18}/>} onClick={()=>setDark(!isDark)} /></Tooltip>
          <a className="nav-linkedin" href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
          <Button appearance="transparent" className="menu-toggle" icon={menu?<X size={22}/>:<List size={22}/>} aria-label={menu?'Close menu':'Open menu'} aria-controls="nav-links" aria-expanded={menu} onClick={()=>setMenu(!menu)} />
        </div>
      </nav>
    </header>

    <main id="main">
      <section className="hero shell" id="top">
        <motion.div className="hero-copy" initial={reduce?false:{y:14}} animate={{y:0}} transition={{duration:.8,ease:[.22,1,.36,1]}}>
          <p className="hero-identity">Jared Giampietro <span>/</span> JR IS Analyst</p>
          <h1><span>Less busywork.</span><span className="accent-text">More possibility.</span></h1>
          <p className="hero-description">I build practical Power Platform solutions and organized SharePoint environments that make everyday work easier.</p>
          <div className="hero-actions"><Button as="a" href="#focus" appearance="primary" size="large" className="pill-button" icon={<ArrowRight size={18}/>} iconPosition="after">Explore my focus</Button><a className="text-link" href="#about">A little about me <CaretRight size={16}/></a></div>
        </motion.div>
        <motion.div className="hero-art" initial={reduce?false:{opacity:0,scale:.94,y:18}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1.15,delay:.1,ease:[.22,1,.36,1]}}>
          <PlatformVisual/>
        </motion.div>
      </section>

      <section className="about shell" id="about">
        <Reveal className="portrait-block"><button ref={portraitRef} className="portrait-button" onClick={()=>setOutdoors(true)} aria-label="There’s more to the picture. Discover Jared's interests beyond the desk." aria-expanded={outdoors}><img src="/assets/jared-profile.webp" width="680" height="760" alt="Jared outdoors with his dog" loading="lazy"/><span className="portrait-hint">There’s more to the picture <ArrowUpRight size={16}/></span></button></Reveal>
        <Reveal className="about-copy" delay={.08}><h2>A builder’s mindset.<br/><span className="muted-text">A people-first approach.</span></h2><p>I’m Jared, a JR IS Analyst who enjoys connecting the dots between people, processes, and technology.</p><p>My focus is Power Platform and SharePoint. I like turning repetitive tasks into useful workflows, keeping information organized, and making systems easier to use.</p><p className="about-last">Good technology should make someone’s day a little easier. That’s the work I enjoy.</p></Reveal>
      </section>

      <section className="focus shell" id="focus">
        <Reveal className="section-intro"><p className="eyebrow">My focus</p><h2>Practical tools.<br/><span className="muted-text">Thoughtfully connected.</span></h2><p>Apps, automation, and information that work better together.</p></Reveal>
        <div className="focus-grid">
          <FocusCard id="skill-automate" className="automate-tile"><div className="tile-heading"><Mark type="automate"/><span>Power Automate</span></div><h3>Give repetitive work<br/>a better route.</h3><p>Approval flows, notifications, and connected processes that help everyday work move forward.</p><WorkflowExample/></FocusCard>
          <FocusCard id="skill-apps" className="apps-tile" delay={.06}><div className="tile-heading"><Mark type="apps"/><span>Power Apps</span></div><h3>A simpler way<br/>to get things done.</h3><p>Practical apps built around the task at hand, with clear forms and useful connections to your data.</p><div className="app-graphic" aria-hidden="true"><img src="/assets/apps.svg" alt=""/></div><div className="tile-caption">Useful by design.</div></FocusCard>
          <FocusCard id="skill-sharepoint" className="sharepoint-tile"><div className="tile-heading"><Mark type="sharepoint"/><span>SharePoint Administration</span></div><h3>A place for everything.<br/>Access for the right people.</h3><p>Site structure, permissions, and governance that keep teams organized and information easier to find.</p><div className="sharepoint-topics"><span>Site structure</span><span>Permissions</span><span>Governance</span></div></FocusCard>
          <FocusCard id="skill-bi" className="insights-tile" delay={.06}><div className="tile-heading"><Mark type="bi"/><span>Power BI</span></div><h3>Make information<br/>easier to act on.</h3><p>Reporting and useful insights that help people understand what needs their attention.</p><div className="insight-graphic" aria-hidden="true"><img src="/assets/bi.svg" alt=""/></div></FocusCard>
        </div>
        <Reveal><SupportingSkills/></Reveal>
      </section>

      <section className="approach shell" id="approach">
        <Reveal className="approach-intro"><h2>Start with the people.<br/><span className="muted-text">Then build the right thing.</span></h2><p>The best solution starts with understanding the everyday problem.</p></Reveal>
        <div className="approach-grid">
          <Reveal><div className="approach-symbol"><Headset size={28} weight="light"/></div><h3>Listen first.</h3><p>Understand how people work, what gets in their way, and what would help.</p></Reveal>
          <Reveal delay={.08}><div className="approach-symbol"><FlowArrow size={28} weight="light"/></div><h3>Keep it practical.</h3><p>Choose a clear, useful solution that fits the process and the people using it.</p></Reveal>
          <Reveal delay={.16}><div className="approach-symbol"><FileText size={28} weight="light"/></div><h3>Make it last.</h3><p>Document the details, support the users, and keep improving what comes next.</p></Reveal>
        </div>
      </section>

      <section className="contact shell" id="contact"><Reveal className="contact-inner"><div><h2>Let’s make<br/><span className="accent-text">work work better.</span></h2><p>Have a question, an opportunity, or a shared interest in Power Platform? I’d be happy to connect.</p><Button as="a" href={linkedin} target="_blank" rel="noreferrer" appearance="primary" size="large" className="pill-button" icon={<ArrowUpRight size={18}/>} iconPosition="after">Connect on LinkedIn</Button></div><div className="contact-monogram" aria-hidden="true">JG.</div></Reveal></section>
    </main>
    <footer className="footer shell"><a className="wordmark" href="#top" aria-label="JG. Jared home">JG<span>.</span></a><span>Jared Giampietro <span className="footer-role">/ JR IS Analyst</span></span><span className="copyright">© {new Date().getFullYear()}</span></footer>
    <Outdoors open={outdoors} onClose={closeOutdoors}/>
  </FluentProvider>;
}

createRoot(document.getElementById('root')).render(<App/>);

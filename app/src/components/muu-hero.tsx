import {useEffect,useRef,useState} from 'react';
import {restaurant} from '../data/restaurant';
import {Arrow} from './muu-shell';
export function Hero(){
 const video=useRef<HTMLVideoElement>(null),manualPause=useRef(false),inView=useRef(true);
 const [playing,setPlaying]=useState(false),[src,setSrc]=useState(''),[failed,setFailed]=useState(false);
 useEffect(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 700px)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean,effectiveType?:string}}).connection;
  const allowed=()=>!reduce.matches&&!connection?.saveData&&!['slow-2g','2g'].includes(connection?.effectiveType||'');
  const sync=()=>{const el=video.current;if(!el)return;if(allowed()&&inView.current&&!manualPause.current&&!document.hidden&&el.currentSrc)el.play().catch(()=>setPlaying(false));else el.pause()};
  const configure=()=>{setFailed(false);if(!allowed()){video.current?.pause();setSrc('');setPlaying(false);return}setSrc(mobile.matches?restaurant.media.mobileVideo:restaurant.media.desktopVideo)};
  configure();reduce.addEventListener('change',configure);mobile.addEventListener('change',configure);
  const observer=new IntersectionObserver(entries=>{inView.current=entries[0].isIntersecting;sync()},{threshold:.15});
  const el=video.current;if(el){observer.observe(el);el.addEventListener('loadeddata',sync)}
  document.addEventListener('visibilitychange',sync);
  return ()=>{observer.disconnect();el?.removeEventListener('loadeddata',sync);reduce.removeEventListener('change',configure);mobile.removeEventListener('change',configure);document.removeEventListener('visibilitychange',sync)};
 },[]);
 function toggle(){const el=video.current;if(!el)return;if(playing){manualPause.current=true;el.pause()}else{manualPause.current=false;el.play().catch(()=>setFailed(true))}}
 return <section className="hero">
 <div className="hero-media"><picture><source media="(max-width: 700px)" srcSet={restaurant.media.mobilePoster}/><img src={restaurant.media.poster} alt="Rotating Australian entrecôte dish in an AI-assisted campaign setting based on Muu’s menu photograph" width="1920" height="1080" fetchPriority="high"/></picture><video ref={video} src={src||undefined} muted playsInline loop autoPlay preload="metadata" aria-hidden="true" className={failed||!src?'film-hidden':''} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setPlaying(false)}}/></div>
 <div className="hero-copy page-width"><span className="eyebrow">MUU GRILL HOUSE · DBAYEH</span><h1>Big flavour.<br/><em>Better together.</em></h1><p>Steaks, smoked favourites and plates to share.<br className="desktop-break"/> Pull up a chair at The Village.</p><div className="hero-actions"><a className="solid-cta ivory" href="/menu">View Menu <Arrow/></a><a className="outline-cta" href={restaurant.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow/></a></div><a className="hero-visit" href="/visit">Visit us in Dbayeh <span aria-hidden="true">→</span></a></div>
 <div className="hero-caption"><span>Entrecôte Australian<br/><small>AI-assisted campaign film</small></span>{src&&!failed&&<button onClick={toggle} className="film-control" aria-label={playing?'Pause hero film':'Play hero film'}>{playing?'Ⅱ':'▷'}</button>}</div>
 </section>
}

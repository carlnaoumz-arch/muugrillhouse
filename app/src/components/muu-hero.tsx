import {useEffect,useRef,useState} from 'react';
import {restaurant} from '../data/restaurant';
import {Arrow} from './muu-shell';
export function Hero(){
 const video=useRef<HTMLVideoElement>(null);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{
  const el=video.current;
  if(!el)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 700px)');
  let inView=true,disposed=false;
  // Set the actual media properties before loading, including Safari's
  // default-muted flag. React's muted prop alone can arrive too late.
  el.muted=true;
  el.defaultMuted=true;
  el.playsInline=true;
  el.setAttribute('muted','');
  el.setAttribute('playsinline','');
  const sync=()=>{
   if(disposed)return;
   if(reduce.matches||!inView||document.hidden){el.pause();return}
   if(el.getAttribute('src')&&el.paused){
    el.muted=true;
    // Browsers can deny autoplay. Retry on readiness, page return, or an
    // ordinary touch/key interaction without requiring a video control.
    void el.play().catch(()=>{});
   }
  };
  const configure=()=>{
   if(reduce.matches){el.pause();el.removeAttribute('src');el.load();return}
   const next=mobile.matches?restaurant.media.mobileVideo:restaurant.media.desktopVideo;
   if(el.getAttribute('src')!==next){setFailed(false);el.src=next;el.load()}
   sync();
  };
  const readyEvents=['loadedmetadata','loadeddata','canplay'];
  readyEvents.forEach(event=>el.addEventListener(event,sync));
  const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync()},{threshold:0});
  observer.observe(el);
  reduce.addEventListener('change',configure);
  mobile.addEventListener('change',configure);
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pageshow',sync);
  window.addEventListener('focus',sync);
  document.addEventListener('touchend',sync,{passive:true});
  document.addEventListener('pointerdown',sync,{passive:true});
  document.addEventListener('keydown',sync);
  configure();
  return ()=>{
   disposed=true;observer.disconnect();el.pause();
   readyEvents.forEach(event=>el.removeEventListener(event,sync));
   reduce.removeEventListener('change',configure);
   mobile.removeEventListener('change',configure);
   document.removeEventListener('visibilitychange',sync);
   window.removeEventListener('pageshow',sync);
   window.removeEventListener('focus',sync);
   document.removeEventListener('touchend',sync);
   document.removeEventListener('pointerdown',sync);
   document.removeEventListener('keydown',sync);
  };
 },[]);
 return <section className="hero">
 <div className="hero-media"><picture><source media="(max-width: 700px)" srcSet={restaurant.media.mobilePoster}/><img src={restaurant.media.poster} alt="Rotating Australian entrecôte dish in an AI-assisted campaign setting based on Muu’s menu photograph" width="1920" height="1080" fetchPriority="high"/></picture><video ref={video} muted playsInline loop autoPlay preload="auto" controls={false} disablePictureInPicture aria-hidden="true" className={failed?'film-hidden':''} onError={()=>setFailed(true)}/></div>
 <div className="hero-copy page-width"><span className="eyebrow">MUU GRILL HOUSE · DBAYEH</span><h1>Big flavour.<br/><em>Better together.</em></h1><p>Steaks, smoked favourites and plates to share.<br className="desktop-break"/> Pull up a chair at The Village.</p><div className="hero-actions"><a className="solid-cta ivory" href="/menu">View Menu <Arrow/></a><a className="outline-cta" href={restaurant.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow/></a></div><a className="hero-visit" href="/visit">Visit us in Dbayeh <span aria-hidden="true">→</span></a></div>
 </section>
}

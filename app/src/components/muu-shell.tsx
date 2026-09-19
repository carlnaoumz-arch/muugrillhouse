import {useEffect,useRef,useState, type ReactNode} from 'react';
import {restaurant, wa} from '../data/restaurant';
export function Arrow(){return <span aria-hidden="true" className="arrow">↗</span>}
export function Shell({children, current='Home'}:{children:ReactNode,current?:string}){
 const [expanded,setExpanded]=useState(false);
 const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!expanded)return;const dismiss=(event:KeyboardEvent)=>{if(event.key==='Escape'){setExpanded(false);toggle.current?.focus()}};document.addEventListener('keydown',dismiss);return()=>document.removeEventListener('keydown',dismiss)},[expanded]);
 return <div className="muu-site">
  <div className="muu-atmosphere" aria-hidden="true" />
  <a href="#main" className="skip-link">Skip to content</a>
  <div className="preview-notice">OWNER PREVIEW <span>•</span> A new look for Muu Grill House</div>
  <header className="site-header">
   <a href="/" className="brand" aria-label="Muu Grill House home"><img src="/assets/logo.webp" width="126" height="78" alt="Muu Grill House Bar" /></a>
   <nav id="main-navigation" aria-label="Main navigation" className={expanded?'main-nav expanded':'main-nav'}>
    {['Home','Menu','Visit & Contact'].map((x,i)=><a key={x} href={['/','/menu','/visit'][i]} aria-current={current===x?'page':undefined} onClick={()=>setExpanded(false)}>{x}</a>)}
   </nav>
   <a className="header-enquiry" href="/visit#request-table">Request a Table <Arrow/></a>
   <button ref={toggle} aria-controls="main-navigation" className="nav-toggle" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-label={expanded?'Close navigation':'Open navigation'}>{expanded?'Close':'Explore'} <span aria-hidden="true">{expanded?'×':'☰'}</span></button>
  </header>
  <main id="main">{children}</main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Restaurant',name:restaurant.name,telephone:restaurant.telephone,address:{'@type':'PostalAddress',streetAddress:'The Village',addressLocality:'Dbayeh',addressCountry:'LB'},openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],opens:'12:00',closes:'00:00'}],hasMenu:restaurant.officialMenu,sameAs:[restaurant.instagram,restaurant.linktree]})}}/>
  <footer className="site-footer">
   <div className="footer-brand"><a href="/" aria-label="Muu Grill House home"><img src="/assets/logo.webp" width="160" height="99" alt="Muu Grill House Bar"/></a><p>Big flavour. Better together.</p></div>
   <div><h2>Come on over.</h2><p>{restaurant.address}</p><p>{restaurant.hours}</p><a href={restaurant.phoneHref}>{restaurant.telephone}</a></div>
   <div className="footer-links"><a href="/menu">View Menu <Arrow/></a><a href={restaurant.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow/></a><a href={restaurant.instagram} target="_blank" rel="noreferrer">Instagram <Arrow/></a><a href={restaurant.officialMenu} target="_blank" rel="noreferrer">View Official Menu <Arrow/></a></div>
   <div className="footer-bottom"><span>Muu Grill House · Dbayeh, Lebanon</span><span>Owner preview. Pending final business approval.</span><a href="/preview-notes">Preview notes</a></div>
  </footer>
  <nav className="mobile-actions" aria-label="Quick actions"><a href="/menu"><span aria-hidden="true">☷</span>Menu</a><a href={restaurant.whatsapp} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>WhatsApp</a><a href="/visit"><span aria-hidden="true">⌖</span>Visit Us</a></nav>
 </div>
}
export function VisitPanel(){return <section className="visit-panel page-width"><div><span className="eyebrow">MAKE AN EVENING OF IT</span><h2>There’s a place<br/>for you at Muu.</h2><a className="ink-link" href="/visit">Plan your visit <Arrow/></a></div><div className="visit-details"><p className="large-location">The Village,<br/>Dbayeh.</p><div className="visit-meta"><p>{restaurant.hours}<br/>Lunch & dinner daily</p><a href={restaurant.phoneHref}>{restaurant.telephone}</a></div><a className="solid-cta forest" href="/visit#request-table">Request a Table <Arrow/></a></div></section>}
export function DeliveryLink(){return <a href={wa('Hello Muu! Is delivery available? Please let me know your delivery area, menu, hours, fees and payment options.')} target="_blank" rel="noreferrer">Ask About Delivery <Arrow/></a>}

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
  <a className="whatsapp-contact" href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact Muu Grill House on WhatsApp">
   <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.94-11.93a11.86 11.86 0 0 0-3.46-8.42ZM12.04 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c-.01 5.45-4.45 9.89-9.93 9.89Zm5.44-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.3 1.27.49 1.71.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/></svg>
   <span>Contact us</span>
  </a>
  <nav className="mobile-actions" aria-label="Quick actions"><a href="/menu"><span aria-hidden="true">☷</span>Menu</a><a href={restaurant.whatsapp} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span>WhatsApp</a><a href="/visit"><span aria-hidden="true">⌖</span>Visit Us</a></nav>
 </div>
}
export function VisitPanel(){return <section className="visit-panel page-width"><div><span className="eyebrow">MAKE AN EVENING OF IT</span><h2>There’s a place<br/>for you at Muu.</h2><a className="ink-link" href="/visit">Plan your visit <Arrow/></a></div><div className="visit-details"><p className="large-location">The Village,<br/>Dbayeh.</p><div className="visit-meta"><p>{restaurant.hours}<br/>Lunch & dinner daily</p><a href={restaurant.phoneHref}>{restaurant.telephone}</a></div><a className="solid-cta forest" href="/visit#request-table">Request a Table <Arrow/></a></div></section>}
export function DeliveryLink(){return <a href={wa('Hello Muu! Is delivery available? Please let me know your delivery area, menu, hours, fees and payment options.')} target="_blank" rel="noreferrer">Ask About Delivery <Arrow/></a>}

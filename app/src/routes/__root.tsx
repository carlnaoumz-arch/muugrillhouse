import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import {Outlet,createRootRouteWithContext,HeadContent,Scripts,useRouter} from '@tanstack/react-router';
import {useEffect,type ReactNode} from 'react';
import appCss from '../styles.css?url';
import {reportHiggsfieldError} from '../lib/higgsfield-error-reporting';
import meta from '../app-meta.json';
declare const __HF_DESIGN_INSPECTOR__:boolean;
export const Route=createRootRouteWithContext<{queryClient:QueryClient}>()({
 head:()=>({meta:[{charSet:'utf-8'},{name:'viewport',content:'width=device-width, initial-scale=1, viewport-fit=cover'},{title:meta.og_title},{name:'description',content:meta.og_description},{name:'robots',content:'noindex, nofollow'},{name:'theme-color',content:'#20382F'},{property:'og:title',content:meta.og_title},{property:'og:description',content:meta.og_description},{property:'og:type',content:'website'},{property:'og:image',content:meta.og_image_url},{name:'twitter:card',content:'summary_large_image'}],links:[{rel:'stylesheet',href:appCss},{rel:'icon',href:'/assets/icon-32.png'},{rel:'apple-touch-icon',href:'/assets/icon-180.png'},{rel:'manifest',href:'/site.webmanifest'},{rel:'preconnect',href:'https://fonts.googleapis.com'},{rel:'preconnect',href:'https://fonts.gstatic.com',crossOrigin:'anonymous'},{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&display=swap'}]}),
 shellComponent:RootShell,component:Root,notFoundComponent:()=> <div className="error-page"><h1>This table isn’t here.</h1><p>The page you’re looking for could not be found.</p><a className="solid-cta forest" href="/">Back to Muu</a></div>,errorComponent:ErrorPage
});
function RootShell({children}:{children:ReactNode}){return <html lang="en"><head><HeadContent/></head><body>{children}<Scripts/></body></html>}
function Root(){const {queryClient}=Route.useRouteContext();useEffect(()=>{if(__HF_DESIGN_INSPECTOR__)void import('../module/design-inspector/runtime').then(({installHiggsfieldDesignInspector})=>installHiggsfieldDesignInspector()).catch(e=>reportHiggsfieldError(e,{boundary:'design_inspector'}))},[]);return <QueryClientProvider client={queryClient}><Outlet/></QueryClientProvider>}
function ErrorPage({error,reset}:{error:Error,reset:()=>void}){const router=useRouter();useEffect(()=>{reportHiggsfieldError(error,{boundary:'muu_root'})},[error]);return <div className="error-page"><h1>Let’s try that again.</h1><p>The page couldn’t load. The official menu is still available.</p><button className="solid-cta forest" onClick={()=>{router.invalidate();reset()}}>Try again</button><a href="https://menu.omegasoftware.ca/muugrillhouseandbar">View Official Menu</a></div>}

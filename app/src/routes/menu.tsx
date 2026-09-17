import {createFileRoute} from '@tanstack/react-router';
import {Shell} from '../components/muu-shell';
import {MenuBrowser} from '../components/muu-menu';
export const Route=createFileRoute('/menu')({validateSearch:(search:Record<string,unknown>):{dish?:string}=>({dish:typeof search.dish==='string'?search.dish:undefined}),head:()=>({meta:[{title:'Menu | Muu Grill House'},{name:'description',content:'Explore Muu Grill House’s food and drink menu, from steaks and sharing platters to burgers and desserts.'}]}),component:()=> <Shell current="Menu"><MenuBrowser/></Shell>});

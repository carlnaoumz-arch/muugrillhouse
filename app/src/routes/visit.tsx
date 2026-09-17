import {createFileRoute} from '@tanstack/react-router';
import {Shell} from '../components/muu-shell';
import {VisitContent} from '../components/muu-visit';
export const Route=createFileRoute('/visit')({head:()=>({meta:[{title:'Visit & Contact | Muu Grill House'},{name:'description',content:'Visit Muu Grill House at The Village, Dbayeh. Find opening hours, contact the team and request a table.'}]}),component:()=> <Shell current="Visit & Contact"><VisitContent/></Shell>});

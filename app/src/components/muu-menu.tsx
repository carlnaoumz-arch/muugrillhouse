import {useEffect,useMemo,useRef,useState} from 'react';
import {useNavigate,useSearch} from '@tanstack/react-router';
import data from '../data/menu.json';
import {restaurant,titleCase,wa} from '../data/restaurant';
import {Arrow} from './muu-shell';
import {matchesMenuSearch,menuDescription,menuPrice,needsPriceApproval} from '../lib/menu';
type Item=typeof data[number]['items'][number];
const allItems=data.flatMap(s=>s.items.map(i=>({...i,category:s.category,kind:s.kind})));
type DetailedItem=typeof allItems[number];
const enhancedPhotos:Record<string,string>={card12:'steak',card2:'burger',card6:'dessert',card17:'platter'};
function Photo({item,large=false}:{item:Item,large?:boolean}){const [broken,setBroken]=useState(false);return item.image&&!broken?<img src={enhancedPhotos[item.id]?'/assets/hq/'+enhancedPhotos[item.id]+(large?'.webp':'-thumb.webp'):'/assets/menu/'+item.image+'.webp'} alt={titleCase(item.name)} width="500" height="370" loading={large?'eager':'lazy'} onError={()=>setBroken(true)}/>:null}
function Detail({item,onClose}:{item:DetailedItem,onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const d=dialog.current;const previous=document.activeElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';d?.showModal();return ()=>{d?.close();document.body.style.overflow=overflow;if(previous instanceof HTMLElement)previous.focus({preventScroll:true})}},[]);
 return <dialog ref={dialog} className="item-dialog" aria-labelledby="dish-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
  <button className="dialog-close" onClick={onClose} aria-label="Close item details">×</button>
  <Photo item={item} large/><div className="dialog-content"><small>{titleCase(item.category)}</small><h2 id="dish-title">{titleCase(item.name)}</h2><strong className="detail-price">{menuPrice(item)}</strong>
  {enhancedPhotos[item.id]&&<p className="price-note">AI-generated interpretation based on Muu’s original photo. Plating and details may differ.</p>}<p className="price-note">Currency and current prices are awaiting owner approval.</p>
  {item.description?<p>{item.description}</p>:<p>Please contact the team for ingredients and preparation details.</p>}
  {item.id==='card25'&&<p className="source-note">The full ingredient list is awaiting confirmation from the restaurant.</p>}
  {needsPriceApproval(item)&&<p className="source-note">This price needs owner confirmation. Please ask Muu for the current price before ordering.</p>}
  <a className="solid-cta forest" href={wa('Hello Muu! I have a question about '+item.name+'. Could you confirm the current price, ingredients and availability?')} target="_blank" rel="noreferrer">Ask about this item <Arrow/></a>
  <p className="price-note">For dietary requirements and allergies, please speak directly with the restaurant.</p></div>
 </dialog>
}
export function MenuBrowser(){
 const [kind,setKind]=useState('Food'),[category,setCategory]=useState('All'),[query,setQuery]=useState('');
 const [searchAll,setSearchAll]=useState(false);
 const {dish}=useSearch({from:'/menu'});
 const navigate=useNavigate({from:'/menu'});
 const selected=allItems.find(item=>item.id===dish);
 const sections=useMemo(()=>data.filter(s=>searchAll||s.kind===kind).filter(s=>category==='All'||s.category===category).map(s=>({...s,items:s.items.filter(i=>matchesMenuSearch(i,s.category,query))})).filter(s=>s.items.length),[kind,category,query,searchAll]);
 const count=sections.reduce((n,s)=>n+s.items.length,0);
 function reset(){setQuery('');setCategory('All');setSearchAll(false)}
 function chooseCategory(value:string){setCategory(value);document.getElementById('menu-results')?.scrollIntoView({block:'start',behavior:'auto'})}
 return <><section className="menu-intro page-width"><span className="eyebrow">FROM OUR KITCHEN & BAR</span><h1>What are you<br/><em>in the mood for?</em></h1><p>Find your favourites. Discover something new.</p></section>
 <div className="menu-tools page-width"><div className="menu-kind" role="group" aria-label="Menu type">{['Food','Beverage'].map(k=><button key={k} aria-pressed={kind===k&&!searchAll} onClick={()=>{setKind(k);reset()}}>{k==='Beverage'?'Drinks':k} <span>{k==='Food'?'87':'212'}</span></button>)}</div><div className="search-field"><label htmlFor="menu-search">Search menu</label><div><span aria-hidden="true">⌕</span><input id="menu-search" type="search" value={query} onChange={e=>{setQuery(e.target.value);setCategory('All');setSearchAll(Boolean(e.target.value.trim()))}} placeholder="A dish, drink or ingredient…"/>{query&&<button aria-label="Clear search" onClick={reset}>×</button>}</div></div></div>
 <p className="menu-source-note page-width">Currency and current prices are awaiting owner approval. Uncertain amounts are marked “Ask for price”; other amounts follow the menu checked on 17 September 2026.</p>
 <div className="menu-layout page-width"><aside className="category-nav"><h2>On the menu</h2><div role="group" aria-label="Menu categories"><button aria-pressed={category==='All'} onClick={()=>chooseCategory('All')}>All {searchAll?'items':kind==='Food'?'food':'drinks'}<span>↗</span></button>{data.filter(s=>searchAll||s.kind===kind).map(s=><button aria-pressed={category===s.category} onClick={()=>chooseCategory(s.category)} key={s.category}>{titleCase(s.category)}<span>{s.items.length}</span></button>)}</div></aside>
 <div id="menu-results" className="menu-results"><div className="results-top"><p role="status">{count} {count===1?'item':'items'}{query?' for “'+query+'”':''}</p>{(query||category!=='All')&&<button onClick={reset}>Clear filters ×</button>}</div>
 {count===0?<div className="empty-state"><h2>No bites found.</h2><p>Try another dish or ingredient, or explore the full menu.</p><button className="solid-cta forest" onClick={reset}>Clear filters <Arrow/></button></div>:sections.map(s=><section className="menu-category" key={s.category}><div className="category-heading"><h2>{titleCase(s.category)}</h2><span>{s.items.length.toString().padStart(2,'0')}</span></div><div className={s.kind==='Food'?'menu-items':'menu-items drinks'}>{s.items.map(item=><button className="menu-item" key={item.id} onClick={()=>void navigate({search:{dish:item.id},resetScroll:false})} aria-label={'View '+titleCase(item.name)+' details'}>{item.image&&<div className="menu-thumb"><Photo item={item}/></div>}<span className="menu-item-copy"><span className="item-title">{titleCase(item.name)}</span>{menuDescription(item,s.kind)&&<span className="item-description">{menuDescription(item,s.kind)}</span>}{item.name.startsWith('ADD ')&&<span className="extra-label">Extra</span>}</span><span className="item-price">{menuPrice(item)}<span className="item-more" aria-hidden="true">↗</span></span></button>)}</div></section>)}
 <div className="menu-help"><h2>Let’s make it your kind of meal.</h2><p>Questions about ingredients, sauces or dietary requirements? The Muu team can help.</p><a href={restaurant.whatsapp} className="ink-link" target="_blank" rel="noreferrer">Ask on WhatsApp <Arrow/></a></div></div></div>
 {selected&&<Detail key={selected.id} item={selected} onClose={()=>void navigate({search:{},replace:true,resetScroll:false})}/>}</>
}

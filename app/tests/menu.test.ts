import {test} from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/menu.json';
import {matchesMenuSearch,menuDescription,menuPrice,needsPriceApproval} from '../src/lib/menu';
const items=data.flatMap(section=>section.items.map(item=>({...item,category:section.category,kind:section.kind})));
const item=(id:string)=>items.find(item=>item.id===id)!;

test('steak finds entrecôte, both tomahawks and T-bone without matching sauce-only dishes',()=>{
 const results=items.filter(i=>matchesMenuSearch(i,i.category,'steak')).map(i=>i.id);
 for(const id of ['card11','card12','card16','card417','card437','card438']) assert.ok(results.includes(id),id);
 for(const id of ['card418','card421','card387','card18']) assert.ok(!results.includes(id),id);
 assert.ok(matchesMenuSearch(item('card438'),'MAIN COURSE','steak 1200'));
 assert.ok(matchesMenuSearch(item('card12'),'MAIN COURSE','  ENTRECOTE   Australian '));
 assert.ok(!matchesMenuSearch(item('card12'),'MAIN COURSE','steak 1200'));
 assert.ok(items.every(i=>matchesMenuSearch(i,i.category,'')));
});

test('uncertain prices are marked without altering their source amounts',()=>{
 for(const id of ['card115','card116','card117','card118','card210','card222','card72']) {
  assert.ok(needsPriceApproval(item(id)));
  assert.equal(menuPrice(item(id)),'Ask for price');
 }
 assert.equal(item('card210').price,'10.00');
 assert.equal(item('card222').price,'17.50');
 assert.equal(menuPrice(item('card12')),'49.00');
});

test('incomplete descriptions use honest fallbacks and spelling corrections retain IDs',()=>{
 assert.equal(menuDescription(item('card414'),'Food'),'Ask the team for ingredients and preparation details.');
 assert.equal(menuDescription(item('card394'),'Food'),'');
 assert.equal(item('card423').name,'CALAMARI BAGUETTE WITH ENTRECÔTE SAUCE');
 assert.equal(item('card436').name,'ICED COFFEE');
 assert.ok(!item('card25').description.startsWith(','));
 assert.ok(item('card25').description.includes('full ingredient list'));
});

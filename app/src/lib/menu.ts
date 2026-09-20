type MenuItem = {id: string; name: string; description: string; price: string};

export const priceReviewReasons: Record<string, string> = {
  card115: 'Source lists 0.00; confirm availability and bottle price.',
  card116: 'Source lists 0.00; confirm availability and bottle price.',
  card117: 'Source lists 0.00; confirm availability and bottle price.',
  card118: 'Source lists 0.00; confirm availability and bottle price.',
  card210: 'Bottle listed as 10.00, while the glass is 9.00. Confirm bottle price and serving size.',
  card222: 'Bottle and glass both listed as 17.50. Confirm bottle price and serving size.',
  card72: 'Small water is listed as 1.11. Confirm the unusual amount; no correction assumed.',
};

export function needsPriceApproval(item: MenuItem) {
  return Number(item.price) === 0 || Boolean(priceReviewReasons[item.id]);
}

export function menuPrice(item: MenuItem) {
  return needsPriceApproval(item) ? 'Ask for price' : item.price;
}

export function menuDescription(item: MenuItem, kind: string) {
  if (item.description) return item.description;
  return kind === 'Food' && !item.name.startsWith('ADD ')
    ? 'Ask the team for ingredients and preparation details.'
    : '';
}

export function normalizeMenuSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

// Apply aliases to the actual cuts, not to dishes that only use entrecôte sauce.
const steakCuts = new Set(['card11', 'card12', 'card16', 'card417', 'card437', 'card438']);
export function matchesMenuSearch(item: MenuItem, category: string, query: string) {
  const text = normalizeMenuSearch(`${item.name} ${item.description} ${category} ${steakCuts.has(item.id) ? 'steak steaks' : ''}`);
  return normalizeMenuSearch(query).split(' ').every(term => text.includes(term));
}

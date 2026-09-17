export function beirutNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Beirut', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const part = (key: string) => parts.find(p => p.type === key)!.value;
  return {date: `${part('year')}-${part('month')}-${part('day')}`, time: `${part('hour')}:${part('minute')}`};
}

export function validateReservation(date: string, time: string, party: string, now = beirutNow()) {
  const parsed = new Date(`${date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date < now.date) {
    return 'Please choose today or a future date.';
  }
  if (!/^(?:1[2-9]|2[0-3]):[0-5]\d$/.test(time)) {
    return 'Published opening hours are noon to midnight. Please choose a time from 12:00 onwards.';
  }
  if (date === now.date && time <= now.time) return 'Please choose a time later than the current time in Beirut.';
  if (!Number.isInteger(Number(party)) || Number(party) < 1 || Number(party) > 50) return 'Please enter a whole number of guests between 1 and 50.';
  return '';
}

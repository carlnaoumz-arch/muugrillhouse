import {test} from 'node:test';
import assert from 'node:assert/strict';
import {beirutNow, validateReservation} from '../src/lib/reservation.ts';

const now = {date: '2026-09-17', time: '18:30'};
test('accepts future enquiries and opening-hour boundaries', () => {
  for (const time of ['12:00', '19:00', '23:59']) assert.equal(validateReservation('2026-09-18', time, '2', now), '');
  assert.equal(validateReservation(now.date, '18:31', '50', now), '');
});
test('rejects past dates, past Beirut times and invalid calendar dates', () => {
  for (const date of ['', '2026-09-16', '2026-02-30', '2027-02-29', 'invalid']) assert.ok(validateReservation(date, '19:00', '2', now));
  for (const time of ['12:00', '18:30']) assert.ok(validateReservation(now.date, time, '2', now));
  assert.equal(validateReservation('2028-02-29', '19:00', '2', now), '');
});
test('rejects closed hours and invalid party sizes', () => {
  for (const time of ['', '11:59', '24:00', '19:60']) assert.ok(validateReservation('2026-09-18', time, '2', now));
  for (const party of ['', '0', '-1', '51', '1.5', 'oops']) assert.ok(validateReservation('2026-09-18', '19:00', party, now));
});
test('uses Beirut dates across midnight and seasonal time changes', () => {
  assert.deepEqual(beirutNow(new Date('2026-09-17T22:30:00Z')), {date:'2026-09-18', time:'01:30'});
  assert.deepEqual(beirutNow(new Date('2026-01-17T22:30:00Z')), {date:'2026-01-18', time:'00:30'});
});

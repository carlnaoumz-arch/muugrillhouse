export const restaurant = {
 name: 'Muu Grill House',
 address: 'The Village, Dbayeh, Lebanon',
 telephone: '+961 70 320 232',
 phoneHref: 'tel:+96170320232',
 whatsapp: 'https://wa.me/96170320232',
 instagram: 'https://www.instagram.com/muugrillhouse/',
 officialMenu: 'https://menu.omegasoftware.ca/muugrillhouseandbar',
 linktree: 'https://linktr.ee/Muugrillhouse',
 hours: 'Every day, 12 noon to midnight',
 timeZone: 'Asia/Beirut',
 verifiedOn: '2026-09-17',
 currency: null as string | null,
 // Destination confirmed by the owner on 20 September 2026; omit the shared route's origin.
 mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=33.9331158%2C35.5920411' as string | null,
 ordering: { whatsappVerified: true, deliveryVerified: false, pickupVerified: false, basketEnabled: false },
 media: { poster: '/assets/hq/hero-poster.webp', mobilePoster: '/assets/hq/hero-mobile.webp', desktopVideo:'/assets/hq/hero-desktop.mp4', mobileVideo:'/assets/hq/hero-mobile.mp4' }
};
export const wa = (message: string) => restaurant.whatsapp + '?text=' + encodeURIComponent(message);
export const titleCase = (s: string) => s.toLowerCase().replace(/(^|[ \t])(\p{L})/gu, (_, space: string, letter: string) => space + letter.toUpperCase());

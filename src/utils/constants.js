export const PRIZES = [
  { balls: 19, prize: "€ 25.000", label: "Volle kaart? Dan heeft u de eerste Bingo! U wint € 25.000" },
  { balls: 20, prize: "€ 10.000", label: "Bingo! U wint € 10.000" },
  { balls: 21, prize: "€ 10.000", label: "Bingo! U wint € 10.000" },
  { balls: 22, prize: "€ 5.000", label: "Bingo! U wint € 5.000" },
  { balls: 23, prize: "€ 5.000", label: "Bingo! U wint € 5.000" },
  { balls: 24, prize: "Reischeque t.w.v. € 2.500", label: "Bingo! U wint een Eredivisie reischeque t.w.v. € 2.500" },
  { balls: 25, prize: "€ 1.000", label: "Bingo! U wint € 1.000" },
  { balls: 26, prize: "€ 350", label: "Bingo! U wint € 350" },
  { balls: 27, prize: "VriendenLoterij Eredivisie voetbal", label: "Bingo! U wint een VriendenLoterij Eredivisie voetbal" },
  { balls: 28, prize: "€ 50", label: "Bingo! U wint € 50" },
  { balls: 29, prize: "€ 25", label: "Bingo! U wint € 25" },
  { balls: 30, prize: "€ 15", label: "Bingo! U wint € 15" },
  { balls: 31, prize: "€ 15", label: "Bingo! U wint € 15" },
  { balls: 32, prize: "€ 15", label: "Bingo! U wint € 15" },
  { balls: 33, prize: "Kookcadeau naar keuze", label: "Bingo! U wint een Kookcadeau naar keuze" },
  { balls: 34, prize: "Kookcadeau naar keuze", label: "Bingo! U wint een Kookcadeau naar keuze" },
  { balls: 35, prize: "Boek naar keuze", label: "Bingo! U wint een Boek naar keuze" },
  { balls: 36, prize: "Prijs naar keuze", label: "Bingo! U wint een Prijs naar keuze" },
];

export const TOTAL_NUMBERS = 45; // Total balls in the machine
export const GRID_SIZE = 4;
export const DRAW_INTERVAL = 4000; // 4 seconds
export const HIGHLIGHT_DURATION = 2000; // Last 2 seconds
export const MAX_DRAWN_BALLS = 36; // Maximum balls drawn per game

// Skip animation settings
export const SKIP_BALL_INTERVAL = 120; // Base interval in ms per ball during skip
export const SKIP_USE_EASING = true; // Enable easing (starts fast, ends slower for suspense)
export const SKIP_EASING_TYPE = 'in'; // 'in' (slow to fast), 'out' (fast to slow), 'in-out' (slow-fast-slow)
export const SKIP_EASING_FACTOR = 1; // Higher = more dramatic slowdown at end

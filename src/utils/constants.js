// Import prize images
import prize15 from '../assets/prizes/15-cheques-25000.png';
import prize16_21 from '../assets/prizes/16-21-cheques-10000.png';
import prize22 from '../assets/prizes/22-cheques-5000.png';
import prize23 from '../assets/prizes/23-cheques-5000.png';
import prize24 from '../assets/prizes/24-cheques-reis.png';
import prize25 from '../assets/prizes/25-cheques-1000.png';
import prize26 from '../assets/prizes/26-cheques-350.png';
import prize27 from '../assets/prizes/27-bal.png';
import prize28 from '../assets/prizes/28-cheques-50.png';
import prize29 from '../assets/prizes/29-cheques-25.png';
import prize30 from '../assets/prizes/30-cheques-15.png';
import prize33_34 from '../assets/prizes/33-34 kookcadeau@2x.png';
import prize35 from '../assets/prizes/35-boek@2x.png';
import prize36 from '../assets/prizes/36-keuzeshop@2x.png';
import defaultPrize from '../assets/bingo-prize.png';

export const PRIZES = [
  { balls: 19, prize: "€ 25.000", label: "Volle kaart? Dan heeft u de eerste Bingo? U wint € 25.000" },
  { balls: 20, prize: "€ 10.000", label: "Bingo? U wint € 10.000" },
  { balls: 21, prize: "€ 10.000", label: "Bingo? U wint € 10.000" },
  { balls: 22, prize: "€ 5.000", label: "Bingo? U wint € 5.000" },
  { balls: 23, prize: "€ 5.000", label: "Bingo? U wint € 5.000" },
  { balls: 24, prize: "Reischeque t.w.v. € 2.500", label: "Bingo? U wint een Eredivisie reischeque t.w.v. € 2.500" },
  { balls: 25, prize: "€ 1.000", label: "Bingo? U wint € 1.000" },
  { balls: 26, prize: "€ 350", label: "Bingo? U wint € 350" },
  { balls: 27, prize: "VriendenLoterij Eredivisie voetbal", label: "Bingo? U wint een VriendenLoterij Eredivisie voetbal" },
  { balls: 28, prize: "€ 50", label: "Bingo? U wint € 50" },
  { balls: 29, prize: "€ 25", label: "Bingo? U wint € 25" },
  { balls: 30, prize: "€ 15", label: "Bingo? U wint € 15" },
  { balls: 31, prize: "€ 15", label: "Bingo? U wint € 15" },
  { balls: 32, prize: "€ 15", label: "Bingo? U wint € 15" },
  { balls: 33, prize: "Kookcadeau naar keuze", label: "Bingo? U wint een Kookcadeau naar keuze" },
  { balls: 34, prize: "Kookcadeau naar keuze", label: "Bingo? U wint een Kookcadeau naar keuze" },
  { balls: 35, prize: "Boek naar keuze", label: "Bingo? U wint een Boek naar keuze" },
  { balls: 36, prize: "Prijs naar keuze", label: "Bingo? U wint een Prijs naar keuze" },
];

export const TOTAL_NUMBERS = 45; // Total balls in the machine
export const GRID_SIZE = 4;
export const DRAW_INTERVAL = 5000; // Trekking interval (ms)
export const HIGHLIGHT_DURATION = 1500; // Last 2 seconds
export const MAX_DRAWN_BALLS = 36; // Maximum balls drawn per game
export const MANUAL_CHECK_SPEED_BOOST = 0.9; // Snelheidsverhoging bij handmatig afvinken (0.7 = 30% sneller)

// Skip animation settings
export const SKIP_BALL_INTERVAL = 320; // Base interval in ms per ball during skip
export const SKIP_USE_EASING = true; // Keep skip tempo consistent (not too fast)
export const SKIP_EASING_TYPE = 'in'; // 'in' (slow to fast), 'out' (fast to slow), 'in-out' (slow-fast-slow)
export const SKIP_EASING_FACTOR = 1; // Higher = more dramatic slowdown at end
export const SKIP_RESULT_DELAY = 1000; // Delay in ms om de kaart te zien na skip animatie voordat result screen verschijnt

// Prize thumbnail images mapped by number of balls
export const PRIZE_THUMBNAILS_BY_BALLS = {
  19: prize15, // € 25.000
  20: prize16_21, // € 10.000
  21: prize16_21, // € 10.000
  22: prize22, // € 5.000
  23: prize23, // € 5.000
  24: prize24, // Reischeque
  25: prize25, // € 1.000
  26: prize26, // € 350
  27: prize27, // Voetbal
  28: prize28, // € 50
  29: prize29, // € 25
  30: prize30, // € 15
  31: prize30, // € 15
  32: prize30, // € 15
  33: prize33_34, // Kookcadeau
  34: prize33_34, // Kookcadeau
  35: prize35, // Boek
  36: prize36, // Prijs naar keuze
};

// Fallback thumbnail for prizes without specific image
export const DEFAULT_PRIZE_THUMBNAIL = defaultPrize;

/**
 * Get thumbnail image for a prize based on number of balls
 * @param {number} balls - The number of balls (e.g., 19, 20, etc.)
 * @returns {string} - Thumbnail image path
 */
export const getPrizeThumbnailByBalls = (balls) => {
  if (!balls) return DEFAULT_PRIZE_THUMBNAIL;
  return PRIZE_THUMBNAILS_BY_BALLS[balls] || DEFAULT_PRIZE_THUMBNAIL;
};

/**
 * Get thumbnail URL for a prize (legacy function for backward compatibility)
 * @param {string} prizeText - The prize text (e.g., "€ 25.000")
 * @param {number} balls - Optional: number of balls to get specific image
 * @returns {string} - Thumbnail image path
 */
export const getPrizeThumbnail = (prizeText, balls = null) => {
  if (balls !== null) {
    return getPrizeThumbnailByBalls(balls);
  }
  // Fallback to default if no balls provided
  return DEFAULT_PRIZE_THUMBNAIL;
};

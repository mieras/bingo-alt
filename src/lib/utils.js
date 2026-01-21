import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Berekent de laatste zondag relatief ten opzichte van de huidige datum
 * @returns {Date} De datum van de laatste zondag
 */
export function getLastSunday() {
    const today = new Date();
    // Gebruik lokale tijd om tijdzone problemen te voorkomen
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    
    // Maak een nieuwe datum met lokale tijd
    const localToday = new Date(year, month, date);
    const dayOfWeek = localToday.getDay(); // 0 = zondag, 1 = maandag, etc.
    
    // Bereken hoeveel dagen terug we moeten gaan naar de laatste zondag
    // Als het vandaag zondag is, gebruik dan vandaag (0 dagen terug)
    // Anders ga terug naar de laatste zondag (1-6 dagen terug)
    const daysToSubtract = dayOfWeek === 0 ? 0 : dayOfWeek;
    
    const lastSunday = new Date(year, month, date - daysToSubtract);
    lastSunday.setHours(0, 0, 0, 0); // Reset tijd naar middernacht
    
    return lastSunday;
}

/**
 * Formatteert de datum als korte datum string (DD-MM-YY)
 * @param {Date} date - De datum om te formatteren
 * @returns {string} Geformatteerde datum string
 */
export function formatDateShort(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
}

/**
 * Formatteert de datum als lange datum string (Dag DD maand)
 * @param {Date} date - De datum om te formatteren
 * @returns {string} Geformatteerde datum string (bijv. "Zondag 8 februari")
 */
export function formatDateLong(date) {
    const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    
    return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} ${monthName}`;
}

/**
 * Formatteert de datum als volledige datum string (DD maand YYYY)
 * @param {Date} date - De datum om te formatteren
 * @returns {string} Geformatteerde datum string (bijv. "8 februari 2026")
 */
export function formatDateFull(date) {
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${monthName} ${year}`;
}

/**
 * Formatteert de datum als dag en maand (DD maand)
 * @param {Date} date - De datum om te formatteren
 * @returns {string} Geformatteerde datum string (bijv. "8 februari")
 */
export function formatDateDayMonth(date) {
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    
    return `${day} ${monthName}`;
}

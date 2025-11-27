/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Laca Text"', 'arial', 'sans-serif'],
                mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            colors: {
                // VL Primaire kleuren
                'vl-green': 'var(--vl-green)',
                'vl-green-lime': 'var(--vl-green-lime)',
                'vl-blue': 'var(--vl-blue)',
                'vl-orange': 'var(--vl-orange)',
                'vl-yellow': 'var(--vl-yellow)',
                
                // VL Neutrale kleuren
                'vl-black': 'var(--vl-black)',
                'vl-charcoal': 'var(--vl-charcoal)',
                'vl-text': 'var(--vl-text)',
                'vl-text-secondary': 'var(--vl-text-secondary)',
                'vl-grey': 'var(--vl-grey)',
                'vl-grey-light': 'var(--vl-grey-light)',
                'vl-grey-lightest': 'var(--vl-grey-lightest)',
                'vl-bg': 'var(--vl-bg)',
                'vl-white': 'var(--vl-white)',
                
                // DS Core kleuren
                'ds-black': 'var(--ds-core-black)',
                'ds-charcoal': 'var(--ds-core-charcoal-black)',
                'ds-grey': 'var(--ds-core-grey)',
                'ds-grey-light': 'var(--ds-core-light-grey)',
                'ds-grey-lightest': 'var(--ds-core-lightest-grey)',
                'ds-white': 'var(--ds-core-white)',
                'ds-red': 'var(--ds-core-red)',
                'ds-red-dark': 'var(--ds-core-dark-red)',
                'ds-orange': 'var(--ds-core-orange)',
                'ds-yellow': 'var(--ds-core-yellow)',
                'ds-blue': 'var(--ds-core-blue)',
                'ds-blue-dark': 'var(--ds-core-dark-blue)',
                'ds-green': 'var(--ds-core-green)',
                'ds-green-dark': 'var(--ds-core-dark-green)',
                
                // Bingo specifieke kleuren
                'bingo-bg-pink': 'var(--bingo-bg-pink)',
                'bingo-bg-orange': 'var(--bingo-bg-orange)',
                'bingo-bg-red': 'var(--bingo-bg-red)',
                'bingo-bg-green': 'var(--bingo-bg-green)',
                'bingo-bg-cyan': 'var(--bingo-bg-cyan)',
                'bingo-number': 'var(--bingo-number-blue)',
                'bingo-text': 'var(--bingo-text)',
                'bingo-scribble': 'var(--bingo-scribble)',
            },
        },
    },
    plugins: [],
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { PRIZES, TOTAL_NUMBERS, GRID_SIZE, DRAW_INTERVAL } from '../utils/constants';

export const useBingoGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, WON, LOST
    const [bingoCard, setBingoCard] = useState([]);
    const [drawnBalls, setDrawnBalls] = useState([]);
    const [currentBall, setCurrentBall] = useState(null);
    const [checkedNumbers, setCheckedNumbers] = useState(new Set());
    const [history, setHistory] = useState([]); // { ball, index, prize, isBingo }
    const [prize, setPrize] = useState(null);
    const [wigglingNumber, setWigglingNumber] = useState(null);

    const timerRef = useRef(null);
    const drawDeckRef = useRef([]);

    // Generate unique random numbers
    const generateNumbers = (count, max) => {
        const nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * max) + 1);
        }
        return Array.from(nums);
    };

    const startGame = useCallback(() => {
        // Generate Bingo Card (15 numbers for 4x4 grid with 1 empty)
        const cardNumbers = generateNumbers(15, TOTAL_NUMBERS);
        // Insert null at index 10 (or random?) for empty cell? 
        // Prompt says "4 x 4 (minus 1 empty cell)". Usually center or random.
        // Let's put it at index 11 (row 3, col 3) or just the last one?
        // Standard bingo is 5x5 with center free. 4x4 doesn't have a center.
        // Let's make the last cell empty or random. 
        // Fixed empty slot at index 10 (Row 3, Col 3, 0-indexed)
        const emptyIndex = 10;
        const grid = [];
        let numIdx = 0;
        for (let i = 0; i < 16; i++) {
            if (i === emptyIndex) {
                grid.push(null);
            } else {
                grid.push(cardNumbers[numIdx++]);
            }
        }
        setBingoCard(grid);

        // Prepare Draw Deck
        drawDeckRef.current = generateNumbers(TOTAL_NUMBERS, TOTAL_NUMBERS); // Shuffle 1-36
        // Actually generateNumbers returns a set order? No, Set iteration order is insertion order.
        // But Math.random inside loop makes it random.
        // Wait, generateNumbers logic:
        // while size < count, add random.
        // If I want a shuffled array of 1..36:
        const deck = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        drawDeckRef.current = deck;

        setDrawnBalls([]);
        setCurrentBall(null);
        setCheckedNumbers(new Set());
        setHistory([]);
        setPrize(null);
        setGameState('PLAYING');
    }, []);

    const checkWin = useCallback((checked) => {
        // Win if all numbers in bingoCard (except null) are in checked
        const numbersToWin = bingoCard.filter(n => n !== null);
        const isWin = numbersToWin.every(n => checked.has(n));
        return isWin;
    }, [bingoCard]);

    const drawNextBall = useCallback(() => {
        if (drawDeckRef.current.length === 0) {
            setGameState('FINISHED'); // Should not happen if win is guaranteed at 50%?
            // Prompt: "Make sure the change of having bing is at least 50%"
            // This implies I might need to rig the deck or card?
            // Or just normal probability?
            // With 36 numbers and 15 on card, drawing all 36 guarantees a win.
            // So eventually everyone wins.
            // The prize depends on WHEN you win.
            return;
        }

        const nextBall = drawDeckRef.current.pop();
        const newDrawn = [...drawnBalls, nextBall];

        // Auto-check previous ball if it was on card and not checked
        if (currentBall && bingoCard.includes(currentBall) && !checkedNumbers.has(currentBall)) {
            setCheckedNumbers(prev => new Set(prev).add(currentBall));
        }

        setDrawnBalls(prev => [...prev, nextBall]);
        setCurrentBall(nextBall);

        // Update History
        // Check if this ball causes a win (if we auto-checked it or user checked it)
        // Actually, win check happens after check.
        // But for history display "Bingo! U wint...", we need to know if this ball *could* trigger bingo?
        // The prompt says: "The number of drawn balls that you needed for a full Bingo card, determines your prize."
        // So we check win condition *after* this ball is processed (and auto-checked).

        // Wait, auto-check happens for the *previous* ball when the *new* ball appears.
        // "if they dont check the number it will automatically be checked when the new number apperars"
        // So for the *current* ball (nextBall), the user has 4 seconds.

        // Add to history
        // We need to calculate the prize for the *current* step (index + 1).
        const ballIndex = newDrawn.length;
        const prizeInfo = PRIZES.find(p => p.balls === ballIndex);

        setHistory(prev => [{
            ball: nextBall,
            index: ballIndex,
            prize: prizeInfo,
            timestamp: Date.now()
        }, ...prev]);

    }, [drawnBalls, currentBall, bingoCard, checkedNumbers]);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        // Initial draw
        if (drawnBalls.length === 0) {
            drawNextBall();
        }

        timerRef.current = setInterval(() => {
            // Check if we won with the *previous* state (including auto-check)
            // Actually, we should check win condition continuously.
            // If we win, we stop.

            // But we need to draw the next ball.
            drawNextBall();
        }, DRAW_INTERVAL);

        return () => clearInterval(timerRef.current);
    }, [gameState, drawNextBall, drawnBalls.length]);

    // Check Win Effect
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        if (checkWin(checkedNumbers)) {
            // WIN!
            clearInterval(timerRef.current);
            setGameState('WON');
            // Calculate prize based on drawnBalls count
            const count = drawnBalls.length;
            const wonPrize = PRIZES.find(p => p.balls === count);
            setPrize(wonPrize);
        }
    }, [checkedNumbers, gameState, checkWin, drawnBalls.length]);

    const handleCardClick = (number) => {
        if (gameState !== 'PLAYING') return;
        if (!number) return;

        if (drawnBalls.includes(number)) {
            // If the clicked number is the CURRENT ball, we can trigger a "fast forward" 
            // to fill all other currently drawn numbers that are on the card.
            // "would be nice if you press klik that your cards fill automatically based on the correct numbers with the draw"
            // This sounds like: if I click a valid number, auto-check ALL valid numbers that are currently drawn?

            const newChecked = new Set(checkedNumbers);
            newChecked.add(number);

            // Auto-fill other drawn numbers on the card
            bingoCard.forEach(n => {
                if (n && drawnBalls.includes(n) && !newChecked.has(n)) {
                    newChecked.add(n);
                }
            });

            setCheckedNumbers(newChecked);
        } else {
            // Wiggle
            setWigglingNumber(number);
            setTimeout(() => setWigglingNumber(null), 500);
        }
    };

    const finishGame = useCallback(() => {
        if (gameState !== 'PLAYING') return;

        clearInterval(timerRef.current);

        // Draw all remaining balls
        const remaining = [...drawDeckRef.current];
        const allDrawn = [...drawnBalls, ...remaining.reverse()]; // reverse because we pop

        // Auto-check all numbers on card
        const newChecked = new Set(checkedNumbers);
        bingoCard.forEach(num => {
            if (num && allDrawn.includes(num)) {
                newChecked.add(num);
            }
        });

        setCheckedNumbers(newChecked);
        setDrawnBalls(allDrawn);
        setCurrentBall(allDrawn[allDrawn.length - 1]);

        // Calculate Prize (based on when the LAST number was drawn)
        // Find the index of the last number needed to complete the card
        const cardNumbers = bingoCard.filter(n => n !== null);
        let maxIndex = -1;
        cardNumbers.forEach(num => {
            const idx = allDrawn.indexOf(num);
            if (idx > maxIndex) maxIndex = idx;
        });

        // Balls count = index + 1
        const ballsCount = maxIndex + 1;
        const wonPrize = PRIZES.find(p => p.balls === ballsCount);

        setPrize(wonPrize);
        setGameState('WON'); // Or FINISHED? Let's use WON to trigger result screen

    }, [gameState, drawnBalls, bingoCard, checkedNumbers]);

    return {
        gameState,
        bingoCard,
        currentBall,
        drawnBalls,
        checkedNumbers,
        history,
        prize,
        wigglingNumber,
        startGame,
        handleCardClick,
        finishGame
    };
};

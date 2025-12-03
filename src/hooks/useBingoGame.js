import { useState, useEffect, useCallback, useRef } from 'react';
import { PRIZES, TOTAL_NUMBERS, GRID_SIZE, DRAW_INTERVAL, MAX_DRAWN_BALLS } from '../utils/constants';

export const useBingoGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, WON, LOST, FINISHED
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
    const generateNumbers = (count, max, min = 1) => {
        const nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(nums);
    };

    const [maxBalls, setMaxBalls] = useState(MAX_DRAWN_BALLS);

    const startGame = useCallback(() => {
        // 50% chance to win
        const isWinner = Math.random() < 0.5;

        // Always draw all 36 balls
        const currentMaxBalls = MAX_DRAWN_BALLS;
        setMaxBalls(currentMaxBalls);

        // Generate Bingo Card (15 numbers from 1-45)
        const cardNumbers = generateNumbers(15, TOTAL_NUMBERS);

        // Fixed empty slot at index 10
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

        // Prepare Draw Deck - all 45 numbers shuffled
        const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

        let deck = [];

        if (isWinner) {
            // Winner: Ensure all 15 card numbers appear in the first 36 balls
            const cardSet = new Set(cardNumbers);
            const nonCardNumbers = allNumbers.filter(n => !cardSet.has(n));

            // Shuffle card numbers and non-card numbers separately
            const shuffledCardNums = cardNumbers.sort(() => Math.random() - 0.5);
            const shuffledNonCard = nonCardNumbers.sort(() => Math.random() - 0.5);

            // First 36 balls must include all card numbers
            // Take all 15 card numbers + 21 random non-card numbers
            const first36 = [...shuffledCardNums, ...shuffledNonCard.slice(0, 21)];
            const shuffledFirst36 = first36.sort(() => Math.random() - 0.5);

            // Remaining 9 balls
            const remaining = shuffledNonCard.slice(21);

            deck = [...shuffledFirst36, ...remaining];
        } else {
            // Loser: Ensure at least 1 card number is NOT in the first 36 balls
            const cardSet = new Set(cardNumbers);
            const nonCardNumbers = allNumbers.filter(n => !cardSet.has(n));

            const numMissing = Math.floor(Math.random() * 3) + 1; // 1-3 missing card numbers

            const shuffledCardNums = cardNumbers.sort(() => Math.random() - 0.5);
            const missingCardNums = shuffledCardNums.slice(0, numMissing); // These go in last 9
            const presentCardNums = shuffledCardNums.slice(numMissing);    // These go in first 36

            const shuffledNonCard = nonCardNumbers.sort(() => Math.random() - 0.5);

            // First 36 balls: presentCardNums + enough non-card to make 36
            const neededForFirst36 = 36 - presentCardNums.length;
            const first36 = [...presentCardNums, ...shuffledNonCard.slice(0, neededForFirst36)];
            const shuffledFirst36 = first36.sort(() => Math.random() - 0.5);

            // Last 9 balls: missingCardNums + remaining non-card
            const last9 = [...missingCardNums, ...shuffledNonCard.slice(neededForFirst36)];
            const shuffledLast9 = last9.sort(() => Math.random() - 0.5);

            deck = [...shuffledFirst36, ...shuffledLast9];
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
        // Stop if we reached max balls or deck is empty
        if (drawnBalls.length >= maxBalls || drawDeckRef.current.length === 0) {
            setGameState('FINISHED');
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

    }, [drawnBalls, currentBall, bingoCard, checkedNumbers, maxBalls]);

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
            const lookupCount = Math.max(count, 19); // Minimum prize at 19 balls
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);
            setPrize(wonPrize);
        }
    }, [checkedNumbers, gameState, checkWin, drawnBalls.length]);

    const handleCardClick = (number) => {
        if (gameState !== 'PLAYING') return;
        if (!number) return;

        if (drawnBalls.includes(number)) {
            // If the clicked number is the CURRENT ball, we can trigger a "fast forward" 
            // to fill all other currently drawn numbers that are on the card.

            const newChecked = new Set(checkedNumbers);
            newChecked.add(number);

            // Auto-fill other drawn numbers on the card
            bingoCard.forEach(n => {
                if (n && drawnBalls.includes(n) && !newChecked.has(n)) {
                    newChecked.add(n);
                }
            });

            setCheckedNumbers(newChecked);

            // Immediately draw the next ball to keep the pace
            drawNextBall();
        } else {
            // Wiggle
            setWigglingNumber(number);
            setTimeout(() => setWigglingNumber(null), 500);
        }
    };

    const finishGame = useCallback(() => {
        if (gameState !== 'PLAYING') return;

        clearInterval(timerRef.current);

        // Draw remaining balls UP TO maxBalls
        const currentDeck = [...drawDeckRef.current];
        const ballsNeeded = maxBalls - drawnBalls.length;

        // We need to take balls from the END of currentDeck because we use pop()
        // So we take the LAST 'ballsNeeded' elements
        const remainingToDraw = currentDeck.slice(-ballsNeeded).reverse();

        const allDrawn = [...drawnBalls, ...remainingToDraw];

        // Auto-check all numbers on card that are in allDrawn
        const newChecked = new Set(checkedNumbers);
        bingoCard.forEach(num => {
            if (num && allDrawn.includes(num)) {
                newChecked.add(num);
            }
        });

        setCheckedNumbers(newChecked);
        setDrawnBalls(allDrawn);
        setCurrentBall(allDrawn[allDrawn.length - 1]);

        // Check if won
        const numbersToWin = bingoCard.filter(n => n !== null);
        const isWin = numbersToWin.every(n => newChecked.has(n));

        if (isWin) {
            // Calculate Prize
            // Find the index of the last number needed to complete the card
            let maxIndex = -1;
            numbersToWin.forEach(num => {
                const idx = allDrawn.indexOf(num);
                if (idx > maxIndex) maxIndex = idx;
            });

            // Balls count = index + 1
            const ballsCount = maxIndex + 1;
            const lookupCount = Math.max(ballsCount, 19);
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);

            setPrize(wonPrize);
            setGameState('WON');
        } else {
            setGameState('FINISHED'); // No Win
        }

    }, [gameState, drawnBalls, bingoCard, checkedNumbers, maxBalls]);

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

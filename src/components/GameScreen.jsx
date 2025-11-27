import React, { useState, useEffect } from 'react';
import { GRID_SIZE, DRAW_INTERVAL } from '../utils/constants';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    wigglingNumber,
    onCardClick,
    onSkip,
    progress,
    panelColor
}) => {
    // Random kleur voor ballen (zelfde kleuren als background) - consistent per bal
    const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
    const getBallColor = (ballNumber) => {
        // Gebruik het bal nummer als seed voor consistente kleur
        return panelColors[ballNumber % panelColors.length];
    };

    // State voor hint timing (laatste 2 seconden voor nieuwe bal)
    const [showHint, setShowHint] = useState(false);

    // Timer voor hint: toon hint 2 seconden voordat nieuwe bal komt
    useEffect(() => {
        if (!currentBall) return;

        setShowHint(false);
        const hintTimer = setTimeout(() => {
            setShowHint(true);
        }, DRAW_INTERVAL - 2000); // 2 seconden voor nieuwe bal

        return () => clearTimeout(hintTimer);
    }, [currentBall]);

    return (
        <div className="flex overflow-hidden relative flex-col w-full h-full" style={{ backgroundColor: panelColor }}>
            <div className="flex-1 grid grid-rows-[auto_auto_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:grid-cols-2 gap-0 overflow-hidden">
                {/* Bingo Card */}
                <div className="flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden h-full min-h-[50vh] md:min-h-0 md:row-span-2 md:col-start-1 md:row-start-1">
                    <div className="space-y-4 w-full max-w-md">
                        {/* Grid */}
                        <div
                            className="grid p-2 bg-white rounded-lg border-2 border-gray-200"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                        >
                            {bingoCard.map((num, idx) => {
                                const isChecked = num && checkedNumbers.has(num);
                                const isCurrentMatch = num === currentBall && !isChecked;
                                const isWiggling = wigglingNumber === num;
                                const isEmpty = idx === 10;
                                const showMatchHint = showHint && isCurrentMatch;

                                return (
                                    <div
                                        key={idx}
                                        className="flex relative justify-center items-center bg-white border border-gray-200 aspect-square"
                                    >
                                        {isEmpty ? (
                                            <div className="w-2 h-2 rounded-full bg-bingo-text/20" />
                                        ) : (
                                            <button
                                                onClick={() => onCardClick(num)}
                                                disabled={!num || isChecked}
                                                className={`
                          w-full h-full flex items-center justify-center text-3xl md:text-5xl font-bold transition-all duration-200 relative z-10
                          ${isChecked ? 'text-bingo-number opacity-70' : 'text-bingo-number hover:bg-gray-50'}
                          ${isWiggling ? 'text-red-500 animate-wiggle' : ''}`}
                                            >
                                                <span className="relative z-10">{num}</span>
                                                {showMatchHint && (
                                                    <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ backgroundColor: '#DDF5F7' }}>
                                                    </div>
                                                )}
                                                {isChecked && (
                                                    <div className="flex absolute inset-0 z-0 justify-center items-center p-2">
                                                        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pop" style={{ color: '#DDF5F7' }}>
                                                            <path d="M27.0484 54.7643C23.8779 56.8627 19.4382 56.224 17.1325 53.3382C14.8271 50.4522 15.5288 46.4109 18.6991 44.3121L21.6121 42.3841L16.7797 43.0123C13.4444 43.446 10.233 41.685 9.09442 38.7986C7.9561 35.9124 9.20352 32.6956 12.0798 31.099L16.8429 28.4573L7.9129 29.3939C4.62947 29.7386 1.51845 27.9743 0.410901 25.1396C-0.696459 22.305 0.492529 19.1496 3.27768 17.5298L31.6713 1.01726C34.9749 -0.903967 39.364 -0.0238753 41.4747 2.98317C43.5853 5.9903 42.6185 9.98557 39.315 11.9069L36.841 13.347L47.2992 12.2476C50.6101 11.9 53.7418 13.6962 54.8258 16.565C55.9097 19.4341 54.6538 22.6037 51.8081 24.1833L48.8119 25.8477C51.7021 25.8132 54.3694 27.3891 55.479 29.8791C56.7048 32.63 55.7134 35.7878 53.0759 37.5338L27.0484 54.7643Z" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Current Ball */}
                <div className="flex relative justify-center items-center py-4 bg-white border-b border-gray-200 md:border-b md:border-l md:border-gray-200 md:col-start-2 md:row-start-1 md:py-0">
                    <div className="grid grid-cols-3 items-center px-4 w-full md:flex md:flex-col md:justify-center md:gap-4">
                        <h3 className="text-xs tracking-widest text-left uppercase text-bingo-text/60 md:text-center md:mb-4">Current</h3>

                        <div key={currentBall} className="flex relative justify-center items-center">
                            <div
                                className="flex justify-center items-center w-16 h-16 rounded-full md:w-32 md:h-32 animate-pop"
                                style={{ backgroundColor: currentBall ? getBallColor(currentBall) : '#ccc' }}
                            >
                                <span className="text-3xl font-black text-white md:text-6xl">
                                    {currentBall || '—'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onSkip}
                            className="px-6 py-2 text-xs tracking-wider uppercase border border-gray-300 transition-all duration-200 md:text-sm hover:bg-gray-50 hover:border-gray-400 text-bingo-text rounded-md relative active:translate-y-0 shadow-sm hover:shadow-md w-fit ml-auto md:mx-auto"
                        >
                            Results
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="flex overflow-hidden relative flex-col h-full bg-white border-t border-gray-200 md:border-t-0 md:border-l md:col-start-2 md:row-start-2">
                    {/* Progress Bar */}
                    <div className="relative w-full h-2 shrink-0" style={{ backgroundColor: '#DDF5F7' }}>
                        <div
                            className="h-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%`, backgroundColor: '#003884' }}
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 space-y-0">
                        <h3 className="sticky top-0 z-10 px-4 py-2 mb-4 text-xs tracking-widest uppercase bg-white text-bingo-text/60">
                            History
                        </h3>

                        {history.map((item, idx) => (
                            <div
                                key={item.timestamp}
                                className="flex gap-4 items-center px-4 py-2 border-b border-gray-100 animate-slide-in"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                <div className="flex gap-3 items-center">
                                    <div className="font-mono text-sm text-bingo-text/60 shrink-0">
                                        #{String(item.index).padStart(2, '0')}
                                    </div>
                                    <div
                                        className="flex justify-center items-center w-12 h-12 text-lg font-bold text-white rounded-full shrink-0"
                                        style={{ backgroundColor: getBallColor(item.ball) }}
                                    >
                                        {item.ball}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    {item.prize ? (
                                        <div className="text-sm font-medium truncate text-bingo-text">
                                            {item.prize.label}
                                        </div>
                                    ) : (
                                        <div className="text-sm italic text-bingo-text/60">
                                            De Bingo is nog niet gevallen
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;

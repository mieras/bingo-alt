import React from 'react';
import { GRID_SIZE } from '../utils/constants';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    wigglingNumber,
    onCardClick,
    onSkip,
    progress
}) => {
    return (
        <div className="h-full w-full overflow-hidden relative flex flex-col">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-900 relative shrink-0">
                <div
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex-1 grid grid-rows-[auto_auto_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:grid-cols-2 gap-0 overflow-hidden">
                {/* Bingo Card */}
                <div className="flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden h-full min-h-[50vh] md:min-h-0 md:row-span-2 md:col-start-1 md:row-start-1">
                    <div className="w-full max-w-md">
                        {/* Grid */}
                        <div
                            className="grid border border-white/20"
                            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                        >
                            {bingoCard.map((num, idx) => {
                                const isChecked = num && checkedNumbers.has(num);
                                const isCurrentMatch = num === currentBall && !isChecked;
                                const isWiggling = wigglingNumber === num;
                                const isEmpty = idx === 10;

                                return (
                                    <div
                                        key={idx}
                                        className="border border-white/20 aspect-square flex items-center justify-center relative"
                                    >
                                        {isEmpty ? (
                                            <div className="w-2 h-2 bg-white/40 rounded-full" />
                                        ) : (
                                            <button
                                                onClick={() => onCardClick(num)}
                                                disabled={!num || isChecked}
                                                className={`
                          w-full h-full flex items-center justify-center text-2xl md:text-4xl font-bold transition-all duration-200
                          ${isChecked ? 'text-gray-700' : 'text-white hover:bg-white/5'}
                          ${isCurrentMatch ? 'animate-pulse-blue bg-white/10' : ''}
                          ${isWiggling ? 'animate-wiggle text-red-500' : ''}
                        `}
                                            >
                                                {num}
                                                {isChecked && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
                <div className="flex items-center justify-center border-b border-white/10 md:border-b md:border-l md:border-white/10 relative md:col-start-2 md:row-start-1 py-4 md:py-0">
                    <div className="flex items-center md:flex-col gap-4 px-4 w-full justify-between md:justify-center">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 md:mb-4">Current</h3>

                        <div key={currentBall} className="relative">
                            <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center animate-pop">
                                <span className="text-3xl md:text-6xl font-black text-black">
                                    {currentBall || '—'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onSkip}
                            className="text-xs md:text-sm px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                        >
                            Skip
                        </button>
                    </div>
                </div>

                {/* History */}
                <div className="flex flex-col border-t md:border-t-0 md:border-l border-white/10 relative overflow-hidden md:col-start-2 md:row-start-2 h-full">
                    <div className="flex-1 overflow-y-auto p-4 space-y-0">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 sticky top-0 py-2 bg-black z-10">
                            History
                        </h3>

                        {history.map((item, idx) => (
                            <div
                                key={item.timestamp}
                                className="flex items-center gap-4 py-4 border-b border-white/5 animate-slide-in"
                                style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-500 shrink-0 font-mono">
                                        Ball #{String(item.index).padStart(2, '0')}
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold shrink-0 text-black text-lg">
                                        {item.ball}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    {item.prize ? (
                                        <div className="text-sm font-medium truncate">
                                            {item.prize.label}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-600 italic">
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

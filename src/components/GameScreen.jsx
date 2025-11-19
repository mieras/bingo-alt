import React from 'react';
import { GRID_SIZE } from '../utils/constants';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    wigglingNumber,
    onCardClick,
    onSkip
}) => {
    const isMatch = currentBall && bingoCard.includes(currentBall) && !checkedNumbers.has(currentBall);

    return (
        <div className="h-full w-full overflow-hidden relative z-10 grid grid-rows-[auto_auto_minmax(0,1fr)] md:grid-rows-[1fr_1fr] md:grid-cols-2 gap-0">
            {/* Left Side (Top on Mobile): Bingo Card */}
            <div className="flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden h-full min-h-[50vh] md:min-h-0 md:row-span-2 md:col-start-1 md:row-start-1">
                <div className="bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-2xl p-3 md:p-6 max-w-md w-full relative overflow-hidden h-full flex flex-col max-h-full">
                    {/* Header */}
                    <div className="text-center mb-1 md:mb-4 shrink-0">
                        <h2 className="text-lg md:text-2xl font-black text-[#003087] uppercase leading-none tracking-tighter">
                            VRIENDENLOTERIJ
                        </h2>
                        <h3 className="text-xl md:text-3xl font-black text-[#003087] lowercase tracking-tighter -mt-1">
                            eredivisie
                        </h3>
                    </div>

                    {/* BINGO Balls Header */}
                    <div className="flex justify-between mb-1 md:mb-4 px-2 shrink-0">
                        {['B', 'I', 'N', 'G', 'O'].map((letter, idx) => (
                            <div key={idx} className="w-7 h-7 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
                                <span className="text-white font-black text-sm md:text-2xl drop-shadow-sm">{letter}</span>
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div
                        className="grid border-2 border-[#d1d5db] rounded-xl overflow-hidden bg-white flex-1 min-h-0"
                        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                    >
                        {bingoCard.map((num, idx) => {
                            const isChecked = num && checkedNumbers.has(num);
                            const isCurrentMatch = num === currentBall && !isChecked;
                            const isWiggling = wigglingNumber === num;
                            const isEmpty = idx === 10; // Fixed empty slot

                            return (
                                <div
                                    key={idx}
                                    className={`
                    border border-[#e5e7eb] flex items-center justify-center relative
                    ${!num && !isEmpty ? 'bg-gray-50' : ''}
                  `}
                                >
                                    {isEmpty ? (
                                        <div className="flex flex-col items-center justify-center opacity-80">
                                            <div className="w-5 h-5 md:w-8 md:h-8 rounded-full border-2 md:border-4 border-[#003087] flex items-center justify-center">
                                                <span className="text-[#003087] font-bold text-[8px] md:text-xs">VL</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => onCardClick(num)}
                                            disabled={!num || isChecked}
                                            className={`
                        w-full h-full flex items-center justify-center text-lg md:text-3xl font-bold transition-all duration-200
                        ${isChecked ? 'text-gray-300' : 'text-[#003087] hover:bg-blue-50'}
                        ${isCurrentMatch ? 'animate-pulse-blue bg-blue-50' : ''}
                        ${isWiggling ? 'animate-wiggle text-red-500' : ''}
                      `}
                                        >
                                            {num}
                                            {isChecked && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#00a1e0] opacity-20"></div>
                                                    <span className="absolute text-xl md:text-4xl text-[#00a1e0] font-black animate-pop">
                                                        ✕
                                                    </span>
                                                </div>
                                            )}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-1 md:mt-6 shrink-0">
                        <p className="text-[#003087] font-bold text-xs md:text-lg italic transform -rotate-2">
                            elke dag plezier
                        </p>
                    </div>
                </div>
            </div>

            {/* Middle (Mobile) / Right Top (Desktop): Current Ball */}
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-md md:border-l md:border-b border-white/20 relative z-0 md:col-start-2 md:row-start-1 md:p-8 py-2 md:py-0">
                <div className="flex items-center md:flex-col gap-4 px-4 w-full justify-between md:justify-center">
                    <h3 className="text-white/90 uppercase tracking-widest text-xs font-bold md:mb-4 md:text-sm drop-shadow-sm">Current Ball</h3>

                    <div key={currentBall} className="relative">
                        <div className="w-10 h-10 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pop border-2 md:border-4 border-[#003087]">
                            <span className="text-lg md:text-7xl font-black text-[#003087]">
                                {currentBall || '?'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onSkip}
                        className="md:mt-8 bg-white hover:bg-gray-100 text-[#e91e63] font-bold text-xs md:text-sm px-3 py-1.5 md:px-6 md:py-2 rounded-full shadow-md transition-colors border border-[#e91e63]/20"
                    >
                        Skip to Result ⏭
                    </button>
                </div>
            </div>

            {/* Bottom (Mobile) / Right Bottom (Desktop): History */}
            <div className="flex flex-col bg-white/90 md:bg-white/10 md:backdrop-blur-md md:border-l border-white/20 relative z-0 overflow-hidden md:col-start-2 md:row-start-2 h-full">
                <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-3 scroll-smooth">
                    <h3 className="text-[#003087] md:text-white/80 uppercase tracking-widest text-xs mb-1 md:mb-2 sticky top-0 py-2 z-10 font-bold bg-white/95 md:bg-transparent backdrop-blur">
                        Draw History
                    </h3>

                    {history.map((item, idx) => (
                        <div
                            key={item.timestamp}
                            className={`
                flex items-center p-2 md:p-3 rounded-xl border shadow-sm
                ${idx === 0 ? 'bg-white border-blue-200 scale-100 md:scale-105' : 'bg-white/80 border-gray-100'}
                animate-pop
              `}
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#003087] flex items-center justify-center font-bold text-white mr-3 md:mr-4 shrink-0 border-2 border-white shadow-sm text-sm md:text-base">
                                {item.ball}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs md:text-sm">
                                    <span className="text-gray-500 mr-2 font-mono">#{item.index}</span>
                                    {item.prize ? (
                                        <span className="text-[#e91e63] font-bold truncate block">
                                            {item.prize.label}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 italic text-[10px] md:text-xs">De Bingo is nog niet gevallen</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameScreen;

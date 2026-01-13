import React, { useEffect, useRef } from 'react';

const BallsHistory = ({ drawnBalls, getBallColor, checkedByUser = new Set() }) => {
    const containerRef = useRef(null);

    // Auto-scroll naar begin bij nieuwe bal
    useEffect(() => {
        if (containerRef.current && drawnBalls.length > 0) {
            // Scroll naar links (begin)
            containerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [drawnBalls.length]);

    // Ballen in omgekeerde volgorde (nieuwste eerst)
    const reversedBalls = [...drawnBalls].reverse();

    return (
        <div
            ref={containerRef}
            className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
            style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
            }}
            role="region"
            aria-label="Geschiedenis van getrokken ballen"
        >
            {reversedBalls.map((ball, idx) => {
                // idx 0 = nieuwste bal, dus ballIndex = drawnBalls.length - idx
                const ballIndex = drawnBalls.length - idx;
                const isNewest = idx === 0;
                const isCheckedByUser = checkedByUser.has(ball);

                return (
                    <div
                        key={`${ball}-${idx}`}
                        className={`flex flex-col items-center shrink-0 rounded-lg p-2 ${isNewest ? 'animate-bg-fade-yellow' : ''}`}
                        style={{ 
                            minWidth: '72px',
                            backgroundColor: isNewest ? '#fff9e6' : 'transparent',
                        }}
                    >
                        {/* Checkmark linksboven als gebruiker heeft afgevinkt */}
                        <div className="w-full h-4 flex justify-start mb-1">
                            {isCheckedByUser && (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#009CBE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </div>

                        {/* Ball */}
                        <div
                            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative ${isNewest ? 'animate-slide-in-left' : ''}`}
                            style={{
                                backgroundColor: getBallColor(ball),
                                backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(0,0,0,0.2)'
                            }}
                        >
                            {/* White Badge Container */}
                            <div className="w-9 h-9 bg-white rounded-[14px] flex flex-col items-center justify-center shadow-[inset_1px_2px_1px_rgba(0,0,0,0.05)] relative z-0">
                                <span className="pt-0 font-bold leading-none text-gray-900 text-base text-box-trim">{ball}</span>
                                <div className="w-4 h-[2.5px] bg-gray-900 mt-[0px] rounded-full opacity-80"></div>
                            </div>
                        </div>

                        {/* Trekking nummer */}
                        <span className="text-xs text-gray-500 font-medium mt-1">
                            {String(ballIndex).padStart(2, '0')}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default BallsHistory;

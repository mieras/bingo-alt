import React, { useEffect, useRef } from 'react';

const UncheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="white" stroke="#E5E6E6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="#B9E2E5" />
        <path d="M3.75 6L5.25 7.5L8.25 4.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BallsHistory = ({ drawnBalls, getBallColor, checkedByUser = new Set(), animate = false }) => {
    const containerRef = useRef(null);

    // Auto-scroll naar begin bij nieuwe bal
    useEffect(() => {
        if (containerRef.current && drawnBalls.length > 0) {
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
            className="overflow-hidden w-full"
            style={{
                borderRadius: '8px',
                border: '1px solid #F3F3F3',
                background: '#FFF',
                boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
            }}
        >
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-0 px-0 py-0 scrollbar-hide"
                style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                }}
                role="region"
                aria-label="Geschiedenis van getrokken ballen"
            >
                {reversedBalls.map((ball, idx) => {
                    const ballIndex = drawnBalls.length - idx;
                    const isCheckedByUser = checkedByUser.has(ball);
                    const isFirst = idx === 0;
                    const isLast = idx === reversedBalls.length - 1;

                    return (
                        <div
                            key={`${ball}-${idx}`}
                            className="flex flex-col items-center shrink-0 ball-history-item"
                            style={{ width: '72px' }}
                        >
                            {/* Vakje met border + checkbox absolute */}
                            <div
                                className={`flex relative justify-center items-center ${isFirst && animate ? 'ball-history-item-bg' : ''}`}
                                style={{
                                    width: '72px',
                                    height: '96px',
                                    borderRight: isLast ? '0px' : '1px solid #F3F3F3',
                                    background: '#FFF',

                                }}
                            >
                                <div className="absolute top-[4px] left-[4px]">
                                    {isCheckedByUser ? <CheckedIcon /> : <UncheckedIcon />}
                                </div>

                                {/* Ball */}
                                <div
                                    className={`flex relative justify-center items-center w-12 h-12 rounded-full shadow-lg ${isFirst && animate ? 'ball-reveal-bounce' : ''}`}
                                    style={{
                                        backgroundColor: getBallColor(ball),
                                        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.18), inset -2px -2px 6px rgba(0,0,0,0.18)'
                                    }}
                                >
                                    <div className="w-8 h-8 bg-white rounded-[12px] flex flex-col items-center justify-center shadow-[inset_1px_2px_1px_rgba(0,0,0,0.05)]">
                                        <span className="pt-0 text-sm font-bold leading-none text-gray-900 text-box-trim">{ball}</span>
                                        <div className="w-3 h-[2.5px] bg-gray-900 mt-0 rounded-full opacity-80"></div>
                                    </div>
                                </div>

                                {/* Trekking nummer IN vakje */}
                                <div
                                    className="absolute bottom-[4px] left-1/2 -translate-x-1/2 text-[11px] leading-none font-medium text-[#8F97A3]"
                                    aria-label={`Trekking nummer ${String(ballIndex).padStart(2, '0')}`}
                                >
                                    {String(ballIndex).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BallsHistory;

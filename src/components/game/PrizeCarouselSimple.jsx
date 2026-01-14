import React, { useState, useEffect } from 'react';
import { PRIZES, getPrizeThumbnailByBalls } from '../../utils/constants';

const PrizeCarouselSimple = ({ autoPlay = true, interval = 1000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate through prizes
    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= PRIZES.length - 1) {
                    return 0; // Loop back to start
                }
                return prev + 1;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval]);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {PRIZES.map((prize, idx) => {
                    const isCenter = idx === currentIndex;
                    const distance = Math.abs(idx - currentIndex);

                    return (
                        <div
                            key={prize.balls}
                            className="shrink-0 w-full flex justify-center items-center"
                            style={{
                                filter: isCenter ? 'blur(0px)' : `blur(${Math.min(distance * 8, 20)}px)`,
                                opacity: isCenter ? 1 : Math.max(0.3, 1 - distance * 0.3),
                                transition: 'filter 0.3s, opacity 0.3s'
                            }}
                        >
                            <img
                                src={getPrizeThumbnailByBalls(prize.balls)}
                                alt={prize.prize}
                                className="w-48 h-48 object-contain"
                                draggable="false"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PrizeCarouselSimple;

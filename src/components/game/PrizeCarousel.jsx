import React, { useState, useEffect } from 'react';
import { PRIZES, getPrizeThumbnailByBalls } from '../../utils/constants';

const PrizeCarousel = ({ onComplete, finalDrawnBalls, bingoCard, onCheckNumber }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [showBalls, setShowBalls] = useState(false);

    // Auto-rotate through prizes
    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= PRIZES.length - 1) {
                    // Carousel complete, show balls
                    setIsAnimating(false);
                    setShowBalls(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 800); // 800ms per prize

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Animate balls after carousel
    useEffect(() => {
        if (!showBalls || !finalDrawnBalls || finalDrawnBalls.length === 0) return;

        let ballIndex = 0;
        const animateBalls = () => {
            if (ballIndex >= finalDrawnBalls.length) {
                // All balls animated, complete
                if (onComplete) {
                    onComplete();
                }
                return;
            }

            const ball = finalDrawnBalls[ballIndex];
            // Check if ball is on card
            if (bingoCard.includes(ball) && onCheckNumber) {
                onCheckNumber(ball);
            }

            ballIndex++;
            setTimeout(animateBalls, 200); // 200ms per ball
        };

        // Start animation after a short delay
        setTimeout(animateBalls, 500);
    }, [showBalls, finalDrawnBalls, bingoCard, onCheckNumber, onComplete]);

    if (showBalls) {
        // Show balls animation (this will be handled by parent component)
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full py-8">
            <div className="text-center mb-4">
                <p className="text-lg font-semibold text-gray-700">We controleren je kaart...</p>
            </div>
            
            <div className="relative w-full max-w-md overflow-hidden">
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
                                className="flex-shrink-0 w-full px-4 flex justify-center"
                                style={{
                                    filter: isCenter ? 'blur(0px)' : `blur(${Math.min(distance * 8, 20)}px)`,
                                    opacity: isCenter ? 1 : Math.max(0.3, 1 - distance * 0.3),
                                    transition: 'filter 0.3s, opacity 0.3s'
                                }}
                            >
                                <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-200">
                                    <div className="flex flex-col items-center gap-4">
                                        <img
                                            src={getPrizeThumbnailByBalls(prize.balls)}
                                            alt={prize.prize}
                                            className="w-32 h-32 object-contain"
                                        />
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 mb-1">{prize.balls}e getrokken bal</p>
                                            <p className="text-lg font-bold text-gray-900">{prize.prize}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PrizeCarousel;

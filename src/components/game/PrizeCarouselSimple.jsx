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

    const getSlideClass = (index) => {
        if (index === currentIndex) {
            return 'active';
        }

        const total = PRIZES.length;
        const diff = index - currentIndex;

        // Handle wrapping for previous/next
        let normalizedDiff = diff;
        if (normalizedDiff > total / 2) {
            normalizedDiff -= total;
        } else if (normalizedDiff < -total / 2) {
            normalizedDiff += total;
        }

        if (normalizedDiff === -1) {
            return 'preactive';
        } else if (normalizedDiff === 1) {
            return 'proactive';
        } else if (normalizedDiff === -2) {
            return 'preactivede';
        } else if (normalizedDiff === 2) {
            return 'proactivede';
        } else {
            return 'preactivede';
        }
    };

    return (
        <div className="prize-carousel-container">
            <div className="prize-carousel-content">
                {PRIZES.map((prize, index) => {
                    const slideClass = getSlideClass(index);
                    return (
                        <div
                            key={prize.balls}
                            className={`prize-carousel-slide ${slideClass}`}
                        >
                            <img
                                className="prize-carousel-image"
                                src={getPrizeThumbnailByBalls(prize.balls)}
                                alt={prize.prize}
                                draggable="false"
                            />
                            {/* <p className="prize-carousel-text">{prize.prize}</p> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PrizeCarouselSimple;

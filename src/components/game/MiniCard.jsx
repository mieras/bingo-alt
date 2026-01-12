import React, { useState, useEffect } from 'react';
import { GRID_SIZE } from '../../utils/constants';
import vlbLogo from '../../assets/vlb-logo.png';

const MiniCard = ({ bingoCard, checkedNumbers, animateChecks = false, drawnBalls = [], useAbsolute = true }) => {
    const [animatedChecked, setAnimatedChecked] = useState(new Set());
    const [isVisible, setIsVisible] = useState(false);

    // Slide-in animation when component mounts
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Animate checks based on drawnBalls order - very fast animation
    useEffect(() => {
        if (!animateChecks || drawnBalls.length === 0 || bingoCard.length === 0) {
            // If not animating, use checkedNumbers directly
            setAnimatedChecked(checkedNumbers);
            return;
        }

        // Reset animated checked
        setAnimatedChecked(new Set());

        // Animate each number in the order they were drawn - very fast (30ms per number)
        let currentIndex = 0;
        const animateNext = () => {
            if (currentIndex >= drawnBalls.length) {
                return;
            }

            const ball = drawnBalls[currentIndex];
            // Only check if this number is on the card
            if (bingoCard.includes(ball)) {
                setAnimatedChecked(prev => new Set(prev).add(ball));
            }

            currentIndex++;
            // Very fast animation: 30ms per number
            setTimeout(animateNext, 30);
        };

        // Start animation immediately
        const timeout = setTimeout(animateNext, 50);

        return () => {
            clearTimeout(timeout);
        };
    }, [animateChecks, drawnBalls, bingoCard, checkedNumbers]);

    // Use animatedChecked if animating, otherwise use checkedNumbers
    const displayChecked = animateChecks ? animatedChecked : checkedNumbers;

    const containerStyle = useAbsolute ? {
        position: 'absolute',
        zIndex: 50,
        bottom: '-2rem',
        right: '1rem',
        transform: `rotate(5deg) translateX(${isVisible ? '0' : '10px'}) translateY(${isVisible ? '0' : '10px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'all 200ms ease-out',
    } : {
        transform: 'rotate(5deg)',
        transition: 'all 200ms ease-out',
    };

    return (
        <div
            className={useAbsolute ? '' : 'relative'}
            style={containerStyle}
        >
            {/* Red card holder */}
            <div
                className="flex flex-col justify-end items-center p-2 pt-1 pb-2 rounded"
                style={{
                    width: '90px',
                    height: '111px',
                    backgroundColor: '#E73358',
                    boxShadow: '0px 67px 80px 0px rgba(0,0,0,0.07), 0px 28px 33px 0px rgba(0,0,0,0.05), 0px 15px 18px 0px rgba(0,0,0,0.04), 0px 8px 10px 0px rgba(0,0,0,0.04), 0px 4px 5px 0px rgba(0,0,0,0.03), 0px 2px 2px 0px rgba(0,0,0,0.02)',
                }}
            >
                {/* Logo header */}
                <div
                    className="absolute top-[5px] left-2 right-2 bg-white rounded-t-md flex items-center justify-center"
                    style={{ height: '25px', padding: '2px 4px' }}
                >
                    <img
                        src={vlbLogo}
                        alt="VriendenLoterij Bingo"
                        className="object-contain w-full h-auto"
                        style={{ maxHeight: '20px' }}
                    />
                </div>

                {/* Mini Bingo Card */}
                <div
                    className="overflow-hidden bg-white"
                    style={{
                        width: '74px',
                        borderBottomLeftRadius: '37px',
                        borderBottomRightRadius: '37px',
                        paddingTop: '8px',
                        paddingBottom: '16px',
                        paddingLeft: '4px',
                        paddingRight: '4px',
                    }}
                >
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gap: '0px',
                        }}
                    >
                        {bingoCard.map((num, idx) => {
                            const isChecked = num && displayChecked.has(num);
                            const isEmpty = idx === 10;

                            return (
                                <div
                                    key={idx}
                                    className="flex relative justify-center items-center border border-gray-50"
                                    style={{
                                        width: '16.5px',
                                        height: '13.5px',
                                        fontSize: '9px',
                                        fontWeight: 600,
                                        color: '#003884',
                                    }}
                                >
                                    {isEmpty ? (
                                        <svg
                                            width="6"
                                            height="6"
                                            viewBox="0 0 36 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="18" cy="18" r="14" fill="#003884" fillOpacity="0.1" />
                                        </svg>
                                    ) : (
                                        <>
                                            <span className="relative z-10">{num < 10 ? `0${num}` : num}</span>
                                            {isChecked && (
                                                <div
                                                    className="flex absolute inset-0 z-0 justify-center items-center"
                                                >
                                                    <div
                                                        className="rounded-full"
                                                        style={{
                                                            width: '14px',
                                                            height: '14px',
                                                            backgroundColor: '#B9E2E5',
                                                            opacity: 0.8,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCard;

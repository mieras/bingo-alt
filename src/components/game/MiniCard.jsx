import React, { useState, useEffect } from 'react';
import { GRID_SIZE } from '../../utils/constants';
import vlbLogo from '../../assets/vlb-logo.png';

const MiniCard = ({ bingoCard, checkedNumbers, animateChecks = false, drawnBalls = [], useAbsolute = true, cardColor = '#E73358', noRotation = false }) => {
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

    const rotation = noRotation ? '0deg' : '5deg';
    const containerStyle = useAbsolute ? {
        transform: `rotate(${rotation}) translateX(${isVisible ? '0' : '10px'}) translateY(${isVisible ? '0' : '10px'})`,
        opacity: isVisible ? 1 : 0,
    } : {
        transform: `rotate(${rotation})`,
    };

    return (
        <div
            className={`${useAbsolute ? 'absolute z-50 -bottom-4 right-4' : 'relative'} transition-all duration-200 ease-out`}
            style={containerStyle}
        >
            {/* Red card holder */}
            <div
                className="flex flex-col justify-end items-center p-2 pt-1 pb-2 rounded w-[90px] h-[111px] shadow-[0px_67px_80px_0px_rgba(0,0,0,0.07),0px_28px_33px_0px_rgba(0,0,0,0.05),0px_15px_18px_0px_rgba(0,0,0,0.04),0px_8px_10px_0px_rgba(0,0,0,0.04),0px_4px_5px_0px_rgba(0,0,0,0.03),0px_2px_2px_0px_rgba(0,0,0,0.02)]"
                style={{
                    backgroundColor: cardColor,
                }}
            >
                {/* Logo header */}
                <div className="absolute top-[5px] left-2 right-2 bg-white rounded-t-md flex items-center justify-center h-[25px] p-[2px_4px]">
                    <img
                        src={vlbLogo}
                        alt="VriendenLoterij Bingo"
                        className="object-contain w-full h-auto max-h-5"
                    />
                </div>

                {/* Mini Bingo Card */}
                <div className="overflow-hidden bg-white w-[74px] rounded-bl-[37px] rounded-br-[37px] pt-2 pb-4 px-1">
                    <div
                        className="grid gap-0"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        }}
                    >
                        {bingoCard.map((num, idx) => {
                            const isChecked = num && displayChecked.has(num);
                            const isEmpty = idx === 10;

                            return (
                                <div
                                    key={idx}
                                    className="flex relative justify-center items-center border border-gray-50 w-[16.5px] h-[13.5px] text-[9px] font-semibold text-[#003884]"
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
                                                    <div className="rounded-full w-[14px] h-[14px] bg-[#B9E2E5] opacity-80" />
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

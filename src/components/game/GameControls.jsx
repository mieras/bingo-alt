import React from 'react';

const GameControls = ({ onSkip, isGameFinished, isSkipping, isPaused, onPause, onResume, onNextBall }) => {
    if (isGameFinished) return null;

    return (
        <div
            className="fixed right-0 bottom-0 left-0 h-32 pointer-events-none"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 70%)'
            }}
        >
            <div className="flex flex-col gap-2 justify-end items-center px-3 pb-5 h-full pointer-events-none">
                {isPaused ? (
                    <>
                        {/* Paused state: Volgende bal (secondary) + Play (primary icon) */}
                        <div className="flex gap-2 items-stretch w-full max-w-[351px] pointer-events-auto">
                            <button
                                onClick={onNextBall}
                                disabled={isSkipping}
                                className={`
                                    flex-1 btn-secondary
                                    ${isSkipping ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
                                `}
                                aria-label="Trek volgende bal"
                            >
                                Volgende bal
                            </button>
                            <button
                                onClick={onResume}
                                disabled={isSkipping}
                                className={`
                                    w-14 flex items-center justify-center btn-primary self-stretch
                                    pointer-events-auto
                                    ${isSkipping ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
                                `}
                                aria-label="Hervat trekking"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.83301 4.15809C5.83301 3.34879 5.83301 2.94414 6.00175 2.72108C6.14875 2.52675 6.37344 2.4065 6.61667 2.39198C6.89587 2.37531 7.23256 2.59977 7.90594 3.04869L16.6689 8.89067C17.2253 9.2616 17.5035 9.44707 17.6005 9.68084C17.6852 9.88522 17.6852 10.1149 17.6005 10.3193C17.5035 10.5531 17.2253 10.7385 16.6689 11.1095L7.90594 16.9514C7.23256 17.4004 6.89587 17.6248 6.61667 17.6082C6.37344 17.5936 6.14875 17.4734 6.00175 17.2791C5.83301 17.056 5.83301 16.6513 5.83301 15.842V4.15809Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Playing state: Pauzeer button (primary) */}
                        <button
                            onClick={onPause}
                            disabled={isSkipping}
                            className={`
                                w-full max-w-[351px] btn-primary
                                pointer-events-auto
                                ${isSkipping ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'}
                            `}
                            aria-label="Pauzeer trekking"
                        >
                            <div className="flex gap-2 justify-center items-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 3H6V13H4V3Z" fill="white" />
                                    <path d="M10 3H12V13H10V3Z" fill="white" />
                                </svg>
                                <span>Pauzeer</span>
                            </div>
                        </button>
                    </>
                )}

                {/* Skip link - altijd zichtbaar */}
                <button
                    onClick={onSkip}
                    disabled={isSkipping}
                    className={`
                        text-sm text-[#003884] underline hover:text-[#002a5f] transition-colors 
                        bg-transparent border-none cursor-pointer p-0 pointer-events-auto
                        ${isSkipping ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    aria-label={isSkipping ? 'Kaart wordt gecontroleerd' : 'Ga direct naar de uitslag'}
                >
                    Direct naar uitslag
                </button>
            </div>
        </div>
    );
};

export default GameControls;

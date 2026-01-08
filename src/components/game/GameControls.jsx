import React from 'react';

const GameControls = ({ onSkip, isGameFinished, isSkipping }) => {
    if (isGameFinished) return null;

    return (
        <div
            className="fixed right-0 bottom-0 left-0 h-32 pointer-events-none"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 70%)'
            }}
        >
            <div className="flex justify-center items-end px-3 pb-5 h-full pointer-events-none">
                <button
                    onClick={onSkip}
                    disabled={isSkipping}
                    className={`
                        w-full max-w-[351px] px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-md 
                        bg-white text-[#003884] border-2 border-[#003884] shadow-lg 
                        transition-all duration-200 pointer-events-auto
                        focus:outline-none focus:ring-2 focus:ring-[#003884] focus:ring-offset-2
                        ${isSkipping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:shadow-xl active:scale-[0.98]'}
                    `}
                    aria-label={isSkipping ? 'Kaart wordt gecontroleerd' : 'Ga direct naar de uitslag'}
                >
                    {isSkipping ? 'Kaart controleren...' : 'Direct naar uitslag'}
                </button>
            </div>
        </div>
    );
};

export default GameControls;

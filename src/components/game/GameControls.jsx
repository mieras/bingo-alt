import React from 'react';

const GameControls = ({ onSkip, isGameFinished, isSkipping }) => {
    if (isGameFinished) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 70%)'
            }}
        >
            <div className="flex items-end justify-center h-full px-3 pb-5 pointer-events-none">
                <button
                    onClick={onSkip}
                    disabled={isSkipping}
                    className={`
                        w-full max-w-[351px] px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-md 
                        bg-white text-[#003884] border-2 border-[#003884] shadow-lg 
                        transition-all duration-200 pointer-events-auto
                        ${isSkipping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:shadow-xl active:scale-[0.98]'}
                    `}
                >
                    {isSkipping ? 'Resultaat ophalen...' : 'Skip naar uitslag'}
                </button>
            </div>
        </div>
    );
};

export default GameControls;

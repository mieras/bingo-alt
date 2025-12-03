import React from 'react';
import logoImg from '../../assets/vlb-logo.png';

const GameHeader = () => {
    const today = new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: '2-digit' });

    return (
        <>
            {/* Close Button - Fixed Position: Top 160px, Right 16px */}
            <button className="fixed top-[16px] right-4 z-50 w-10 h-10 bg-[#003884] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-800 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Header Info: Code - Logo - Datum (Over de hele breedte) */}
            <div className="w-full max-w-full flex h-[96px] z-5 justify-between items-center pt-14 px-4 bg-white">
                <span className="text-black/70 text-xs font-medium tracking-wide">45854-AB</span>
                <div className="flex-1 flex justify-center px-2">
                    <img src={logoImg} alt="VriendenLoterij Bingo" className="w-full max-w-[160px] translate-y-[-8px] object-contain drop-shadow-md" />
                </div>
                <span className="text-black/70 text-xs font-medium tracking-wide">{today}</span>
            </div>
        </>
    );
};

export default GameHeader;

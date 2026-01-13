import React from 'react';
import { getPrizeThumbnailByBalls } from '../../utils/constants';

const PrizeCard = ({ currentBall, ballIndex, prize }) => {
    return (
        <div 
            className="flex gap-3 items-center p-4 bg-white rounded-lg border border-gray-200"
            style={{
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.08)'
            }}
        >
            {/* Info - Links */}
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-600 mb-1">
                    {ballIndex}e getrokken bal
                </div>
                {prize ? (
                    <div className="text-base text-gray-900 leading-snug">
                        <span className="font-semibold">Bingo!</span> U wint {prize.prize}
                    </div>
                ) : (
                    <div className="text-base text-gray-600">
                        De bingo is nog niet gevallen
                    </div>
                )}
            </div>

            {/* Prize Thumbnail - Rechts (als prijs beschikbaar) */}
            {prize ? (
                <div className="overflow-hidden w-20 h-16 bg-gray-100 rounded-lg shrink-0">
                    <img
                        src={getPrizeThumbnailByBalls(prize.balls)}
                        alt={prize.prize}
                        className="object-contain w-full h-full p-1"
                    />
                </div>
            ) : (
                <div className="overflow-hidden w-10 h-10 shrink-0 flex items-center justify-center">
                    {/* Zandloper icoon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V9L14 12L12 15V18M8 6H16M8 18H16M9 6V9L12 12L9 15V18M15 6V9L12 12L15 15V18" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default PrizeCard;

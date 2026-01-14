import React, { useEffect, useRef } from 'react';
import { getPrizeThumbnailByBalls } from '../../utils/constants';

const PrizeCard = ({ currentBall, ballIndex, prize }) => {
    const svgRef = useRef(null);

    // Trigger animatie opnieuw wanneer ballIndex verandert
    useEffect(() => {
        if (!prize && svgRef.current) {
            // Reset animatie door tijdelijk te verwijderen en weer toe te voegen
            const svg = svgRef.current;
            svg.style.animation = 'none';
            // Force reflow
            void svg.offsetWidth;
            // Herstart animatie
            svg.style.animation = '';
        }
    }, [ballIndex, prize]);

    return (
        <div
            className="flex gap-3 items-center bg-white rounded-lg border border-gray-100"
            style={{
                boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
            }}
        >
            {/* Info - Links */}
            <div className="flex-1 p-4 min-w-0">
                <div className="mb-1 text-sm font-medium text-gray-600">
                    {ballIndex}e getrokken bal
                </div>
                {prize ? (
                    <div className="text-base leading-snug text-gray-900">
                        <span className="font-semibold">Bingo?</span> U wint {prize.prize}
                    </div>
                ) : (
                    <div className="text-base text-gray-600">
                        De bingo is nog niet gevallen
                    </div>
                )}
            </div>

            {/* Prize Thumbnail - Rechts (als prijs beschikbaar) */}
            {prize ? (
                <div className="overflow-hidden w-32 h-32 bg-gray-100 shrink-0">
                    <img
                        src={getPrizeThumbnailByBalls(prize.balls)}
                        alt={prize.prize}
                        className="object-contain p-1 w-full h-full"
                    />
                </div>
            ) : (
                <div className="flex overflow-hidden justify-center items-center w-24 h-24 bg-gray-100 shrink-0">
                    {/* Zandloper icoon */}
                    <svg
                        ref={svgRef}
                        id={`hourglass-svg-${ballIndex}`}
                        className="hourglass-svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.2">
                            <path d="M18.1626 2H5.83744C5.37494 2 5 2.37494 5 2.83744C5 5.50268 6.05876 8.05876 7.94337 9.94337L9.16256 11.1626C9.28363 11.2836 9.34417 11.3442 9.3875 11.4023C9.65188 11.7569 9.65188 12.2431 9.3875 12.5977C9.34417 12.6558 9.28363 12.7164 9.16256 12.8374L7.94337 14.0566C6.05876 15.9412 5 18.4973 5 21.1626C5 21.6251 5.37494 22 5.83744 22H18.1626C18.6251 22 19 21.6251 19 21.1626C19 18.4973 17.9412 15.9412 16.0566 14.0566L14.8374 12.8374C14.7164 12.7164 14.6558 12.6558 14.6125 12.5977C14.3481 12.2431 14.3481 11.7569 14.6125 11.4023C14.6558 11.3442 14.7164 11.2836 14.8374 11.1626L16.0566 9.94337C17.9412 8.05876 19 5.50268 19 2.83744C19 2.37494 18.6251 2 18.1626 2Z" stroke="#29313D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default PrizeCard;

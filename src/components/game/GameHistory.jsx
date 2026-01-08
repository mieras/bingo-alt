import React from 'react';
import { getPrizeThumbnail } from '../../utils/constants';

const highlightPrizeText = (labelText, prizeText) => {
    if (!labelText) return null;

    const bingoMatch = labelText.match(/bingo!?/i);

    if (!bingoMatch) {
        return labelText;
    }

    const beforeBingo = labelText.slice(0, bingoMatch.index);
    const afterBingo = labelText.slice(bingoMatch.index + bingoMatch[0].length);
    const normalizedAfter = afterBingo.toLowerCase();
    const normalizedPrize = (prizeText || '').toLowerCase();
    const prizeIndex = normalizedPrize ? normalizedAfter.indexOf(normalizedPrize) : -1;

    if (prizeIndex === -1) {
        return (
            <>
                {beforeBingo}
                <span className="font-semibold text-gray-900">{bingoMatch[0]}</span>
                {afterBingo}
            </>
        );
    }

    const beforePrize = afterBingo.slice(0, prizeIndex);
    const afterPrize = afterBingo.slice(prizeIndex + prizeText.length);
    const highlightedPrize = afterBingo.slice(prizeIndex, prizeIndex + prizeText.length);

    return (
        <>
            {beforeBingo}
            <span className="font-semibold text-gray-900">{bingoMatch[0]}</span>
            {beforePrize}
            <span className="font-semibold text-gray-900">{highlightedPrize}</span>
            {afterPrize}
        </>
    );
};

const GameHistory = ({ history, getBallColor, isGameFinished }) => {
    return (
        <ol className="pb-24 list-none" aria-label="Geschiedenis van getrokken ballen">
            {history.map((item, idx) => {
                const isNewest = idx === 0;

                return (
                    <li
                        key={item.timestamp}
                        className={`
                        flex gap-3 items-center px-2 transition-colors border-b border-gray-100
                        ${isNewest ? 'py-4 animate-bg-fade' : 'py-3'}
`}
                    >
                        {/* Ball Number - Links (met originele vorm) */}
                        <div className="flex justify-center w-14 shrink-0">
                            <div
                                className={`w-13 h-13 rounded-full shadow-lg flex items-center justify-center relative ${isNewest ? 'animate-slide-in-left' : ''}`}
                                style={{
                                    backgroundColor: getBallColor(item.ball),
                                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(0,0,0,0.2)'
                                }}
                            >
                                {/* White Badge Container */}
                                <div className="w-8 h-8 bg-white rounded-[12px] flex flex-col items-center justify-center shadow-[inset_1px_2px_1px_rgba(0,0,0,0.05)] relative z-0">
                                    <span className="pt-0 font-bold leading-none text-gray-900 text-l text-box-trim">{item.ball}</span>
                                    <div className="w-3 h-[2.5px] bg-gray-900 mt-[0px] rounded-full opacity-80"></div>
                                </div>
                            </div>
                        </div>

                        {/* Info - Midden */}
                        <div className="flex-1 min-w-0">
                            <div className={`font-medium text-gray-700 ${isNewest ? 'text-xs' : 'text-xs'}`}>
                                {String(item.index)}e getrokken bal
                            </div>
                            {item.prize ? (
                                <div className="text-s text-gray-800 mt-0.5 leading-snug">
                                    {highlightPrizeText(item.prize.label, item.prize.prize)}
                                </div>
                            ) : (
                                <div className="text-s text-gray-500 italic mt-0.5">
                                    De Bingo is nog niet gevallen
                                </div>
                            )}
                        </div>

                        {/* Prize Thumbnail - Rechts (als prijs beschikbaar) */}
                        {item.prize && (
                            <div className="overflow-hidden w-16 h-16 bg-gray-100 rounded-lg shrink-0">
                                <img
                                    src={getPrizeThumbnail(item.prize.prize)}
                                    alt={item.prize.prize}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
};

export default GameHistory;

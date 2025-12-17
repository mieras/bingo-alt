import React from 'react';

const GameHistory = ({ history, getBallColor, isGameFinished }) => {
    return (
        <div className="pb-24">
            {history.map((item, idx) => {
                const isNewest = idx === 0;

                return (
                    <div
                        key={item.timestamp}
                        className={`
                        flex gap-4 items-center px-4 transition-colors
                        ${isNewest ? 'py-4 animate-bg-fade' : 'py-3'}
`}
                    >
                        {/* Info - Links */}
                        <div className="flex-1 min-w-0">
                            <div className={`font - medium text - gray - 700 ${isNewest ? 'text-sm' : 'text-xs'} `}>
                                {String(item.index)}e getrokken bal
                            </div>
                            {item.prize ? (
                                <div className="text-s text-gray-800 mt-0.5 font-semibold">
                                    {item.prize.label}
                                </div>
                            ) : (
                                <div className="text-s text-gray-400 italic mt-0.5">
                                    De Bingo is nog niet gevallen
                                </div>
                            )}
                        </div>

                        {/* Ball Number - Rechts */}
                        <div className="w-16 flex justify-center flex-shrink-0 ">
                            {isNewest ? (
                                <div
                                    className="w-16 h-16 rounded-full shadow-lg animate-roll-in flex items-center justify-center relative"
                                    style={{
                                        backgroundColor: getBallColor(item.ball),
                                        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {/* White Badge Container */}
                                    <div className="w-10 h-10 bg-white rounded-[12px] flex flex-col items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] relative z-10">
                                        <span className="text-2xl font-bold text-gray-800 leading-none pt-1 text-box-trim">{item.ball}</span>
                                        <div className="w-3 h-[2px] bg-gray-800 mt-[px] rounded-full opacity-80"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-12 h-12 flex justify-center items-center font-bold rounded-full leading-none text-box-trim text-xl text-gray-500 bg-gray-100">
                                    {item.ball}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GameHistory;

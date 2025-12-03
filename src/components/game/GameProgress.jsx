import React from 'react';

const GameProgress = ({ drawnBalls, progress }) => {
    return (
        <>
            {/* Info Bar - "Bal" en counter op achtergrondkleur */}
            <div className="flex justify-between items-end px-4 py-2 mt-auto max-w-full mx-auto w-full">
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">Bal</h2>
                <span className="text-xs font-medium text-white/90">
                    {String(drawnBalls.length).padStart(2, '0')}/36
                </span>
            </div>

            {/* Progress Bar - op achtergrondkleur */}
            <div className="relative w-full h-[6px] bg-black/10">
                <div
                    className="h-full transition-all duration-300 ease-out bg-[#003884]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </>
    );
};

export default GameProgress;

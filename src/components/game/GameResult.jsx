import React from 'react';

const GameResult = ({ prize }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-2 text-center animate-fade-in">
            <h2 className="text-4xl font-black text-[#003884]">
                {prize ? 'BINGO!' : 'HELAAS'}
            </h2>
            {prize ? (
                <>
                    <div className="mb-2">
                        <p className="text-gray-500 mb-2 uppercase tracking-wide text-sm">Je hebt gewonnen</p>
                        <p className="text-2xl font-bold text-[#AA167C] tracking-tight">{prize.prize}</p>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-3 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-blue-800 transition-colors uppercase tracking-wide"
                    >
                        Hoe ontvang ik mijn prijs?
                    </button>
                    <p className="text-xs text-gray-500 mt-4 max-w-md italic">
                        * Onder voorbehoud van een geslaagde toekomstige incasso
                    </p>
                </>
            ) : (
                <>
                    <p className="text-gray-500 mb-4">Geen prijs deze keer. Volgende keer beter!</p>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-blue-800 transition-colors uppercase tracking-wide"
                    >
                        Nog een keer spelen
                    </button>
                </>
            )}
        </div>
    );
};

export default GameResult;

import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-bingo-text">
          BINGO
        </h1>

        <div className="space-y-4 mb-12 text-bingo-text/70">
          <p className="text-lg">
            Get a full card to win prizes
          </p>
          <p className="text-sm">
            36 numbers will be drawn • 4×4 grid • 50% win chance
          </p>
        </div>

        <button
          onClick={onStart}
          className="btn-primary"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

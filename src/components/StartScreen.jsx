import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col justify-center items-center p-8 w-full h-full text-center">
      <div className="max-w-2xl">
        <h1 className="mb-2 text-6xl font-black tracking-tighter md:text-8xl text-bingo-text">
          Bingo
        </h1>

        <div className="mb-4 text-bingo-text/70">
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

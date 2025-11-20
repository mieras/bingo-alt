import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GRID_SIZE } from '../utils/constants';

const ResultScreen = ({ prize, history, bingoCard, checkedNumbers }) => {
  useEffect(() => {
    if (prize) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [prize]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-black border-2 border-white p-8 md:p-12 max-w-4xl w-full relative flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto animate-scale-up">

        {/* Left: Result Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-center">
            {prize ? 'BINGO!' : 'NO WIN'}
          </h1>

          {prize ? (
            <div className="space-y-6">
              <div className="border border-white/20 p-6">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Prize</p>
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  {prize.prize}
                </h2>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider text-gray-500">Balls Drawn</span>
                  <span className="text-2xl font-black">{prize.balls}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                "{prize.label}"
              </p>
            </div>
          ) : (
            <div className="border border-white/20 p-6">
              <p className="text-gray-500">Better luck next time</p>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-8 btn-primary w-full"
          >
            Play Again
          </button>
        </div>

        {/* Right: Final Card */}
        <div className="flex-1 w-full max-w-sm">
          <div className="border border-white/20 p-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 text-center">Final Card</h3>
            <div
              className="grid border border-white/20"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
              {bingoCard.map((num, idx) => {
                const isChecked = num && checkedNumbers.has(num);
                const isEmpty = idx === 10;

                return (
                  <div
                    key={idx}
                    className="border border-white/20 aspect-square flex items-center justify-center relative"
                  >
                    {isEmpty ? (
                      <div className="w-2 h-2 bg-white/40 rounded-full" />
                    ) : (
                      <div className={`
                          w-full h-full flex items-center justify-center text-xl font-bold
                          ${isChecked ? 'text-gray-700' : 'text-white'}
                        `}
                      >
                        {num}
                        {isChecked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultScreen;

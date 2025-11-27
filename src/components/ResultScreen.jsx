import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GRID_SIZE } from '../utils/constants';

const ResultScreen = ({ prize, history, bingoCard, checkedNumbers, panelColor }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white border-2 border-gray-200 p-8 md:p-12 max-w-4xl w-full relative flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto animate-scale-up shadow-2xl">

        {/* Left: Result Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-center text-bingo-text">
            {prize ? 'BINGO!' : 'NO WIN'}
          </h1>

          {prize ? (
            <div className="space-y-6">
              <div className="border border-gray-200 p-6 bg-gray-50">
                <p className="text-sm uppercase tracking-widest text-bingo-text/60 mb-2">Prize</p>
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-bingo-text">
                  {prize.prize}
                </h2>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider text-bingo-text/60">Balls Drawn</span>
                  <span className="text-2xl font-black text-bingo-text">{prize.balls}</span>
                </div>
              </div>
              <p className="text-sm text-bingo-text/70 italic">
                "{prize.label}"
              </p>
            </div>
          ) : (
            <div className="border border-gray-200 p-6 bg-gray-50">
              <p className="text-bingo-text/70">Better luck next time</p>
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
          <div className="border border-gray-200 p-4 rounded-lg" style={{ backgroundColor: panelColor || '#f9fafb' }}>
            <h3 className="text-xs uppercase tracking-widest text-bingo-text/60 mb-4 text-center">Final Card</h3>
            <div
              className="grid bg-white border-2 border-gray-200 rounded-lg p-2"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
              {bingoCard.map((num, idx) => {
                const isChecked = num && checkedNumbers.has(num);
                const isEmpty = idx === 10;

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 aspect-square flex items-center justify-center relative bg-white"
                  >
                    {isEmpty ? (
                      <div className="w-2 h-2 bg-bingo-text/20 rounded-full" />
                    ) : (
                      <div className={`
                          w-full h-full flex items-center justify-center text-2xl md:text-3xl font-bold relative z-10
                          ${isChecked ? 'text-bingo-number opacity-70' : 'text-bingo-number'}
                        `}
                      >
                        <span className="relative z-10">{num}</span>
                        {isChecked && (
                          <div className="absolute inset-0 flex items-center justify-center z-0 p-2">
                            <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pop" style={{ color: '#DDF5F7' }}>
                              <path d="M27.0484 54.7643C23.8779 56.8627 19.4382 56.224 17.1325 53.3382C14.8271 50.4522 15.5288 46.4109 18.6991 44.3121L21.6121 42.3841L16.7797 43.0123C13.4444 43.446 10.233 41.685 9.09442 38.7986C7.9561 35.9124 9.20352 32.6956 12.0798 31.099L16.8429 28.4573L7.9129 29.3939C4.62947 29.7386 1.51845 27.9743 0.410901 25.1396C-0.696459 22.305 0.492529 19.1496 3.27768 17.5298L31.6713 1.01726C34.9749 -0.903967 39.364 -0.0238753 41.4747 2.98317C43.5853 5.9903 42.6185 9.98557 39.315 11.9069L36.841 13.347L47.2992 12.2476C50.6101 11.9 53.7418 13.6962 54.8258 16.565C55.9097 19.4341 54.6538 22.6037 51.8081 24.1833L48.8119 25.8477C51.7021 25.8132 54.3694 27.3891 55.479 29.8791C56.7048 32.63 55.7134 35.7878 53.0759 37.5338L27.0484 54.7643Z" fill="currentColor" />
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

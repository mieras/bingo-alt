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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl max-w-4xl w-full relative flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto animate-scale-up">

        {/* Left: Result Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-black mb-4 md:mb-6 text-[#003087] drop-shadow-sm animate-pop text-center">
            BINGO!
          </h1>

          {prize ? (
            <div className="bg-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100 transform hover:scale-105 transition-transform duration-300">
              <p className="text-xl md:text-2xl text-[#00a1e0] mb-2 font-bold">You won</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#e91e63] mb-4 md:mb-6 leading-tight">
                {prize.prize}
              </h2>
              <div className="w-full h-px bg-gray-200 mb-4 md:mb-6"></div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#003087] font-bold text-lg">Balls Drawn:</span>
                <span className="bg-[#003087] text-white font-black px-4 py-2 rounded-full text-xl">{prize.balls}</span>
              </div>
              <p className="text-base md:text-lg text-[#003087] italic font-medium">
                "{prize.label}"
              </p>
            </div>
          ) : (
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h2 className="text-3xl font-bold text-red-500 mb-2">Game Over</h2>
              <p className="text-gray-600">Better luck next time!</p>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-8 md:mt-12 btn-primary text-lg md:text-xl px-8 md:px-10 py-3 shadow-lg w-full"
          >
            PLAY AGAIN
          </button>
        </div>

        {/* Right: Final Card */}
        <div className="flex-1 w-full max-w-sm">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <h3 className="text-[#003087] font-bold mb-4 uppercase tracking-widest text-sm text-center">Final Card</h3>
            <div
              className="grid border-2 border-[#d1d5db] rounded-xl overflow-hidden bg-white"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
              {bingoCard.map((num, idx) => {
                const isChecked = num && checkedNumbers.has(num);
                const isEmpty = idx === 10;

                return (
                  <div
                    key={idx}
                    className={`
                        aspect-square border border-[#e5e7eb] flex items-center justify-center relative
                        ${!num && !isEmpty ? 'bg-gray-50' : ''}
                      `}
                  >
                    {isEmpty ? (
                      <div className="flex flex-col items-center justify-center opacity-80">
                        <div className="w-6 h-6 rounded-full border-2 border-[#003087] flex items-center justify-center">
                          <span className="text-[#003087] font-bold text-[10px]">VL</span>
                        </div>
                      </div>
                    ) : (
                      <div className={`
                            w-full h-full flex items-center justify-center text-xl font-bold
                            ${isChecked ? 'text-gray-300' : 'text-[#003087]'}
                          `}
                      >
                        {num}
                        {isChecked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#00a1e0] opacity-20"></div>
                            <span className="absolute text-2xl text-[#00a1e0] font-black">
                              ✕
                            </span>
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

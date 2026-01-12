import React, { useEffect } from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnail } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import prizeImage from '../assets/bingo-prize.png';
import GameHeader from './game/GameHeader';
import MiniCard from './game/MiniCard';
import confetti from 'canvas-confetti';

const WonScreen = ({ prize, drawnBalls, onBackToBingo, showHeader = false, bingoCard = [], checkedNumbers = new Set() }) => {
  if (!prize) return null;

  // Confetti effect bij won screen
  useEffect(() => {
    const duration = 3 * 1000;
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
  }, []);

  const prizeThumbnail = getPrizeThumbnail(prize.prize);
  const winningBallIndex = drawnBalls.length;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable Content - Hero Image + Content */}
      <div className="overflow-y-auto flex-1">
        {/* Hero Image Section - Scrolls with content */}
        <div
          className="flex relative justify-center items-center w-full animate-fade-in"
          style={{
            background: 'radial-gradient(209.91% 178.12% at -12.83% -103.12%, #F1D168 0%, #FEF6C8 32%, #F2D064 68%, #FCF3C3 100%)',
            borderRadius: '0px',
            minHeight: '200px',
          }}
        >
          <div className="flex relative justify-center items-center py-8 w-full">
            {/* Confetti Image */}
            <img
              src={confettiImage}
              alt="Confetti"
              className="object-contain absolute inset-0 w-full h-full opacity-0"
              style={{
                animation: 'confetti-zoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards'
              }}
            />
            {/* Prize Image */}
            <img
              src={prizeImage}
              alt={prize.prize}
              className="relative z-10 w-full max-w-[180px] h-auto object-contain opacity-0"
              style={{
                animation: 'prize-bounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards'
              }}
            />
          </div>

          {/* Mini Bingo Card - rechtsboven, half over header */}
          {bingoCard.length > 0 && (
            <MiniCard 
              bingoCard={bingoCard} 
              checkedNumbers={checkedNumbers}
              animateChecks={true}
              drawnBalls={drawnBalls}
            />
          )}
        </div>

        {/* Content Section */}
        <ContentWrapper className="flex flex-col items-center px-2 pt-6 pb-8 bg-white">
          {/* Result Info */}
          <div className="py-6 w-full bg-white rounded-lg">
            <h2
              className="text-5xl font-black text-[#003884] mb-2 text-center opacity-0 animate-fade-in"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Bingo!
            </h2>
            <p className="mb-4 text-sm text-center text-gray-600">
              {winningBallIndex}e getrokken bal
            </p>
            <p className="text-2xl font-bold text-[#AA167C] mb-0 text-center">
              Je wint {prize.prize.toLowerCase()}
            </p>
            <p className="text-base text-[#29313d] leading-relaxed text-center">
              U ontvangt automatisch binnen 4 weken na bekendmaking berichtgeving over uw prijs.
            </p>
          </div>

          {/* Upsell Section */}
          <div className="p-4 mb-6 w-full bg-gray-50 rounded-lg border border-blue-200">
            <div className="flex gap-4 items-center">
              <div className="overflow-hidden w-16 h-16 bg-white rounded-lg shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop"
                  alt="Extra kaart"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#003884] mb-1">
                  Meer kans maken?
                </h3>
                <p className="text-sm text-gray-600">
                  Koop een extra Bingokaart.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Bingo Button */}
          <button
            onClick={onBackToBingo}
            className="w-full bg-[#003884] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
            aria-label="Terug naar Bingo"
          >
            Terug naar Bingo
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default WonScreen;

import React, { useEffect } from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnailByBalls } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import GameHeader from './game/GameHeader';
import MiniCard from './game/MiniCard';
import confetti from 'canvas-confetti';

// Upsell image
import upsellImage from '../assets/vl-extra-bingo.png';

const WonScreen = ({ prize, drawnBalls, onBackToBingo, showHeader = false, bingoCard = [], checkedNumbers = new Set(), panelColor = '#E73358' }) => {
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

  const prizeThumbnail = getPrizeThumbnailByBalls(prize.balls);
  const winningBallIndex = drawnBalls.length;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1">
        {/* Hero Section met MiniCard */}
        <div
          className="flex relative justify-center items-center w-full"
          style={{
            minHeight: '228px',
            padding: '24px 12px',
            background: 'radial-gradient(209.91% 178.12% at -12.83% -103.12%, #F1D168 0%, #FEF6C8 32%, #F2D064 68%, #FCF3C3 100%)',
          }}
        >
          {/* Confetti achtergrond */}
          <img
            src={confettiImage}
            alt=""
            className="object-cover absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            style={{
              animation: 'confetti-zoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards'
            }}
          />

          {/* MiniCard - gecentreerd in hero */}
          {bingoCard.length > 0 && (
            <div
              className="relative z-10 opacity-0"
              style={{
                transform: 'scale(0) rotate(-6deg)',
                animation: 'card-bounce-large 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards'
              }}
            >
              <MiniCard
                bingoCard={bingoCard}
                checkedNumbers={checkedNumbers}
                animateChecks={true}
                drawnBalls={drawnBalls}
                cardColor={panelColor}
                useAbsolute={false}
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <ContentWrapper className="flex flex-col items-center px-4 pt-4 pb-6 bg-white">
          {/* Result Info */}
          <div className="mb-4 w-full text-center">
            <h2
              className="text-3xl font-bold text-[#333] mb-1 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Bingo!
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              {winningBallIndex}e getrokken bal
            </p>

            {/* Prize Image */}
            <div className="flex justify-center mb-4">
              <img
                src={prizeThumbnail}
                alt={prize.prize}
                className="w-auto max-w-[160px] h-auto max-h-[120px] object-contain opacity-0"
                style={{
                  animation: 'prize-bounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards'
                }}
              />
            </div>

            <h3 className="text-lg font-bold text-[#333] mb-2">
              Je wint {prize.prize.toLowerCase()}.
            </h3>
            <p className="text-base text-[#111] leading-relaxed">
              Je ontvangt automatisch binnen 4 weken na bekendmaking berichtgeving over uw prijs.
            </p>
          </div>

          {/* Primary Button */}
          <button
            onClick={onBackToBingo}
            className="w-full bg-[#003884] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#002a5f] transition-colors text-base mb-4"
            style={{
              boxShadow: 'inset 0px -2px 0px 0px #002a5f'
            }}
          >
            Alles over je prijs
          </button>

          {/* Upsell Section */}
          <div
            className="overflow-hidden w-full rounded-lg"
            style={{
              border: '2px solid #E5E6E6',
              boxShadow: '0 1px 0 0 #E5E5E5'
            }}
          >
            <div className="flex gap-4 items-center p-4">
              <div className="overflow-hidden w-16 h-16 rounded-lg shrink-0">
                <img
                  src={upsellImage}
                  alt="Extra Bingokaarten"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#003884] text-lg mb-1">
                  Meer kans maken?
                </h3>
                <p className="text-base text-[#111]">
                  Koop een extra Bingokaart.
                </p>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default WonScreen;

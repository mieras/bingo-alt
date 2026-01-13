import React, { useEffect } from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnailByBalls } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import bingoTypeImage from '../assets/vl-bingo-type.png';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import GameProgress from './game/GameProgress';
import BallsHistory from './game/BallsHistory';
import confetti from 'canvas-confetti';

// Upsell image
import upsellImage from '../assets/vl-extra-bingo.png';

const WonScreen = ({ prize, drawnBalls, progress = 0, onBackToBingo, onReplay, showHeader = false, bingoCard = [], checkedNumbers = new Set() }) => {
  if (!prize) return null;

  // Confetti effect bij won screen
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#F2D064', '#F1D168', '#FEF6C8', '#FFFFFF', '#FFCD14'] };

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
  const handleReplay = () => {
    if (onReplay) return onReplay();
    return onBackToBingo();
  };

  // Random kleur voor ballen
  const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
  const getBallColor = (ballNumber) => {
    return panelColors[ballNumber % panelColors.length];
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1">
        {/* Hero Section (zelfde opbouw als spelscherm: kaart + bal count) */}
        <div className="flex overflow-hidden relative flex-col shrink-0">
          {/* Achtergrond alleen in de hero (zacht infaden; geen harde overgang) */}
          <div
            className="absolute inset-0 opacity-0 animate-fade-in"
            style={{
              background: 'radial-gradient(209.91% 178.12% at -12.83% -103.12%, #F1D168 0%, #FEF6C8 32%, #F2D064 68%, #FCF3C3 100%)',
              animationDuration: '450ms',
              animationFillMode: 'forwards'
            }}
            aria-hidden="true"
          />

          {/* Confetti achtergrond (fade + zoom 1.1 -> 1) */}
          <img
            src={confettiImage}
            alt=""
            className="object-cover absolute inset-0 w-full h-full opacity-0 pointer-events-none animate-hero-confetti-fade-zoom"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          />

          <div className="flex relative z-10 flex-col">
            {/* Bingo Card Container */}
            <div className="flex flex-col flex-1 justify-center items-center">
              {bingoCard.length > 0 && (
                <div className="flex relative justify-center w-full">
                  <BingoCard
                    bingoCard={bingoCard}
                    checkedNumbers={checkedNumbers}
                    currentBall={null}
                    wigglingNumber={null}
                    showHint={false}
                    onCardClick={() => { }}
                    opacity={0.8}
                    className="mb-0"
                  />

                  {/* Bingo woord PNG: center/center over de kaart */}
                  <div className="grid absolute inset-0 z-20 place-items-center pointer-events-none">
                    <img
                      src={bingoTypeImage}
                      alt="Bingo!"
                      className="w-[240px] max-w-[70%] opacity-0"
                      style={{ animation: 'fade-in 0.6s ease-out 0.35s forwards' }}
                      draggable="false"
                    />
                  </div>
                </div>
              )}
            </div>

            <GameProgress drawnBalls={drawnBalls} progress={progress} />
          </div>
        </div>

        {/* Horizontale Balls Strip */}
        {drawnBalls.length > 0 && (
          <div className="px-4 py-3 bg-white">
            <BallsHistory drawnBalls={drawnBalls} getBallColor={getBallColor} checkedByUser={checkedNumbers} />
          </div>
        )}

        {/* Content Section */}
        <ContentWrapper className="flex flex-col items-center px-4 pt-4 pb-6 bg-white">
          {/* Prize Card met gouden border */}
          <div
            className="overflow-hidden mb-4 min-h-20 w-full gradient-border-gold"
          >
            <div className="flex items-stretch h-full min-h-20">
              {/* Info - Links (padding alleen op tekst, verticaal gecentreerd) */}
              <div className="flex-1 px-4 py-3 min-w-0 flex flex-col justify-center">
                <div className="text-xs font-medium text-gray-700">
                  {winningBallIndex}e getrokken bal
                </div>
                <div className="text-sm text-gray-800 mt-0.5 leading-snug font-bold">
                  Bingo! U wint {prize.prize}
                </div>
              </div>

              {/* Prize Image - flush tegen rand, volledige hoogte */}
              <div
                className="flex justify-center items-center w-20 shrink-0"
                style={{ backgroundColor: '#F2D064' }}
              >
                <img
                  src={prizeThumbnail}
                  alt={prize.prize}
                  className="object-cover w-full h-full"
                  draggable="false"
                />
              </div>
            </div>
          </div>

          {/* Gefeliciteerd */}
          <div className="mb-4 w-full text-center">
            <h2 className="text-2xl font-bold text-[#333] mb-2">
              Gefeliciteerd
            </h2>
            <p className="text-base text-[#111] leading-relaxed">
              Je ontvangt automatisch binnen 4 weken na bekendmaking berichtgeving over uw prijs per mail en post.
            </p>
          </div>

          {/* Speel opnieuw af Button (secondary outline + rewind icoon) */}
          <button
            onClick={handleReplay}
            className="w-full bg-white text-[#003884] font-bold py-4 px-6 rounded-lg border-2 border-[#003884] hover:bg-[#F3F7FF] transition-colors text-base mb-4 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 8.33333C1.66699 8.33333 3.33781 6.05685 4.69519 4.69854C6.05257 3.34022 7.92832 2.5 10.0003 2.5C14.1425 2.5 17.5003 5.85786 17.5003 10C17.5003 14.1421 14.1425 17.5 10.0003 17.5C6.58108 17.5 3.69625 15.2119 2.79346 12.0833M1.66699 8.33333V3.33333M1.66699 8.33333H6.66699" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Speel opnieuw af</span>
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

import React, { useEffect, useState, useRef } from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnailByBalls } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import GameProgress from './game/GameProgress';
import BallsHistory from './game/BallsHistory';
import { useGoldConfetti } from '../lib/goldConfetti';

// Upsell image
import upsellImage from '../assets/vl-extra-bingo.png';

const WonScreen = ({ prize, drawnBalls, progress = 0, onBackToBingo, onReplay, showHeader = false, bingoCard = [], checkedNumbers = new Set() }) => {
  if (!prize) return null;

  const [showContent, setShowContent] = useState(false);
  const confettiCanvasRef = useRef(null);

  // Fade in content na delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 400); // Start fade na 400ms

    return () => clearTimeout(timer);
  }, []);

  // Gouden confetti effect bij won screen - stopt vanzelf wanneer alles buiten scherm is
  useGoldConfetti(confettiCanvasRef, true, false);

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
      {/* Gouden confetti canvas - fixed over hele screen */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 z-30 pointer-events-none"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />

      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable container - hele container scrollt inclusief hero */}
      <div className="flex overflow-y-auto flex-col flex-1 bg-white">
        {/* Hero sectie - auto hoogte gebaseerd op content + padding, met fixed progress bar */}
        <div className="flex overflow-hidden relative flex-col shrink-0 hero-bingo-container">
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

          {/* Confetti achtergrond - later infaden over de kaart, over het goud */}
          <img
            src={confettiImage}
            alt=""
            className="object-cover absolute inset-0 z-20 w-full h-full opacity-0 pointer-events-none"
            style={{
              animation: 'hero-confetti-fade-zoom 0.8s ease-out 0.6s forwards',
              animationFillMode: 'forwards'
            }}
          />

          <div className="flex relative z-10 flex-col">
            {/* Bingo Card Container - verticaal gecentreerd */}
            <div className="flex relative justify-center items-center pb-4 w-full hero-bingo-card-container" style={{ overflow: 'visible' }}>
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
                </div>
              )}
            </div>

            {/* GameProgress - fixed onderaan in hero */}
            <div className="w-full shrink-0">
              <GameProgress drawnBalls={drawnBalls} progress={progress} />
            </div>
          </div>
        </div>
        {/* Horizontale Balls Strip - altijd tonen als er ballen zijn getrokken */}
        {drawnBalls && drawnBalls.length > 0 && (
          <div className="px-4 py-3 bg-white">
            <BallsHistory drawnBalls={drawnBalls} getBallColor={getBallColor} checkedByUser={checkedNumbers} animate={false} />
          </div>
        )}

        {/* Content Section - fade in */}
        <ContentWrapper
          className={`flex flex-col items-center px-4 pt-4 gap-4 pb-6 bg-white transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Prize Card met geanimeerde gouden border */}
          <div className="w-full rainbow min-h-20">
            <div className="flex items-stretch h-full min-h-20">
              {/* Info - Links (padding alleen op tekst, verticaal gecentreerd) */}
              <div className="flex flex-col flex-1 justify-center px-4 py-3 min-w-0">
                <h3 className="text-lg font-bold text-gray-800">
                  Bingo!
                </h3>
                <div className="text-sm leading-snug text-gray-700">
                  U wint {prize.prize}
                </div>
              </div>

              {/* Prize Image - flush tegen rand, volledige hoogte */}
              <div
                className="flex justify-center items-center w-24 h-24 shrink-0"
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
          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800">
              Gefeliciteerd!
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              Je ontvangt automatisch binnen 4 weken na bekendmaking berichtgeving over uw prijs per mail en post.
            </p>
          </div>



          {/* Upsell Section */}
          <div
            className="overflow-hidden w-full rounded-lg"
            style={{
              border: '2px solid #E5E6E6',
              boxShadow: '0 1px 0 0 #E5E5E5'
            }}
          >
            <div className="flex items-center">

              <div className="flex-1 p-4">
                <h3 className="font-bold text-[#003884] text-lg ">
                  Meer kans maken?
                </h3>
                <p className="text-sm text-[#111]">
                  Koop een extra Bingokaart.
                </p>
              </div>
              <div className="overflow-hidden w-24 h-24 shrink-0">
                <img
                  src={upsellImage}
                  alt="Extra Bingokaarten"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Speel opnieuw af Button (secondary outline + rewind icoon) */}
          <button
            onClick={handleReplay}
            className="w-full btn-secondary mb-4 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 8.33333C1.66699 8.33333 3.33781 6.05685 4.69519 4.69854C6.05257 3.34022 7.92832 2.5 10.0003 2.5C14.1425 2.5 17.5003 5.85786 17.5003 10C17.5003 14.1421 14.1425 17.5 10.0003 17.5C6.58108 17.5 3.69625 15.2119 2.79346 12.0833M1.66699 8.33333V3.33333M1.66699 8.33333H6.66699" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Speel opnieuw af</span>
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default WonScreen;

import { useRef } from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnailByBalls } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import { useGoldConfetti } from '../lib/goldConfetti';

// Upsell image
import upsellImage from '../assets/vl-extra-bingo.png';

const WonScreen = ({ prize, drawnBalls, onBackToBingo, showHeader = false, bingoCard = [], checkedNumbers = new Set() }) => {
  if (!prize) return null;

  const confettiCanvasRef = useRef(null);

  // Gouden confetti effect bij won screen - stopt vanzelf wanneer alles buiten scherm is
  useGoldConfetti(confettiCanvasRef, true, false);

  const prizeThumbnail = getPrizeThumbnailByBalls(prize.balls);
  const winningBallIndex = drawnBalls.length;
  const handleBackToOverview = () => onBackToBingo();


  return (
    <div className="flex flex-col w-full h-dvh bg-white relative">
      {/* Gouden confetti canvas - fixed over hele screen */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 z-30 pointer-events-none w-full h-full"
      />

      {/* Header - Fixed */}
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-40">
          <GameHeader onClose={onBackToBingo} />
        </div>
      )}

      {/* Scrollable container - alleen content scrollt, hero blijft zichtbaar */}
      <div className={`flex overflow-y-auto flex-col flex-1 bg-white ${showHeader ? 'pt-[96px]' : ''}`}>
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
            <div className="flex relative justify-center items-center pb-4 w-full hero-bingo-card-container overflow-visible">
              {bingoCard.length > 0 && (
                <div className="flex relative justify-center w-full">
                  <BingoCard
                    bingoCard={bingoCard}
                    checkedNumbers={checkedNumbers}
                    currentBall={null}
                    wigglingNumber={null}
                    showHint={false}
                    onCardClick={() => { }}
                    opacity={1}
                    className="mb-0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <ContentWrapper className="flex flex-col items-center px-4 pt-4 gap-4 pb-6 bg-white">
          {/* Prize Card met geanimeerde gouden border */}
          <div
            className="w-full opacity-0 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-full rainbow min-h-20">
              <div className="flex items-stretch h-full min-h-20">
                {/* Info - Links (padding alleen op tekst, verticaal gecentreerd) */}
                <div className="flex flex-col flex-1 justify-center px-4 py-3 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800">
                    Bingo!
                  </h3>
                  <div className="text-sm leading-snug text-gray-700">
                    U wint {prize.prize}.
                  </div>
                  <div className="text-sm leading-snug text-gray-700">
                    Wat een verrassing!
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
          </div>

          {/* Gefeliciteerd */}
          <div
            className="w-full opacity-0 animate-fade-in"
            style={{ animationDelay: '350ms' }}
          >
            <h2 className="text-lg font-bold text-gray-800">
              Gefeliciteerd!
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              Binnen 4 weken ontvangt u per mail of per post meer informatie over uw prijs.
            </p>
          </div>



          {/* Upsell Section */}
          <div
            className="overflow-hidden w-full rounded-lg border-2 border-[#E5E6E6] shadow-[0_1px_0_0_#E5E5E5] opacity-0 animate-fade-in"
            style={{ animationDelay: '500ms' }}
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

          {/* Terug naar overzicht Button - sluit modal, terug naar bingo overview met gespeelde kaart */}
          <button
            onClick={handleBackToOverview}
            className="w-full btn-secondary mb-4 flex items-center justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: '650ms' }}
            aria-label="Terug naar overzicht"
          >
            Terug naar overzicht
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default WonScreen;

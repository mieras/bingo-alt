import React from 'react';
import ContentWrapper from './ContentWrapper';
import { getPrizeThumbnail } from '../utils/constants';
import confettiImage from '../assets/bingo-confetti-gold.png';
import prizeImage from '../assets/bingo-prize.png';

const WonOverlay = ({ prize, drawnBalls, onClose, onBackToOverview }) => {
  if (!prize) return null;

  const prizeThumbnail = getPrizeThumbnail(prize.prize);
  const winningBallIndex = drawnBalls.length;

  return (
    <div className="absolute top-[1vh] left-0 right-0 bottom-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-md">
      {/* Panel Container - 80% height, max-width 400px */}
      <div className="w-full max-w-[400px] h-[80%] mx-auto flex flex-col bg-white relative overflow-hidden">

        {/* Hero Image Section - Fixed */}
        <div
          className="flex relative justify-center items-center w-full shrink-0"
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
              className="object-contain absolute inset-0 w-full h-full opacity-80"
            />
            {/* Prize Image */}
            <img
              src={prizeImage}
              alt={prize.prize}
              className="relative z-10 w-full max-w-[180px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Content Section - Scrollable */}
        <div className="overflow-y-auto flex-1">
          <ContentWrapper className="flex flex-col items-center px-4 pt-6 pb-8 bg-white">
            {/* Result Info */}
            <div className="p-6 mb-6 w-full bg-white rounded-lg">
              <h2 className="text-5xl font-black text-[#003884] mb-2 text-center">
                Bingo!
              </h2>
              <p className="mb-4 text-sm text-center text-gray-600">
                {winningBallIndex}e getrokken bal
              </p>
              <p className="text-2xl font-bold text-[#AA167C] mb-6 text-center">
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

            {/* Back to Overview Button */}
            <button
              onClick={onBackToOverview}
              className="w-full bg-[#003884] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
              aria-label="Terug naar overzicht"
            >
              Terug naar overzicht
            </button>
          </ContentWrapper>
        </div>
      </div>
    </div>
  );
};

export default WonOverlay;

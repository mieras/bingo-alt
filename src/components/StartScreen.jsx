import React, { useState, useEffect } from 'react';
import GameHeader from './game/GameHeader';

// Hero image
import heroImage from '../assets/bingo-intro-hero.png';

// Ticker berichten
const TICKER_MESSAGES = [
  'Elke week 30.000 winnaars',
  '€ 25.000 gegarandeerd als hoofdprijs',
  'Duizenden andere prijzen'
];

const TICKER_INTERVAL = 3000; // 3 seconden per bericht

const StartScreen = ({ onStart, onSkipToResult, onClose }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      // Na fade out, wissel bericht en fade in
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
        setIsVisible(true);
      }, 300); // 300ms fade out duration
    }, TICKER_INTERVAL);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      {/* Header Section - alleen tonen wanneer onClose beschikbaar is (in overlay) */}
      {onClose && <GameHeader onClose={onClose} />}

      {/* Content Section */}
      <div className="flex overflow-y-auto flex-col flex-1 items-center w-full bg-white">
        {/* Hero Image Section */}
        <div className="relative w-full h-[211px] overflow-hidden">
          <img
            src={heroImage}
            alt="VriendenLoterij Bingo hero - € 25.000 cheque en bingokaart"
            className="object-cover absolute inset-0 w-full h-full"
          />
          {/* Gradient overlay voor fade naar wit */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 10%, rgba(255,255,255,0.9) 83%, white 100%)'
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 items-start px-4 pt-2 pb-4 w-full">
          {/* Title and Intro */}
          <div className="flex flex-col gap-3 items-start w-full">
            <div className="flex flex-col gap-1 items-start w-full">
              <h1 className="font-bold leading-7 text-[#333] text-2xl w-full">
                Speel Bingo
              </h1>
              <p className="leading-6 text-[#111] text-[17px] w-full">
                Uw Bingokaart voor deze week staat klaar. Speel mee en vink zelf de nummers af en zie direct of je in de prijzen bent gevallen.
              </p>
            </div>

            {/* Social Proof Ticker */}
            <div
              className="flex overflow-hidden justify-center items-center p-3 w-full rounded-lg"
              style={{ backgroundColor: '#ddf5f7', minHeight: '44px' }}
            >
              <p
                className="text-sm text-[#00275c] transition-opacity duration-300"
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                {TICKER_MESSAGES[currentMessageIndex]}
              </p>
            </div>

            {/* How it works section */}
            <div className="flex flex-col gap-2 items-start mt-2 w-full">
              <h2 className="font-bold leading-6 text-[#111] text-lg w-full">
                Hoe werkt het?
              </h2>

              {/* Instructions List */}
              <div className="flex flex-col gap-1 items-start w-full">
                {[
                  'De nummers verschijnen één voor één.',
                  'Nummer op uw Bingokaart? Vink het af.',
                  'Volle kaart? Dan heb je Bingo!',
                  'Nummer gemist? Geen probleem, wij vinken het automatisch voor je af.'
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-2 items-start w-full">
                    {/* Check icon */}
                    <div className="w-5 h-5 shrink-0 mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {/* Text */}
                    <p className="flex-1 leading-6 text-[#111] text-base">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 items-center w-full">
            {/* Start Button */}
            <button
              onClick={onStart}
              className="relative w-full bg-[#008900] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#007200] transition-colors text-base"
              style={{
                boxShadow: 'inset 0px -2px 0px 0px #005e00'
              }}
            >
              Speel nu
            </button>

            {/* Direct to result text */}
            {onSkipToResult && (
              <div className="text-center text-sm text-[#111]">
                <p className="mb-1">Wilt u meteen weten of u gewonnen heeft?</p>
                <p>
                  Bekijk dan{' '}
                  <button
                    onClick={onSkipToResult}
                    className="text-[#003884] underline hover:text-[#002a5f] transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    direct de uitslag
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

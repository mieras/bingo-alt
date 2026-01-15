import React, { useState, useEffect } from 'react';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';

// Ticker berichten
const TICKER_MESSAGES = [
  'Elke week 30.000 winnaars',
  '€ 25.000 gegarandeerd als hoofdprijs',
  'Duizenden andere prijzen'
];

const TICKER_INTERVAL = 3000; // 3 seconden per bericht

const StartScreen = ({ onStart, onSkipToResult, onClose, bingoCard = [], panelColor = '#AA167C' }) => {
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
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] w-full h-[100dvh] flex flex-col">
      {/* Header Section - alleen tonen wanneer onClose beschikbaar is (in overlay) */}
      {onClose && <GameHeader onClose={onClose} />}

      {/* Content Section */}
      <div className="flex overflow-y-auto flex-col flex-1 w-full bg-white">
        {/* Hero sectie met panelColor - consistente hoogte */}
        <div className="relative flex flex-col shrink-0 hero-bingo-container" style={{ backgroundColor: panelColor }}>
          {/* Bingo Card Container - verticaal gecentreerd */}
          <div className="relative flex flex-1 items-center justify-center w-full pb-4 min-h-0 hero-bingo-card-container">
            <BingoCard
              bingoCard={bingoCard}
              checkedNumbers={new Set()}
              currentBall={null}
              wigglingNumber={null}
              showHint={false}
              onCardClick={() => { }}
            />
          </div>
        </div>

        {/* Ticker balk - Direct onder hero, full width van rand tot rand */}
        <div className="flex overflow-hidden justify-center items-center py-3 w-full bg-[#ddf5f7] min-h-[44px]">
          <p
            className="text-sm text-[#00275c] transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            {TICKER_MESSAGES[currentMessageIndex]}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 items-start px-4 py-4 w-full">
          {/* How it works section */}
          <div className="flex flex-col gap-2 items-start w-full">
            <h2 className="font-bold leading-6 text-[#111] text-lg w-full">
              Hoe werkt het?
            </h2>

            {/* Instructions List - correcte teksten volgens Figma */}
            <div className="flex flex-col gap-1 items-start w-full">
              {[
                { text: 'De nummers verschijnen ', bold: 'één voor één', rest: '.' },
                { text: 'Nummer op uw Bingokaart? Vink em af.' },
                { text: '', bold: 'Volle kaart?', rest: ' Dan heb je Bingo!' },
                { text: 'Nummer gemist? Geen probleem, wij vinken het automatisch voor je af.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start w-full">
                  {/* Check icon */}
                  <div className="w-5 h-5 shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Text */}
                  <p className="flex-1 leading-6 text-[#111] text-base">
                    {item.bold ? (
                      <>
                        {item.text}<span className="font-bold">{item.bold}</span>{item.rest}
                      </>
                    ) : item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 items-center w-full">
            {/* Bekijk de trekking Button */}
            <button
              onClick={onStart}
              className="relative flex items-center justify-center gap-2 w-full btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83301 4.15809C5.83301 3.34879 5.83301 2.94414 6.00175 2.72108C6.14875 2.52675 6.37344 2.4065 6.61667 2.39198C6.89587 2.37531 7.23256 2.59977 7.90594 3.04869L16.6689 8.89067C17.2253 9.2616 17.5035 9.44707 17.6005 9.68084C17.6852 9.88522 17.6852 10.1149 17.6005 10.3193C17.5035 10.5531 17.2253 10.7385 16.6689 11.1095L7.90594 16.9514C7.23256 17.4004 6.89587 17.6248 6.61667 17.6082C6.37344 17.5936 6.14875 17.4734 6.00175 17.2791C5.83301 17.056 5.83301 16.6513 5.83301 15.842V4.15809Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Bekijk de trekking</span>
            </button>

            {/* Direct to result text */}
            {onSkipToResult && (
              <div className="text-center text-sm text-[#111]">
                <p>
                  <button
                    onClick={onSkipToResult}
                    className="text-[#003884] underline hover:text-[#002a5f] transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    Direct naar de uitslag
                  </button>
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

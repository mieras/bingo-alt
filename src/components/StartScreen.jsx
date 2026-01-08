import React from 'react';
import GameHeader from './game/GameHeader';

// Figma asset URLs (geldig voor 7 dagen)
const PLAY_ICON_URL = 'https://www.figma.com/api/mcp/asset/217a9461-bd04-4a3e-b757-4b094b825802';
const CHEVRON_RIGHT_URL = 'https://www.figma.com/api/mcp/asset/d362a218-9aab-4fac-b453-b804ea95063f';


const StartScreen = ({ onStart, onSkipToResult }) => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      {/* Header Section - Using GameHeader component */}
      <GameHeader />

      {/* Video Section - 16:9 aspect ratio */}
      <div className="w-full relative shrink-0 flex justify-center">
        <div className="w-full max-w-[640px] relative" style={{ aspectRatio: '16/9' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/uliLcH2r8L4"
            title="Bingo intro video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white flex flex-col items-center left-0 w-full overflow-y-auto flex-1">
        <div className="flex flex-1 flex-col gap-6 items-start pb-4 pt-6 px-4 relative w-full max-w-md mx-auto">
          {/* How it works section */}
          <div className="flex flex-1 flex-col gap-3 items-start relative w-full">
            <h2 className="font-['Laca_Text'] font-bold leading-[28px] relative text-[#111] text-2xl w-full">
              Hoe werkt het?
            </h2>
            
            {/* Instructions List */}
            <div className="flex flex-col gap-1 items-start relative w-full">
              {[
                'De ballen komen één voor één',
                'Zie je jouw nummer dan streep je die af',
                'Mis je iets dan vullen wij het voor je in',
                'Bij Bingo stopt de trekking vanzelf',
                'Meteen weten of je iets hebt? klik op \'Bekijk uitslag\' en je ziet of je gewonnen hebt.'
              ].map((text, idx) => (
                <div key={idx} className="flex gap-2 items-start relative w-full">
                  {/* Check icon */}
                  <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="flex flex-1 flex-col gap-1 items-start relative">
                    <p className="font-['Laca_Text'] font-normal leading-6 relative text-[#111] text-base w-full">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="cursor-pointer flex flex-col gap-3 items-center justify-center relative w-full">
            {/* Start Button */}
            <button
              onClick={onStart}
              className="flex flex-col items-start p-0 relative w-full"
            >
              <div className="flex flex-col items-center relative w-full">
                <div className="bg-[#008900] flex gap-2 items-center justify-center py-4 px-10 relative rounded-lg w-full shadow-[inset_0px_-2px_0px_0px_#005e00]">
                  {/* Play icon */}
                  <div className="relative w-5 h-5">
                    <img src={PLAY_ICON_URL} alt="" className="block max-w-none w-full h-full" />
                  </div>
                  {/* Button text */}
                  <p className="font-['Laca_Text'] font-bold leading-5 relative text-white text-base text-center">
                    Start trekking
                  </p>
                </div>
              </div>
            </button>

            {/* Direct to result link */}
            {onSkipToResult && (
              <button
                onClick={onSkipToResult}
                className="flex gap-1 items-center p-0 relative bg-transparent border-none cursor-pointer"
                aria-label="Direct naar de uitslag"
              >
                <p className="font-['Laca_Text'] font-semibold leading-5 relative text-[#0050a5] text-base text-left">
                  Direct naar de uitslag
                </p>
                <div className="relative w-4 h-4">
                  <img src={CHEVRON_RIGHT_URL} alt="" className="block max-w-none w-full h-full" />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

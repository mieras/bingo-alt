import React from 'react';
import GameHeader from './game/GameHeader';
import ContentWrapper from './ContentWrapper';
import SocialProofCarousel from './SocialProofCarousel';

// Figma asset URLs (geldig voor 7 dagen)
const CHEVRON_RIGHT_URL = 'https://www.figma.com/api/mcp/asset/d362a218-9aab-4fac-b453-b804ea95063f';

// Hero image
import heroImage from '../assets/hero-image.png';

// How it works image - gebruik echte afbeelding als beschikbaar
// Plaats how-it-works.jpg in src/assets/ en uncomment de import hieronder
// import howItWorksImage from '../assets/how-it-works.jpg';
const HOW_IT_WORKS_PLACEHOLDER = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop';

const StartScreen = ({ onStart, onSkipToResult }) => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      {/* Header Section - Using GameHeader component */}
      <GameHeader />



      {/* Content Section */}
      <div className="flex overflow-y-auto flex-col flex-1 items-center w-full bg-white">
        {/* Hero Image Section */}
        <div className="flex relative justify-center w-full shrink-0" style={{ backgroundColor: 'var(--ds-core-light-blue)' }}>
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <img src={heroImage}
              alt="VriendenLoterij Bingo hero - € 25.000 cheque en bingokaart"
              className="object-cover min-w-full h-full"
            />
          </div>
        </div>

        {/* Social Proof Carousel */}
        <SocialProofCarousel />
        <ContentWrapper className="flex flex-col flex-1 gap-6 items-start px-4 pt-6 pb-4">
          {/* Intro Section */}
          <div className="flex relative flex-col gap-2 items-start w-full">
            <p className="font-['Laca_Text'] font-normal leading-6 relative text-[#111] text-base w-full">
              Elke week ontvangt u per lot een unieke Bingokaart. Alle deelnemers spelen automatisch mee en maken kans op fantastische (geld)prijzen!
            </p>
          </div>

          {/* How it works section */}
          <div className="flex relative flex-col flex-1 gap-3 items-start w-full">
            <h2 className="font-['Laca_Text'] font-bold leading-[28px] relative text-[#111] text-2xl w-full">
              Hoe werkt het?
            </h2>



            {/* Instructions List */}
            <div className="flex relative flex-col gap-1 items-start w-full">
              {[
                'De ballen komen één voor één in beeld.',
                'Staat het nummer op uw Bingokaart? Dan kunt u \'m afstrepen. Mis je een nummer, dan vullen wij het in.',
                'Heeft u een volle kaart? Dan heeft u Bingo!',
                'Meteen weten of je gewonnen hebt? klik op \'Bekijk uitslag\' en je ziet of je gewonnen hebt.'
              ].map((text, idx) => (
                <div key={idx} className="flex relative gap-2 items-start w-full">
                  {/* Check icon */}
                  <div className="relative w-5 h-5 shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="flex relative flex-col flex-1 gap-1 items-start">
                    <p className="font-['Laca_Text'] font-normal leading-6 relative text-[#111] text-base w-full">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex relative flex-col gap-3 justify-center items-center w-full cursor-pointer">
            {/* Start Button */}
            <button
              onClick={onStart}
              className="flex relative flex-col items-start p-0 w-full"
            >
              <div className="flex relative flex-col items-center w-full">
                <div className="bg-[#008900] flex gap-2 items-center justify-center py-4 px-10 relative rounded-lg w-full">
                  {/* Play icon */}
                  <div className="relative w-5 h-5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.33854 2.33515C8.3485 2.34179 8.35849 2.34846 8.36852 2.35514L17.1591 8.21555C17.4135 8.38508 17.6493 8.54228 17.8304 8.68835C18.0195 8.8408 18.2423 9.05219 18.3706 9.36145C18.5401 9.7702 18.5401 10.2296 18.3706 10.6383C18.2423 10.9476 18.0195 11.159 17.8304 11.3114C17.6493 11.4575 17.4135 11.6147 17.1592 11.7842L8.33857 17.6646C8.02766 17.8719 7.7481 18.0583 7.51087 18.1869C7.27349 18.3155 6.94765 18.4625 6.56733 18.4398C6.08087 18.4108 5.63149 18.1703 5.33749 17.7816C5.10763 17.4778 5.04921 17.1251 5.02457 16.8563C4.99995 16.5876 4.99998 16.2516 5 15.8779L5 4.15792C5 4.14587 5 4.13386 5 4.12188C4.99998 3.74822 4.99995 3.41222 5.02457 3.14354C5.04921 2.87466 5.10763 2.52199 5.33749 2.21815C5.63149 1.8295 6.08087 1.589 6.56733 1.55996C6.94765 1.53725 7.27349 1.68426 7.51087 1.81291C7.74809 1.94146 8.02765 2.12786 8.33854 2.33515Z" fill="white" />
                    </svg>
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
                className="flex relative gap-1 items-center p-0 bg-transparent border-none cursor-pointer"
                aria-label="Direct naar de uitslag"
              >
                <p className="font-['Laca_Text'] font-semibold leading-5 relative text-[#0050a5] text-base text-left">
                  Direct naar de uitslag
                </p>
                <div className="relative w-4 h-4">
                  <img src={CHEVRON_RIGHT_URL} alt="" className="block w-full max-w-none h-full" />
                </div>
              </button>
            )}
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default StartScreen;

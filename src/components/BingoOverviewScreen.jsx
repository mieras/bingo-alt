import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import MiniCard from './game/MiniCard';
import { GRID_SIZE } from '../utils/constants';
import navImage from '../assets/vl-account-nav.png';
import heroImage from '../assets/hero-image.png';
import confettiImage from '../assets/bingo-confetti-gold.png';
import vlbLogo from '../assets/vlb-logo.png';

const BingoOverviewScreen = ({ onNavigateToMail, onPlayNow, onViewPrize, bingoCard = [], checkedNumbers = new Set(), hasPlayed = false, prize = null }) => {
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handlePlayNow = () => {
    setShowStartScreen(true);
  };

  const handleStartGame = () => {
    setShowStartScreen(false);
    if (onStartGame) {
      onStartGame();
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqItems = [
    'Lorem ipsum dolor sit amet?',
    'Nunc ut placerat sem?',
    'Duis nec tempor arcu?',
    'Ut maximus ligula eu turpis?',
    'Donec id fermentum dui, quis semper diam?'
  ];

  // Toon StartScreen (uitleg scherm) wanneer showStartScreen true is
  if (showStartScreen) {
    return (
      <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
        <StartScreen onStart={handleStartGame} onSkipToResult={onSkipToResult} />
      </div>
    );
  }

  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <div className="flex overflow-y-auto flex-col flex-1">
        {/* Navigatie Header - Statische afbeelding */}
        <div className="w-full shrink-0">
          <img
            src={navImage}
            alt="Navigatie"
            className="object-cover w-full h-auto"
          />
        </div>

        <ContentWrapper className="flex flex-col px-4 pt-6 pb-8">
          {/* Titel Sectie */}
          <h1 className="text-4xl font-bold text-[#003884] mb-4">
            Bingokaart
          </h1>

          {/* Datum Selector */}
          <div className="flex gap-3 items-center p-4 mb-6 bg-white rounded-lg border border-gray-200">
            <div className="w-5 h-5 shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" fill="#003884" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#003884" />
              </svg>
            </div>
            <span className="flex-1 text-[#111] font-medium">Zondag 10 mei</span>
            <div className="w-4 h-4 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Wekelijkse Uitslagen Promotie Card */}
          <div className="relative bg-[#003884] rounded-lg overflow-hidden mb-6">
            {/* Lichtere blauwe golf onderaan */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#0069b4] to-[#0069b4] opacity-30"></div>

            {/* Hero Image */}
            <div className="relative px-4 pt-6 pb-4">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="€ 25.000,- prijs"
                  className="object-contain w-full h-auto"
                />
                {/* Confetti overlay */}
                <div className="absolute inset-0 opacity-60">
                  <img
                    src={confettiImage}
                    alt="Confetti"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative px-4 pb-6">
              <h2 className="mb-4 text-xl font-bold text-white">
                Wekelijkse uitslagen
              </h2>

              <div className="mb-4 space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-5 h-5 shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-white">Elke zondag staat de Bingo klaar</p>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-5 h-5 shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-white">De eerste Bingo is maar liefst € 25.000,- waard!</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white">
                Elke week ontvangt u per lot een unieke Bingokaart. Alle deelnemers spelen automatisch mee en maken kans op fantastische (geld)prijzen!
              </p>
            </div>
          </div>

          {/* Huidige Bingokaart Weergave */}
          <div className="p-4 mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex flex-col gap-4 items-center md:flex-row">
              {/* MiniCard - altijd tonen */}
              <div className="flex relative flex-1 justify-center">
                {bingoCard.length > 0 ? (
                  <div className="relative" style={{ transform: 'scale(1.25)' }}>
                    <MiniCard
                      bingoCard={bingoCard}
                      checkedNumbers={hasPlayed ? checkedNumbers : new Set()}
                      animateChecks={false}
                      useAbsolute={false}
                    />
                  </div>
                ) : (
                  // Placeholder als kaart nog niet is gegenereerd
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-[200px]">
                    <div className="mb-2 text-center">
                      <div className="text-xs font-bold text-[#003884] mb-1">VRIENDENLOTERIJ</div>
                      <div className="text-xs text-[#003884] mb-2">EREDIVISIE BINGO</div>
                      <div className="grid grid-cols-4 gap-2 text-sm font-bold text-[#003884]">
                        <div>07</div>
                        <div>17</div>
                        <div>30</div>
                        <div>38</div>
                        <div>01</div>
                        <div>21</div>
                        <div>29</div>
                        <div>36</div>
                        <div>03</div>
                        <div>12</div>
                        <div className="flex justify-center items-center">
                          <img src={vlbLogo} alt="VL" className="w-4 h-4" />
                        </div>
                        <div>42</div>
                        <div>11</div>
                        <div>14</div>
                        <div>25</div>
                        <div>44</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Details en Knop */}
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-bold text-[#003884] text-sm mb-1">45854-AB</p>
                  <p className="text-[#003884] text-xs">10 mei 2023</p>
                </div>
                <button
                  onClick={hasPlayed ? onViewPrize : onPlayNow}
                  className="bg-[#003884] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
                >
                  {hasPlayed ? 'Bekijk prijs' : 'Speel nu'}
                </button>
              </div>
            </div>
          </div>

          {/* Meer over Bingo Link */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-[#003884] font-semibold hover:text-[#002a5f] transition-colors">
              <span>Meer over Bingo</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* App Promotie Sectie */}
          <div className="relative bg-gradient-to-r from-[#ffcd14] to-[#ffd740] rounded-lg p-6 mb-6 overflow-hidden">
            <h3 className="text-xl font-bold text-[#003884] mb-4">
              Heeft u de VriendenLoterij app al?
            </h3>

            {/* Promotie Afbeelding Placeholder */}
            <div className="flex relative justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-48 bg-gray-800 rounded-[20px] shadow-2xl transform rotate-[-15deg]">
                  <div className="absolute inset-2 bg-white rounded-[12px] flex items-center justify-center">
                    <div className="text-xs text-gray-400">App</div>
                  </div>
                </div>
                <div className="absolute -right-8 top-1/2 transform rotate-12 -translate-y-1/2">
                  <div className="w-16 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded shadow-lg">
                    <div className="text-white text-[8px] font-bold text-center pt-1">VIP</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[#003884] text-sm mb-4 leading-relaxed">
              Met de VriendenLoterij App heeft u uw VIP-KAART altijd bij de hand. Zo hoeft u nooit meer een voordeel te missen!
            </p>

            <div className="mb-4 space-y-2">
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[#003884] text-sm">Gratis naar ruim 150 musea</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[#003884] text-sm">Tot 50% korting op dagjes uit</p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#009640" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[#003884] text-sm">Kans op exclusieve evenementen</p>
              </div>
            </div>

            {/* App Store Knoppen */}
            <div className="flex flex-col gap-3">
              <button className="bg-[#003884] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#002a5f] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H9v6l5.25 3.15.75-1.23-4.5-2.67V5z" />
                </svg>
                <span>ONTDEK HET OP Google Play</span>
              </button>
              <button className="bg-[#003884] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#002a5f] transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H9v6l5.25 3.15.75-1.23-4.5-2.67V5z" />
                </svg>
                <span>Download in de App Store</span>
              </button>
            </div>
          </div>

          {/* FAQ Sectie */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#003884] mb-4">
              Frequently asked questions
            </h3>

            <div className="space-y-2">
              {faqItems.map((question, index) => (
                <div key={index} className="overflow-hidden bg-white rounded-lg border border-gray-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center p-4 w-full text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="text-[#003884] font-medium">{question}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transform transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    >
                      <path d="M4 6L8 10L12 6" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      <p>Dit is een placeholder antwoord voor de vraag: {question}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-[#003884] font-semibold mt-4 hover:text-[#002a5f] transition-colors">
              <span>View all questions and answers</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default BingoOverviewScreen;

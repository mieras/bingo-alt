import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import MiniCard from './game/MiniCard';
import WeeklyResultsCard from './WeeklyResultsCard';
import navImage from '../assets/vl-account-nav.png';
import vlbLogo from '../assets/vlb-logo.png';

const BingoOverviewScreen = ({ onPlayNow, onViewPrize, onNavigateToAccount, bingoCard = [], checkedNumbers = new Set(), hasPlayed = false, panelColor = '#AA167C' }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <div className="flex overflow-y-auto flex-col flex-1">
        {/* Navigatie Header - Klikbaar naar Account/Login */}
        <div className="w-full shrink-0">
          <button
            onClick={onNavigateToAccount}
            className="w-full transition-opacity cursor-pointer hover:opacity-90"
            aria-label="Ga naar mijn account"
          >
            <img
              src={navImage}
              alt="Navigatie"
              className="object-cover w-full h-auto pointer-events-none"
            />
          </button>
        </div>

        <ContentWrapper className="flex flex-col px-4 pt-6 pb-8">
          {/* Titel Sectie */}
          <h1 className="text-4xl font-bold text-[#003884] mb-4">
            Bingokaart
          </h1>

          {/* Datum Selector */}
          <div className="flex gap-3 items-center p-4 mb-6 bg-white rounded-lg border border-gray-200">

            <span className="flex-1 text-[#111] font-medium">Zondag 10 mei</span>
            <div className="w-4 h-4 shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Wekelijkse Uitslagen Promotie Card */}
          <WeeklyResultsCard />

          {/* Huidige Bingokaart Weergave */}
          <div
            className="overflow-hidden mb-4 bg-white"
            style={{
              borderRadius: '8px',
              border: '2px solid #E5E6E6',
              background: '#FFF',
              boxShadow: '0 1px 0 0 #E5E6E6'
            }}
          >
            {/* Media Container met achtergrond */}
            <div className="flex justify-center items-center py-8" style={{ backgroundColor: '#E4F5F6' }}>
              {bingoCard.length > 0 ? (
                <div className="relative" style={{ transform: 'scale(1.25) rotate(0deg)' }}>
                  <MiniCard
                    bingoCard={bingoCard}
                    checkedNumbers={hasPlayed ? checkedNumbers : new Set()}
                    animateChecks={false}
                    useAbsolute={false}
                    cardColor={panelColor}
                    noRotation={true}
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

            {/* Content sectie - Meta en Buttons */}
            <div className="p-4 bg-white">
              {/* Meta informatie - Kaartnummer links, Datum rechts */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold text-[#29313D] text-base leading-5">45854-AB</p>
                <p className="text-[#8F97A3] text-base font-medium leading-5">10 mei 2023</p>
              </div>

              {/* Buttons */}
              {hasPlayed ? (
                <button
                  onClick={onViewPrize}
                  className="w-full bg-[#009640] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#087239] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#009640]"
                >
                  Bekijk je prijs
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={onPlayNow}
                    className="w-full bg-[#009640] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#087239] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#009640]"
                  >
                    Open je Bingokaart
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 text-[#003884] font-semibold hover:text-[#002a5f] transition-colors bg-transparent border-none cursor-pointer p-0"
                    title="Download Bingokaart"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 6.66667L8 10M8 10L4.66667 6.66667M8 10V2" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Download Bingokaart</span>
                  </button>
                </div>
              )}
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

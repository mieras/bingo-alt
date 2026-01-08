import React from 'react';
import GameHeader from './game/GameHeader';
import ContentWrapper from './ContentWrapper';

const BingoOverviewScreen = () => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <GameHeader />
      
      <ContentWrapper className="flex flex-col flex-1 p-6 overflow-y-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#003884] mb-6">
            Bingo Overzicht
          </h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Actieve Bingo Spellen
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                Overzicht van alle beschikbare Bingo spellen.
              </p>
              <div className="text-xs text-gray-500">
                Geen actieve spellen beschikbaar
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Afgelopen Spellen
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                Bekijk de resultaten van eerdere Bingo spellen.
              </p>
              <div className="text-xs text-gray-500">
                Geen afgelopen spellen beschikbaar
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Statistieken
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                Uw Bingo statistieken en prestaties.
              </p>
              <div className="text-xs text-gray-500">
                Statistieken worden binnenkort beschikbaar
              </div>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-gray-500 text-center">
            Dit is een placeholder scherm. Functionaliteit volgt later.
          </p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default BingoOverviewScreen;

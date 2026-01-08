import React from 'react';
import GameHeader from './game/GameHeader';
import ContentWrapper from './ContentWrapper';

const AccountHomeScreen = () => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <GameHeader />
      
      <ContentWrapper className="flex flex-col flex-1 p-6 overflow-y-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#003884] mb-6">
            Mijn Account
          </h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Welkom terug!
              </h2>
              <p className="text-gray-600 text-sm">
                Dit is een placeholder voor de account homepage.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Mijn Loterijen
              </h2>
              <p className="text-gray-600 text-sm">
                Overzicht van uw actieve loterijen en deelnames.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Mijn Prijzen
              </h2>
              <p className="text-gray-600 text-sm">
                Bekijk uw gewonnen prijzen en de status daarvan.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-bold text-lg text-[#003884] mb-2">
                Instellingen
              </h2>
              <p className="text-gray-600 text-sm">
                Beheer uw accountinstellingen en voorkeuren.
              </p>
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

export default AccountHomeScreen;

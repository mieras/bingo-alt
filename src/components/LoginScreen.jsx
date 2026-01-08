import React from 'react';
import GameHeader from './game/GameHeader';
import ContentWrapper from './ContentWrapper';

const LoginScreen = () => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <GameHeader />
      
      <ContentWrapper className="flex flex-col items-center justify-center flex-1 p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-[#003884] mb-6 text-center">
            Inloggen
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mailadres
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003884]"
                placeholder="voorbeeld@email.com"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003884]"
                placeholder="••••••••"
                disabled
              />
            </div>
            
            <button
              className="w-full bg-[#003884] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
              disabled
            >
              Inloggen
            </button>
          </div>
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            Dit is een placeholder scherm. Functionaliteit volgt later.
          </p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default LoginScreen;

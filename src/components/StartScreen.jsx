import React from 'react';
import logoImg from '../assets/vlb-logo.png';

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center p-6 w-full min-h-full bg-white text-center overflow-y-auto">
      <div className="w-full max-w-md flex flex-col items-center pt-8 pb-12">

        {/* Logo */}
        <img
          src={logoImg}
          alt="VriendenLoterij Bingo"
          className="w-48 mb-8 object-contain drop-shadow-sm"
        />

        {/* Intro Text */}
        <div className="space-y-6 text-gray-700 mb-10">
          <p className="text-lg leading-relaxed">
            Voor elke wekelijkse Bingo, worden onder toeziend oog van de notaris 36 ballen getrokken.
          </p>

          <p className="text-lg leading-relaxed">
            Staat het nummer van de getrokken bal op uw persoonlijke Bingokaart? Dan kunt u 'm afstrepen! Heeft u een volle kaart? Dan heeft u Bingo!
          </p>
        </div>

        {/* Prizes Section */}
        <div className="w-full bg-gray-50 rounded-xl p-6 mb-10 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-[#003884] uppercase tracking-wide mb-3">
            Prijzen
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            In de wekelijkse Bingo maakt u kans op € 25.000,- en tienduizenden andere fantastische prijzen.
          </p>
          <p className="text-sm font-medium text-[#AA167C]">
            Het aantal getrokken ballen dat u nodig had voor een volle Bingokaart, bepaalt uw prijs.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98] uppercase tracking-wide text-lg"
        >
          Speel nu
        </button>

      </div>
    </div>
  );
};

export default StartScreen;

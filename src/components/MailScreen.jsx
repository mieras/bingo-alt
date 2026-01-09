import React from 'react';
import ContentWrapper from './ContentWrapper';
import mailHeaderImage from '../assets/vl-bingo-mail-header.png';
import appBannerImage from '../assets/vl-bingo-app-banner.png';

const MailScreen = ({ onNavigateToAccount, onNavigateToBingo }) => {
  return (
    <div className="flex overflow-y-auto flex-col w-full h-full bg-white">
      {/* Hero Image Section */}
      <div className="relative w-full shrink-0">
        <img
          src={mailHeaderImage}
          alt="VriendenLoterij Bingo prijzen"
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Middelste sectie - Resultaten en Call-to-action */}
      <ContentWrapper className="flex flex-col px-4 pt-6 pb-4 bg-white">
        <h2 className="text-2xl font-bold text-[#003884] mb-4 text-center">
          Uitslagen VriendenLoterij Eredivisie Bingo
        </h2>

        <p className="text-base text-[#111] mb-6 leading-relaxed">
          De VriendenLoterij Eredivisie Bingo uitslagen van maandag 29 december zijn bekend! Speel{' '}
          <button
            onClick={onNavigateToAccount}
            className="text-[#003884] underline font-semibold cursor-pointer hover:text-[#002a5f]"
          >
            Bingo
          </button>{' '}
          in je{' '}
          <button
            onClick={onNavigateToAccount}
            className="text-[#003884] underline font-semibold cursor-pointer hover:text-[#002a5f]"
          >
            mijn account
          </button>{' '}
          of in de VriendenLoterij app om te kijken of je gewonnen hebt.
        </p>

        <button
          onClick={onNavigateToBingo}
          className="w-full bg-[#009b00] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#007900] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#009b00] mb-6"
        >
          Ga naar de Bingo
        </button>
      </ContentWrapper>

      {/* Onderste sectie - App Promotie Banner */}
      <div className="mt-auto w-full">
        <img
          src={appBannerImage}
          alt="VriendenLoterij app promotie"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MailScreen;

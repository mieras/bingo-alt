import React from 'react';
import ContentWrapper from './ContentWrapper';
import accountOverviewImage from '../assets/vl-ma-overview.png';

const AccountHomeScreen = ({ onNavigateToMail, onNavigateToBingo }) => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <div className="flex overflow-y-auto flex-col flex-1">
        {/* Mock Image - Klikbaar naar Bingo Overview */}
        <button
          onClick={onNavigateToBingo}
          className="w-full transition-opacity cursor-pointer shrink-0 hover:opacity-90"
          aria-label="Ga naar Bingo overzicht"
        >
          <img
            src={accountOverviewImage}
            alt="Mijn Account Overzicht"
            className="object-cover w-full h-auto pointer-events-none"
          />
        </button>

        <ContentWrapper className="flex flex-col p-6">
          {/* Speel Nu en Bingo Links */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={onNavigateToBingo}
              className="w-full btn-primary"
            >
              Speel Nu
            </button>

            <button
              onClick={onNavigateToBingo}
              className="w-full btn-primary"
            >
              Bingo
            </button>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default AccountHomeScreen;

import React from 'react';
import explanationHeroImage from '../assets/vl-bingo-overview-eplanation-hero.png';

const WeeklyResultsCard = () => {
  return (
    <div className="relative bg-[#003884] rounded-lg overflow-hidden mb-6">
      {/* Hero Image - zonder padding */}
      <div className="relative">
        <img
          src={explanationHeroImage}
          alt="Speel elke week Bingo"
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative p-4">
        <h2 className="mb-2 text-xl font-bold text-white">
          Speel elke week Bingo!
        </h2>

        <ul className="mb-4 space-y-1 list-none">
          <li className="flex gap-2 items-start">
            <div className="w-5 h-5 shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm text-white">Elke zondag staat de Bingo klaar</span>
          </li>
          <li className="flex gap-2 items-start">
            <div className="w-5 h-5 shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm text-white">De hoofdprijs is € 25.000,-</span>
          </li>
        </ul>

        <p className="text-sm leading-relaxed text-white">
          Elke week maak je kans op geweldige prijzen. Speel nu en zie direct je prijs, of download je Bingokaart en controleer de uitslag handmatig.
        </p>
      </div>
    </div>
  );
};

export default WeeklyResultsCard;

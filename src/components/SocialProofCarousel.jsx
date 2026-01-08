import React, { useState, useEffect } from 'react';

// Hardcoded social proof statements (later uitbreidbaar)
const SOCIAL_PROOF_STATEMENTS = [
  'Er wint elke week iemand gegarandeerd € 25.000',
  'Duizenden deelnemers maken elke week kans op fantastische prijzen',
  'Elke week nieuwe kansen om te winnen',
  'Al meer dan 100.000 tevreden deelnemers',
];

const SocialProofCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % SOCIAL_PROOF_STATEMENTS.length
      );
    }, 4000); // Change statement every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#003884] py-4 px-4">
      <div className="mx-auto">
        <div className="overflow-hidden relative h-12">
          {SOCIAL_PROOF_STATEMENTS.map((statement, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <p className="font-['Laca_Text'] font-semibold text-white text-sm md:text-base text-center leading-tight">
                {statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofCarousel;

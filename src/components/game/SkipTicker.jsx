import React, { useState, useEffect, useMemo } from 'react';

const SkipTicker = ({ drawnBallsCount }) => {
  // Basis teksten die altijd getoond worden
  const baseMessages = [
    "We checken je bingo-kaart…",
    "Er wint elke week iemand 25,000 euro met deze Bingo",
    "Sanne uit Utrecht heeft net €25 gewonnen"
  ];

  // Tekst die alleen vanaf bal 18 getoond wordt
  const lateMessage = "Sommige deelnemers hebben al bingo.";

  // Combineer berichten op basis van aantal getrokken ballen
  const messages = useMemo(() => {
    if (drawnBallsCount >= 18) {
      return [...baseMessages, lateMessage];
    }
    return baseMessages;
  }, [drawnBallsCount]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Reset index als messages veranderen
  useEffect(() => {
    setCurrentIndex(0);
    setIsFading(false);
  }, [messages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsFading(true);
      
      // Na fade out, wissel naar volgende bericht en fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsFading(false);
      }, 400); // Wacht tot fade-out klaar is (iets langer dan animatie)
    }, 4000); // Elke 4 seconden wisselen

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative h-14 overflow-hidden flex items-center justify-center" role="status" aria-live="polite" aria-atomic="true">
      <div 
        className={`w-full text-center transition-opacity duration-500 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-sm font-medium text-[#003884] leading-relaxed">
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default SkipTicker;


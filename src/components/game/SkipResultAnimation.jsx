import React, { useEffect, useMemo, useState } from 'react';
import PrizeCarouselSimple from './PrizeCarouselSimple';

const BASE_MESSAGES = [
  'We controleren je kaart...',
  'Elke week 30.000 winnaars'
];

const BINGO_MESSAGE = '1e bingo is gevallen';

const SkipResultAnimation = ({ bingoCard, checkedNumbers, isSkipEnding = false }) => {
  const numbersToWin = useMemo(() => bingoCard.filter((n) => n !== null), [bingoCard]);
  const hasBingo = useMemo(() => numbersToWin.length > 0 && numbersToWin.every((n) => checkedNumbers.has(n)), [numbersToWin, checkedNumbers]);

  const [messageIndex, setMessageIndex] = useState(0);
  const [overrideMessage, setOverrideMessage] = useState(null);

  // Rotate helper text (and briefly show bingo message once it happens)
  useEffect(() => {
    if (isSkipEnding) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % BASE_MESSAGES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isSkipEnding]);

  useEffect(() => {
    if (!hasBingo || isSkipEnding) return;

    setOverrideMessage(BINGO_MESSAGE);
    const t = setTimeout(() => setOverrideMessage(null), 2600);
    return () => clearTimeout(t);
  }, [hasBingo, isSkipEnding]);

  const message = overrideMessage || BASE_MESSAGES[messageIndex];

  return (
    <div className="flex flex-col justify-center items-center py-4 w-full h-full min-h-0">
      {/* Prize carousel - verticaal gecentreerd, past in beschikbare ruimte */}
      <div className="flex flex-1 justify-center items-center w-full min-h-0 max-h-full" style={{ minHeight: 0 }}>
        <div className="flex overflow-hidden justify-center items-center w-full h-full">
          <PrizeCarouselSimple autoPlay={!isSkipEnding} interval={3000} />
        </div>
      </div>

      {/* Helper text - shrink-0 zodat het altijd zichtbaar blijft */}
      <div className="px-6 pt-2 pb-2 text-center shrink-0">
        <p className="text-xs leading-4 font-medium text-[#6B7280] transition-opacity">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SkipResultAnimation;


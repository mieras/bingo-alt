import React, { useEffect, useMemo, useState } from 'react';
import { getPrizeThumbnailByBalls } from '../../utils/constants';

const BASE_MESSAGES = [
  'We controleren je kaart...',
  'Elke week 30.000 winnaars'
];

const BINGO_MESSAGE = '1e bingo is gevallen';

// Unique prize steps (we avoid duplicates like 20/21, 22/23, 33/34)
const CAROUSEL_BALLS = [19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 33, 35, 36];

const SkipResultAnimation = ({ bingoCard, checkedNumbers, isSkipEnding = false }) => {
  const numbersToWin = useMemo(() => bingoCard.filter((n) => n !== null), [bingoCard]);
  const hasBingo = useMemo(() => numbersToWin.length > 0 && numbersToWin.every((n) => checkedNumbers.has(n)), [numbersToWin, checkedNumbers]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [overrideMessage, setOverrideMessage] = useState(null);

  // Rotate prizes while skipping (freeze during skip ending)
  useEffect(() => {
    if (isSkipEnding) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_BALLS.length);
    }, 900);

    return () => clearInterval(interval);
  }, [isSkipEnding]);

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

  const prevIdx = (carouselIndex - 1 + CAROUSEL_BALLS.length) % CAROUSEL_BALLS.length;
  const nextIdx = (carouselIndex + 1) % CAROUSEL_BALLS.length;

  const message = overrideMessage || BASE_MESSAGES[messageIndex];

  return (
    <div className="flex flex-col items-center justify-end w-full pb-10">
      {/* Prize carousel */}
      <div className="w-full max-w-[380px] px-4">
        <div className="flex items-center justify-center gap-6">
          {/* Left (blurred) */}
          <div className="w-[92px] h-[60px] opacity-40 blur-[2px] scale-95">
            <img
              src={getPrizeThumbnailByBalls(CAROUSEL_BALLS[prevIdx])}
              alt=""
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>

          {/* Center */}
          <div className="w-[150px] h-[88px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)]">
            <img
              src={getPrizeThumbnailByBalls(CAROUSEL_BALLS[carouselIndex])}
              alt=""
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>

          {/* Right (blurred) */}
          <div className="w-[92px] h-[60px] opacity-40 blur-[2px] scale-95">
            <img
              src={getPrizeThumbnailByBalls(CAROUSEL_BALLS[nextIdx])}
              alt=""
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Helper text */}
      <div className="mt-6 px-6 text-center">
        <p className="text-[22px] leading-7 font-medium text-[#6B7280] transition-opacity">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SkipResultAnimation;


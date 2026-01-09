import React from 'react';
import BouncingBall from './game/BouncingBall';

const LoadingTransition = () => {
  return (
    <div className="flex absolute inset-0 z-50 flex-col justify-center items-center backdrop-blur-sm bg-white/95 animate-fade-in">
      <div className="flex flex-col gap-4 items-center">
        <BouncingBall ballNumber={1} ballColor="#003884" />
        <p className="text-lg font-semibold text-[#003884] animate-pulse">
          Resultaat ophalen...
        </p>
      </div>
    </div>
  );
};

export default LoadingTransition;

import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white relative z-10">
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl max-w-lg w-full transform hover:scale-105 transition-transform duration-500">
        <h1 className="text-6xl font-black mb-2 text-[#003087] uppercase tracking-tighter">
          VRIENDENLOTERIJ
        </h1>
        <h2 className="text-4xl font-black mb-8 text-[#00a1e0] lowercase tracking-tighter">
          bingo
        </h2>

        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left border border-blue-100">
          <h3 className="text-lg font-bold mb-3 text-[#003087]">How to Play</h3>
          <ul className="space-y-2 text-[#003087]/80 text-sm font-medium">
            <li className="flex items-center"><span className="mr-2 text-xl">🎫</span> You get a unique Bingo Card.</li>
            <li className="flex items-center"><span className="mr-2 text-xl">🎱</span> A new ball appears every 4 seconds.</li>
            <li className="flex items-center"><span className="mr-2 text-xl">👆</span> Click the number to mark it.</li>
            <li className="flex items-center"><span className="mr-2 text-xl">🏆</span> Fill your card to WIN!</li>
          </ul>
        </div>

        <button onClick={onStart} className="btn-primary text-2xl px-12 py-4 w-full shadow-lg hover:shadow-xl">
          START GAME
        </button>
      </div>
    </div>
  );
};

export default StartScreen;

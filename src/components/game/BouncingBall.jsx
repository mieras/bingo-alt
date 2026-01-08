import React from 'react';

const BouncingBall = ({ ballNumber, ballColor }) => {
  // Gebruik standaard waarden als props niet zijn meegegeven
  const number = ballNumber || 1;
  const color = ballColor || '#AA167C';

  return (
    <div className="flex flex-col items-center justify-center" role="img" aria-label={`Bal nummer ${number} wordt getrokken`}>
      <div className="relative flex items-center justify-center" style={{ height: '7em' }}>
        {/* Bouncing Ball */}
        <div
          className="relative z-10 rounded-full flex items-center justify-center shadow-lg"
          style={{
            width: '3.5em',
            height: '3.5em',
            backgroundColor: color,
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(0,0,0,0.2)',
            animation: 'bounce-ball 0.8s cubic-bezier(0, 0, 0.2, 1) alternate infinite',
          }}
        >
          {/* White Badge Container */}
          <div className="w-7 h-7 bg-white rounded-[10px] flex flex-col items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] relative z-10">
            <span className="text-lg font-bold text-gray-800 leading-none pt-0.5 text-box-trim">{number}</span>
            <div className="w-2.5 h-[1.5px] bg-gray-800 mt-[1px] rounded-full opacity-80"></div>
          </div>
        </div>
        
        {/* Shadow */}
        <div
          className="absolute bottom-0"
          style={{
            background: 'radial-gradient(50% 50%, rgba(0,0,0,0.3) 0%, transparent 100%)',
            width: '5.25em',
            height: '1.75em',
            animation: 'grow-shadow 0.8s cubic-bezier(0, 0, 0.2, 1) forwards infinite alternate',
          }}
        />
      </div>
      
      <style>{`
        @keyframes bounce-ball {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-7em);
          }
        }
        
        @keyframes grow-shadow {
          from {
            transform: scale(1);
            opacity: 0.5;
          }
          to {
            transform: scale(0.4);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default BouncingBall;


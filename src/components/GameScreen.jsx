import React, { useState, useEffect, useRef } from 'react';
import { GRID_SIZE, DRAW_INTERVAL } from '../utils/constants';
import logoImg from '../assets/vlb-logo.png';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    wigglingNumber,
    onCardClick,
    onSkip,
    progress,
    panelColor
}) => {
    // Random kleur voor ballen (zelfde kleuren als background) - consistent per bal
    const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
    const getBallColor = (ballNumber) => {
        return panelColors[ballNumber % panelColors.length];
    };

    // State voor hint timing (laatste 2 seconden voor nieuwe bal)
    const [showHint, setShowHint] = useState(false);
    const historyRef = useRef(null);

    // Timer voor hint: toon hint 2 seconden voordat nieuwe bal komt
    useEffect(() => {
        if (!currentBall) return;

        setShowHint(false);
        const hintTimer = setTimeout(() => {
            setShowHint(true);
        }, DRAW_INTERVAL - 2000);

        return () => clearTimeout(hintTimer);
    }, [currentBall]);

    // Auto-scroll naar top bij nieuwe bal in history
    useEffect(() => {
        if (historyRef.current && history.length > 0) {
            historyRef.current.scrollTop = 0;
        }
    }, [history.length]);

    // Datum formatteren voor display
    const today = new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: '2-digit' });

    return (
        <div className="flex flex-col w-full h-screen overflow-hidden transition-colors duration-500 relative" style={{ backgroundColor: panelColor }}>
            {/* Close Button - Fixed Position: Top 160px, Right 16px */}
            <button className="fixed top-[16px] right-4 z-50 w-10 h-10 bg-[#003884] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-800 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>


            <div className="flex-shrink-0  flex flex-col">
                {/* Bingo Card Container - Flexibel en gecentreerd */}
                <div className="flex-1 flex flex-col justify-center items-center ">

                    {/* Header Info: Code - Logo - Datum (Over de hele breedte) */}
                    {/* Tekst kleur aangepast naar wit/transparant omdat het nu op de achtergrond staat */}
                    <div className="w-full max-w-full flex h-[96px] z-5 justify-between items-center pt-14 px-4 bg-white">
                        <span className="text-black/70 text-sm font-medium tracking-wide">45854-AB</span>
                        <div className="flex-1 flex justify-center px-2">
                            <img src={logoImg} alt="VriendenLoterij Bingo" className="w-full max-w-[160px] object-contain drop-shadow-md" />
                        </div>
                        <span className="text-black/70 text-sm font-medium tracking-wide">{today}</span>
                    </div>

                    {/* Card - Alleen Grid */}
                    <div className="w-[95%] max-w-[360px] mb-4 bg-white rounded-b-[32px] shadow-xl overflow-hidden flex-shrink-0 flex flex-col">

                        {/* Grid - 4x4 met lijntjes alleen binnen */}
                        <div
                            className="grid bg-gray-100"
                            style={{
                                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                                gap: '1px',
                                padding: '0 0 1px 0' // Top padding toegevoegd voor lijn boven grid
                            }}
                        >
                            {bingoCard.map((num, idx) => {
                                const isChecked = num && checkedNumbers.has(num);
                                const isCurrentMatch = num === currentBall && !isChecked;
                                const isWiggling = wigglingNumber === num;
                                const isEmpty = idx === 10;
                                const showMatchHint = showHint && isCurrentMatch;

                                return (
                                    <div
                                        key={idx}
                                        className="relative bg-white"
                                        style={{ aspectRatio: '5/4' }}
                                    >
                                        {isEmpty ? (
                                            <div className="flex items-center justify-center w-full h-full p-2">
                                                {/* Eredivisie Logo SVG */}
                                                <svg width="80%" height="80%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_15_1098)">
                                                        <path d="M18.0487 31.9676C10.3202 31.9676 4.03295 25.6811 4.03295 17.9541C4.03295 14.6074 5.21378 11.5321 7.17896 9.11956L4.31891 6.26C1.62906 9.4123 0 13.4953 0 17.9541C0 27.9046 8.0967 36 18.0487 36C22.5083 36 26.5921 34.3709 29.7449 31.6815L26.8847 28.8218C24.4717 30.7868 21.3961 31.9676 18.0487 31.9676Z" fill="#014087" />
                                                        <path d="M18.0487 7.9729C12.5442 7.9729 8.06574 12.4504 8.06574 17.9541C8.06574 23.4577 12.5442 27.9352 18.0487 27.9352C20.2835 27.9352 22.349 27.1972 24.0145 25.9521L21.1099 23.0481C20.2148 23.587 19.1698 23.9029 18.0486 23.9029C14.7627 23.9029 12.0987 21.2394 12.0987 17.9541C12.0987 14.6686 14.7627 12.0051 18.0486 12.0051C20.7046 12.0051 22.9524 13.746 23.7174 16.148H14.2087L17.7132 19.652H27.8839C27.979 19.0997 28.0314 18.5331 28.0314 17.9541C28.0314 12.4504 23.5534 7.9729 18.0487 7.9729Z" fill="#014087" />
                                                        <path d="M11.9869 2.44316C12.1805 2.89734 11.7249 3.14944 11.5199 3.23691L11.3119 3.32549L10.9153 2.39522L11.1692 2.28695C11.5915 2.10725 11.8664 2.15995 11.9869 2.44316ZM12.9721 2.01136C12.7881 1.57972 12.2632 0.947262 10.8185 1.56258L9.64653 2.06184L11.1227 5.52528L12.0763 5.11904L11.6162 4.03971L11.7716 3.97351L12.9699 4.73836L14.1194 4.24862L12.6608 3.41153C13.0718 3.00053 13.1827 2.50587 12.9721 2.01136Z" fill="#014087" />
                                                        <path d="M9.99088 6.22167L9.29623 2.19514L8.40803 2.82411L8.81101 4.93929L6.93568 3.86741L6.05241 4.49304L9.61506 6.48487L9.99088 6.22167Z" fill="#014087" />
                                                        <path d="M13.4523 0.607425L14.2951 4.23946L15.305 4.00562L14.4622 0.373587L13.4523 0.607425Z" fill="#014087" />
                                                        <path d="M16.6439 3.01323L16.603 2.51602L17.6622 2.42839L17.5965 1.63084L16.5372 1.71862L16.4739 0.949164L17.9083 0.830261L17.8397 0L15.394 0.202723L15.7013 3.93286L18.1471 3.72998L18.078 2.89432L16.6439 3.01323Z" fill="#014087" />
                                                        <path d="M21.4863 0.376681L21.2007 2.2412L19.4833 0.0696591L19.0362 0.00107939L18.4667 3.72233L19.4462 3.87251L19.7351 1.98243L21.4377 4.17794L21.8851 4.24652L22.455 0.525271L21.4863 0.376681Z" fill="#014087" />
                                                        <path d="M24.6962 2.24434C25.33 2.52247 25.5415 3.02888 25.2764 3.63387C24.9938 4.2776 24.5338 4.44921 23.8687 4.15759L23.4487 3.97344L24.2864 2.06463L24.6962 2.24434ZM26.2452 4.00456C26.484 3.46052 26.4953 2.96268 26.2781 2.52501C26.0677 2.10035 25.6503 1.74888 25.0376 1.48012L23.694 0.890522L22.1815 4.33761L23.5251 4.92705C23.9206 5.10056 24.2869 5.1874 24.6208 5.1874C24.8274 5.1874 25.0215 5.15406 25.2022 5.08739C25.6517 4.92165 26.0028 4.55732 26.2452 4.00456Z" fill="#014087" />
                                                        <path d="M26.7688 5.784L27.061 5.3849L27.9187 6.01212L28.3933 5.36315L27.5356 4.73578L27.9998 4.10141L29.1613 4.95072L29.6557 4.27508L27.6756 2.82681L25.4524 5.86528L27.4327 7.31371L27.9303 6.63331L26.7688 5.784Z" fill="#014087" />
                                                        <path d="M29.6418 9.77784L29.6402 9.80022L29.9303 10.1479L32.8228 7.73727L32.195 6.98464L30.7458 8.1924L30.8965 5.45048L30.8976 5.42841L30.608 5.08091L27.7155 7.49152L28.3502 8.25273L29.819 7.02829L29.6418 9.77784Z" fill="#014087" />
                                                        <path d="M31.1608 12.5283L31.9064 12.1355L31.2902 10.9654L33.8759 9.60393L33.4034 8.70667L30.0718 10.4605L31.1608 12.5283Z" fill="#014087" />
                                                        <path d="M33.7657 14.571C33.0706 14.7593 32.5898 14.5683 32.448 14.046C32.3073 13.5263 32.6165 13.1351 33.3187 12.9448C33.4921 12.8976 33.6493 12.8741 33.7897 12.8741C33.931 12.8741 34.0552 12.8981 34.1611 12.9459C34.3608 13.0362 34.4981 13.2148 34.569 13.4764C34.7161 14.0182 34.4459 14.3864 33.7657 14.571ZM33.0402 11.9404C32.4385 12.1036 31.9917 12.4085 31.7484 12.8227C31.5144 13.2208 31.468 13.7161 31.6143 14.2549C31.7643 14.8082 32.0665 15.2238 32.4885 15.4567C32.7451 15.5984 33.0418 15.6699 33.3659 15.6699C33.5844 15.6699 33.8152 15.6375 34.0547 15.5726C35.2196 15.2565 35.7071 14.4089 35.3919 13.2475C35.2388 12.6836 34.9616 12.2817 34.5677 12.0523C34.1585 11.8143 33.6446 11.7764 33.0402 11.9404Z" fill="#014087" />
                                                        <path d="M35.0769 16.765L32.1511 16.8845L32.1925 17.898L35.1183 17.7783L35.1634 18.8789L36 18.8446L35.8682 15.6247L35.0316 15.659L35.0769 16.765Z" fill="#014087" />
                                                        <path d="M31.8503 21.2976L32.6847 21.4181L32.8904 19.9938L33.3655 20.0625L33.2134 21.1142L34.0097 21.2292L34.1615 20.1774L34.9544 20.2919L34.7486 21.7162L35.5776 21.8359L35.9283 19.4075L32.201 18.8692L31.8503 21.2976Z" fill="#014087" />
                                                        <path d="M33.7796 24.3715C33.6673 24.4475 33.5439 24.4585 33.4023 24.4045C33.2351 24.3412 33.1302 24.2278 33.0903 24.0677C33.0528 23.9164 33.0747 23.7263 33.1541 23.5179L33.2343 23.3064L34.18 23.6655L34.0817 23.9237C33.9992 24.1408 33.8975 24.2915 33.7796 24.3715ZM31.7798 21.6448L31.4116 22.6137L32.5084 23.0307L32.4484 23.1885L31.0664 23.5219L30.6226 24.6895L32.2372 24.2188C32.2483 24.8 32.5281 25.2227 33.0308 25.4137C33.1518 25.4596 33.3018 25.4977 33.4672 25.4977C33.9018 25.4975 34.4431 25.236 34.8473 24.1731L35.2997 22.9824L31.8323 21.6647L31.7798 21.6448Z" fill="#014087" />
                                                        <path d="M29.9402 25.7544L33.1026 27.6597L33.6375 26.7718L30.4751 24.8665L29.9402 25.7544Z" fill="#014087" />
                                                        <path d="M30.1677 26.3493L30.2 26.3032L29.4944 25.8079L29.4617 25.8499C29.0992 26.312 28.955 26.6944 29.008 27.0533C29.0641 27.4321 29.3424 27.7856 29.8843 28.1662L31.8006 29.512L32.3963 28.664L30.4396 27.2897C30.0625 27.0248 29.8399 26.8162 30.1677 26.3493Z" fill="#014087" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_15_1098">
                                                            <rect width="36" height="36" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => onCardClick(num)}
                                                disabled={!num || isChecked}
                                                className={`
                                                    w-full h-full flex items-center justify-center 
                                                    text-3xl font-bold transition-all duration-200 relative
                                                    ${isChecked ? '' : 'hover:bg-gray-50 text-gray-900'}
                                                    ${isWiggling ? 'text-red-500 animate-wiggle' : ''}
                                                `}
                                            >
                                                <span className={`relative z-10 ${isChecked ? 'text-[#1675A2]' : ''}`}>{num}</span>
                                                {showMatchHint && (
                                                    <div className="absolute inset-0 z-0 bg-[#DDF5F7] animate-hint-pulse" />
                                                )}
                                                {isChecked && (
                                                    <div className="absolute inset-0 z-0 flex items-center justify-center p-1">
                                                        {/* Blauwe scribble achtergrond met mask animatie */}
                                                        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#DDF5F7] w-[80%] h-[80%]">
                                                            <defs>
                                                                <mask id={`scribble-mask-${idx}`}>
                                                                    {/* Een dik zig-zag pad dat de vorm bedekt en geanimeerd wordt */}
                                                                    <path
                                                                        d="M10,50 L50,10 M10,10 L50,50 M28,0 L28,56 M0,28 L56,28"
                                                                        stroke="white"
                                                                        strokeWidth="24"
                                                                        strokeLinecap="round"
                                                                        pathLength="1"
                                                                        strokeDasharray="1"
                                                                        strokeDashoffset="1"
                                                                        className="animate-scribble-draw"
                                                                    />
                                                                </mask>
                                                            </defs>
                                                            <path
                                                                d="M27.0484 54.7643C23.8779 56.8627 19.4382 56.224 17.1325 53.3382C14.8271 50.4522 15.5288 46.4109 18.6991 44.3121L21.6121 42.3841L16.7797 43.0123C13.4444 43.446 10.233 41.685 9.09442 38.7986C7.9561 35.9124 9.20352 32.6956 12.0798 31.099L16.8429 28.4573L7.9129 29.3939C4.62947 29.7386 1.51845 27.9743 0.410901 25.1396C-0.696459 22.305 0.492529 19.1496 3.27768 17.5298L31.6713 1.01726C34.9749 -0.903967 39.364 -0.0238753 41.4747 2.98317C43.5853 5.9903 42.6185 9.98557 39.315 11.9069L36.841 13.347L47.2992 12.2476C50.6101 11.9 53.7418 13.6962 54.8258 16.565C55.9097 19.4341 54.6538 22.6037 51.8081 24.1833L48.8119 25.8477C51.7021 25.8132 54.3694 27.3891 55.479 29.8791C56.7048 32.63 55.7134 35.7878 53.0759 37.5338L27.0484 54.7643Z"
                                                                fill="currentColor"
                                                                mask={`url(#scribble-mask-${idx})`}
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Info Bar - "Bal" en counter op achtergrondkleur */}
                <div className="flex justify-between items-end px-4 py-2 mt-auto max-w-full mx-auto w-full">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wide">Bal</h2>
                    <span className="text-xs font-medium text-white/90">
                        {String(history.length).padStart(2, '0')}/36
                    </span>
                </div>

                {/* Progress Bar - op achtergrondkleur */}
                <div className="relative w-full h-[6px] bg-black/10">
                    <div
                        className="h-full transition-all duration-300 ease-out bg-[#003884]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Draw History - Fluid Height */}
            <div
                ref={historyRef}
                className="flex-1 overflow-y-auto bg-white pb-32"
                style={{
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {/* History Items */}
                <div>
                    {history.map((item, idx) => {
                        const isNewest = idx === 0;

                        return (
                            <div
                                key={item.timestamp}
                                className={`
                                    flex gap-4 items-center px-4 transition-colors border-b border-gray-100
                                    ${isNewest ? 'py-4 animate-bg-fade' : 'py-3'}
                                `}
                            >
                                {/* Info - Links */}
                                <div className="flex-1 min-w-0">
                                    <div className={`font-medium text-gray-700 ${isNewest ? 'text-sm' : 'text-xs'}`}>
                                        {String(item.index)}e getrokken bal
                                    </div>
                                    {item.prize ? (
                                        <div className="text-s  text-gray-800  mt-0.5">
                                            {item.prize.label}
                                        </div>
                                    ) : (
                                        <div className="text-s text-gray-400 italic mt-0.5">
                                            Nog geen bingo
                                        </div>
                                    )}
                                </div>

                                {/* Ball Number - Rechts */}
                                {/* Ball Number - Rechts */}
                                <div className="w-16 flex justify-center flex-shrink-0">
                                    {isNewest ? (
                                        <div
                                            className="w-16 h-16 rounded-full shadow-lg animate-roll-in flex items-center justify-center relative"
                                            style={{
                                                backgroundColor: getBallColor(item.ball),
                                                backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset -2px -2px 6px rgba(0,0,0,0.2)'
                                            }}
                                        >
                                            {/* White Badge Container */}
                                            <div className="w-10 h-10 bg-white rounded-[12px] flex flex-col items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] relative z-10">
                                                <span className="text-2xl font-bold text-gray-800 leading-none pt-1 text-box-trim">{item.ball}</span>
                                                <div className="w-3 h-[2px] bg-gray-800 mt-[px] rounded-full opacity-80"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 flex justify-center items-center font-bold rounded-full leading-none text-box-trim text-xl text-gray-500 bg-gray-100">
                                            {item.ball}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fixed CTA with Gradient Overlay */}
            <div
                className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 1) 70%)'
                }}
            >
                <div className="flex items-end justify-center h-full px-3 pb-5 pointer-events-none">
                    <button
                        onClick={onSkip}
                        className="w-full max-w-[351px] px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-md bg-white text-[#003884] border-2 border-[#003884] shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl active:scale-[0.98] pointer-events-auto"
                    >
                        Skip naar uitslag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;

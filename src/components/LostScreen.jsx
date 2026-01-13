import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ContentWrapper from './ContentWrapper';
import lostHeroImage from '../assets/bingo-lost.png';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import BallsHistory from './game/BallsHistory';
import winactiesImage from '../assets/vl-winacties.png';
import vipcardImage from '../assets/vl-vipcard.png';
import extraBingoImage from '../assets/vl-extra-bingo.png';

const LostScreen = ({ onBackToBingo, onReplay, showHeader = false, bingoCard = [], checkedNumbers = new Set(), drawnBalls = [], panelColor = '#AA167C' }) => {
  // Random kleur voor ballen
  const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
  const getBallColor = (ballNumber) => {
    return panelColors[ballNumber % panelColors.length];
  };
  // Carousel cards data voor verlies scherm
  const carouselCards = [
    {
      id: 'winacties',
      title: 'Winacties',
      content: 'U kunt als deelnemer bij de VriendenLoterij gratis meedoen aan winacties. Maak kans op extra prijzen en profiteer van exclusieve aanbiedingen.',
      thumbnail: winactiesImage,
    },
    {
      id: 'vip',
      title: 'VIP kaart',
      content: 'U kunt gratis naar ruim 180 musea, u krijgt tot wel 50% korting bij theaters, bioscopen, dierenparken en kastelen in heel Nederland én kans om exclusieve evenementen te bezoeken.',
      thumbnail: vipcardImage,
    },
    {
      id: 'upsell',
      title: 'Meer kans maken?',
      content: 'Koop een extra bingo kaart en verdubbel je kansen. Meer kaarten betekent meer mogelijkheden om te winnen.',
      thumbnail: extraBingoImage,
      isUpsell: true,
    },
  ];
  const handleReplay = () => {
    if (onReplay) return onReplay();
    return onBackToBingo();
  };

  return (
    <div className="flex flex-col w-full h-full" style={{ background: 'linear-gradient(180deg, #F6E9E7 0%, #EAC7C7 100%)' }}>
      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable Content - Hero Image + Content */}
      <div className="overflow-y-auto flex-1">
        {/* Hero Section - Bingo kaart met rode achtergrond */}
        <div
          className="flex relative justify-center items-center w-full"
          style={{
            background: 'linear-gradient(180deg, #F6E9E7 0%, #EAC7C7 100%)',
            borderRadius: '0px',
            minHeight: '200px',
            height: '200px',
          }}
        >
          {bingoCard.length > 0 && (
            <div className="opacity-80">
              <BingoCard
                bingoCard={bingoCard}
                checkedNumbers={checkedNumbers}
                currentBall={null}
                wigglingNumber={null}
                showHint={false}
                onCardClick={() => {}}
              />
            </div>
          )}
        </div>

        {/* Horizontale Balls Strip */}
        {drawnBalls.length > 0 && (
          <div className="bg-white py-3">
            <BallsHistory drawnBalls={drawnBalls} getBallColor={getBallColor} />
          </div>
        )}

        {/* Content Section */}
        <ContentWrapper className="flex flex-col px-4 pt-3 pb-4 bg-white">
          {/* Prijs kaartje (lost) */}
          <div className="flex gap-3 items-center p-4 mb-4 w-full rounded-lg border border-gray-200 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] bg-white">
            <div className="flex-1 min-w-0">
              <div className="text-xl font-black text-[#003884] mb-1">Helaas</div>
              <p className="text-base text-[#29313d] leading-relaxed">
                Trekking is voorbij! Geen Bingo, volgende week nieuwe ronde, nieuwe kansen!
              </p>
            </div>
            <div className="overflow-hidden w-20 h-16 rounded-lg shrink-0 bg-[#F2D064] flex items-center justify-center">
              <img
                src={lostHeroImage}
                alt="Helaas"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* Carousel Section */}
          <div className="mb-2 w-full">
            <h3 className="text-xl font-bold text-[#003884] mb-2 mt-2 text-center">
              Haal alles uit je ticket
            </h3>
            <Swiper
              modules={[Autoplay, Pagination, Parallax]}
              spaceBetween={16}
              slidesPerView={1}
              parallax={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="swiper-initialized swiper-horizontal"
              aria-label="Carousel met informatie over extra mogelijkheden"
            >
              {carouselCards.map((card) => (
                <SwiperSlide
                  key={card.id}
                  className="h-auto! pb-2"
                  role="group"
                  aria-label={`Slide ${card.id}: ${card.title}`}
                >
                  <div className="h-full w-full bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] flex flex-col">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden shrink-0 h-[180px] w-full">
                      <img
                        src={card.thumbnail}
                        alt={card.title}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-0 px-5 py-5 grow">
                      <h3
                        className="text-lg font-bold text-[#29313d] mb-0 break-words"
                        data-swiper-parallax="-100"
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-sm text-[#7a7a7a] leading-relaxed break-words"
                        data-swiper-parallax="-200"
                        data-swiper-parallax-duration="600"
                      >
                        {card.content}
                      </p>
                      {card.isUpsell && (
                        <button
                          className="mt-2 px-6 py-3 bg-[#003884] text-white font-bold rounded-md hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
                          data-swiper-parallax="-300"
                          aria-label={`Extra kaart kopen voor ${card.title}`}
                        >
                          Extra kaart kopen
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Speel opnieuw af Button */}
          <button
            onClick={handleReplay}
            className="w-full bg-white text-[#003884] font-bold mt-2 py-4 px-6 rounded-lg border-2 border-[#003884] hover:bg-[#F3F7FF] transition-colors text-base flex items-center justify-center gap-2"
            aria-label="Speel opnieuw af"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 8.33333C1.66699 8.33333 3.33781 6.05685 4.69519 4.69854C6.05257 3.34022 7.92832 2.5 10.0003 2.5C14.1425 2.5 17.5003 5.85786 17.5003 10C17.5003 14.1421 14.1425 17.5 10.0003 17.5C6.58108 17.5 3.69625 15.2119 2.79346 12.0833M1.66699 8.33333V3.33333M1.66699 8.33333H6.66699" stroke="#003884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Speel opnieuw af</span>
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default LostScreen;

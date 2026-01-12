import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ContentWrapper from './ContentWrapper';
import lostHeroImage from '../assets/bingo-lost.png';
import GameHeader from './game/GameHeader';
import MiniCard from './game/MiniCard';

const LostScreen = ({ onBackToBingo, showHeader = false, bingoCard = [], checkedNumbers = new Set() }) => {
  // Carousel cards data voor verlies scherm
  const carouselCards = [
    {
      id: 'winacties',
      title: 'Winacties',
      content: 'U kunt als deelnemer bij de VriendenLoterij gratis meedoen aan winacties. Maak kans op extra prijzen en profiteer van exclusieve aanbiedingen.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
    },
    {
      id: 'vip',
      title: 'VIP kaart',
      content: 'U kunt gratis naar ruim 180 musea, u krijgt tot wel 50% korting bij theaters, bioscopen, dierenparken en kastelen in heel Nederland én kans om exclusieve evenementen te bezoeken.',
      thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=240&fit=crop',
    },
    {
      id: 'upsell',
      title: 'Meer kans maken?',
      content: 'Koop een extra bingo kaart en verdubbel je kansen. Meer kaarten betekent meer mogelijkheden om te winnen.',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop',
      isUpsell: true,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header - Fixed */}
      {showHeader && <GameHeader onClose={onBackToBingo} />}

      {/* Scrollable Content - Hero Image + Content */}
      <div className="overflow-y-auto flex-1">
        {/* Hero Image Section - Scrolls with content */}
        <div
          className="flex relative justify-center items-center w-full animate-fade-in"
          style={{
            background: 'linear-gradient(180deg, #F6E9E7 0%, #EAC7C7 100%)',
            borderRadius: '0px',
            minHeight: '200px',
          }}
        >
          <div className="flex relative justify-center items-center w-full">
            <img
              src={lostHeroImage}
              alt="Helaas geen Bingo"
              className="w-full max-w-[250px] h-auto object-contain opacity-0 animate-scale-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            />
          </div>

          {/* Mini Bingo Card - rechtsboven, half over header */}
          {bingoCard.length > 0 && (
            <MiniCard bingoCard={bingoCard} checkedNumbers={checkedNumbers} />
          )}
        </div>

        {/* Content Section */}
        <ContentWrapper className="flex flex-col px-2 pt-2 pb-4 bg-white">
          {/* Lost Message */}
          <div className="pt-4 mb-2 w-full text-center">
            <h2
              className="text-4xl font-black text-[#003884] mb-2 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Helaas!
            </h2>
            <p className="text-lg text-[#29313d] font-medium mb-2">
              Alle ballen zijn getrokken, je hebt geen Bingo.
            </p>
            <p className="text-base text-[#29313d]">
              Volgende week nieuwe ronde, nieuwe kansen!
            </p>
          </div>

          {/* Carousel Section */}
          <div className="mb-2 w-full">
            <h3 className="text-xl font-bold text-[#003884] mb-2 mt-2 text-center">
              Haal alles uit je deelname
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

          {/* Back to Bingo Button */}
          <button
            onClick={onBackToBingo}
            className="w-full bg-white border-2 border-[#003884] text-[#003884] font-bold mt-2 py-4 px-6 rounded-lg hover:bg-[#003884] hover:text-white transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-[#003884] focus:ring-offset-2"
            aria-label="Terug naar Bingo"
          >
            Terug naar Bingo
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default LostScreen;

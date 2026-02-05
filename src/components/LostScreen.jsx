import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ContentWrapper from './ContentWrapper';
import lostHeroImage from '../assets/bingo-lost.png';
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import winactiesImage from '../assets/vl-winacties.png';
import vipcardImage from '../assets/vl-vipcard.png';
import extraBingoImage from '../assets/vl-extra-bingo.png';
import { getLastSunday, formatDateLong } from '../lib/utils';

const LostScreen = ({ onBackToBingo, showHeader = false, bingoCard = [], checkedNumbers = new Set(), drawnBalls = [], panelColor = '#AA167C' }) => {
  const lastSunday = getLastSunday();
  const dateText = formatDateLong(lastSunday);

  // Carousel cards data voor verlies scherm
  const carouselCards = [
    {
      id: 'winacties',
      title: 'Doe mee met winacties',
      content: 'Maak kans op extra prijzen en profiteer van leuke aanbiedingen met onze winacties! Als deelnemer kunt u gratis meedoen.',
      thumbnail: winactiesImage,
    },
    {
      id: 'vip',
      title: 'Op pad met uw VIP-KAART',
      content: 'Gratis naar ruim 180 musea én tot wel 50% korting op theatervoorstellingen, films en een dagje tussen de dieren: uw VIP-KAART geeft u overal voordeel.',
      thumbnail: vipcardImage,
    },
    {
      id: 'upsell',
      title: 'Meer kans op Bingo?',
      content: 'Koop een extra Bingokaart en maak extra kans om te winnen. Op naar een volle kaart!',
      thumbnail: extraBingoImage,
      isUpsell: true,
    },
  ];
  const handleBackToOverview = () => onBackToBingo();

  return (
    <div className="flex relative flex-col w-full bg-white h-dvh">
      {/* Header - Fixed */}
      {showHeader && (
        <div className="fixed top-0 right-0 left-0 z-40">
          <GameHeader onClose={onBackToBingo} />
        </div>
      )}

      {/* Scrollable container - alleen content scrollt, hero blijft zichtbaar */}
      <div className={`flex overflow-y-auto flex-col flex-1 bg-white ${showHeader ? 'pt-[96px]' : ''}`}>
        {/* Hero sectie - auto hoogte gebaseerd op content + padding, met fixed progress bar */}
        <div className="flex overflow-hidden relative flex-col shrink-0 hero-bingo-container">
          {/* Achtergrond: dezelfde kleur als de Bingokaart */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: panelColor }}
            aria-hidden="true"
          />

          <div className="flex relative z-10 flex-col">
            {/* Bingo Card Container - verticaal gecentreerd */}
            <div className="flex overflow-visible relative justify-center items-center pb-4 w-full hero-bingo-card-container">
              {bingoCard.length > 0 && (
                <BingoCard
                  bingoCard={bingoCard}
                  checkedNumbers={checkedNumbers}
                  currentBall={null}
                  wigglingNumber={null}
                  showHint={false}
                  onCardClick={() => { }}
                  opacity={1}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <ContentWrapper className="flex flex-col px-4 pt-3 pb-4 bg-white">
          {/* Prijs kaartje (lost) */}
          <div
            className="flex gap-2 items-start mb-4 w-full opacity-0 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-xl font-black text-[#003884] mb-1 mt-4">Geen Bingo</div>
              <p className="text-base text-[#29313d] leading-relaxed">
                De Bingo is voorbij, u heeft geen prijs gewonnen. Volgende week <strong className="lowercase">{dateText}</strong> kunt u weer meespelen!
              </p>
            </div>
            <img
              src={lostHeroImage}
              alt="Geen Bingo"
              className="object-cover w-32 h-32 shrink-0"
            />
          </div>

          {/* Carousel Section */}
          <div
            className="mb-2 w-full opacity-0 animate-fade-in"
            style={{ animationDelay: '350ms' }}
          >
            <h3 className="text-xl font-bold text-[#003884] mb-2 mt-2 text-center">
              Haal alles uit uw deelname
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
                        className="text-lg font-bold text-[#29313d] mb-0 wrap-break-word"
                        data-swiper-parallax="-100"
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-sm text-[#7a7a7a] leading-relaxed wrap-break-word"
                        data-swiper-parallax="-200"
                        data-swiper-parallax-duration="600"
                      >
                        {card.content}
                      </p>
                      {card.isUpsell && (
                        <button
                          className="px-6 py-3 mt-2 text-sm btn-primary"
                          data-swiper-parallax="-300"
                          aria-label={`Extra kaart kopen voor ${card.title}`}
                        >
                          Extra Bingokaart kopen
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Terug naar overzicht Button - sluit modal, terug naar bingo overview met gespeelde kaart */}
          <button
            onClick={handleBackToOverview}
            className="flex justify-center items-center mt-2 w-full btn-secondary opacity-0 animate-fade-in"
            style={{ animationDelay: '500ms' }}
            aria-label="Terug naar overzicht"
          >
            Terug naar overzicht
          </button>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default LostScreen;

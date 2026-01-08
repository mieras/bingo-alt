import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const GameResult = ({ prize }) => {
    // Carousel cards data voor verlies scherm
    const carouselCards = [
        {
            id: 'winacties',
            title: 'Haal alles uit je deelname',
            content: 'Maak kans op extra prijzen via de winacties. Ontdek alle mogelijkheden om meer te winnen en profiteer van exclusieve aanbiedingen.',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
        },
        {
            id: 'vip',
            title: 'VIP kaart',
            content: 'U kunt gratis naar ruim 180 musea, u krijgt tot wel 50% korting bij theaters, bioscopen, dierenparken en kastelen in heel Nederland én kans om exclusieve evenementen te bezoeken.',
            thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=240&fit=crop',
        },
        {
            id: 'thema',
            title: 'Themamaand',
            content: 'VriendenLoterij Museummaand: November is Museummaand bij de VriendenLoterij! Het is dan nog voordeliger om een museum te bezoeken met uw VIP-KAART. De hele maand november krijgt u gratis entree voor 2 personen bij diverse musea door heel Nederland.',
            thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=240&fit=crop',
        },
        {
            id: 'prijzen',
            title: 'Aankomende prijzen',
            content: 'Bekijk welke geweldige prijzen er nog komen. Elke week nieuwe kansen om te winnen en bijzondere prijzen te behalen.',
            thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop',
        },
        {
            id: 'upsell',
            title: 'Meer kans maken?',
            content: 'Koop een extra bingo kaart en verdubbel je kansen. Meer kaarten betekent meer mogelijkheden om te winnen.',
            thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop',
            isUpsell: true,
        },
        {
            id: 'evenementen',
            title: 'Exclusieve evenementen',
            content: 'Bezoek unieke evenementen en beleef bijzondere momenten met je VIP-kaart. Ontvang toegang tot exclusieve bijeenkomsten en speciale activiteiten.',
            thumbnail: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&h=240&fit=crop',
        },
        {
            id: 'kortingen',
            title: 'Exclusieve kortingen',
            content: 'Profiteer van aantrekkelijke kortingen bij onze partners door heel Nederland. Bespaar op uitjes, entertainment en nog veel meer.',
            thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop',
        },
        {
            id: 'community',
            title: 'Word lid van de community',
            content: 'Sluit je aan bij duizenden andere deelnemers en deel je ervaringen. Maak nieuwe vrienden en geniet van gezamenlijke activiteiten.',
            thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=240&fit=crop',
        },
    ];

    if (prize) {
        // WIN SCHERM - Simpel en duidelijk
        return (
            <div className="flex flex-col items-center justify-center min-h-full p-6 py-8 text-center animate-fade-in max-w-md mx-auto w-full">
                <h2 className="text-5xl md:text-6xl font-black text-[#003884] mb-6">
                    BINGO!
                </h2>
                
                <div className="mb-8 w-full">
                    <p className="text-xl md:text-2xl font-bold text-[#AA167C] mb-6 tracking-tight">
                        {prize.prize}
                    </p>
                    
                    <div className="bg-white/90 rounded-lg p-6 mb-6 shadow-lg">
                        <p className="text-[#29313d] text-base md:text-lg leading-relaxed mb-4">
                            Je ontvangt informatie over de ontvangst van je prijs in de mail en per post.
                        </p>
                        <p className="text-[#29313d] text-base md:text-lg leading-relaxed">
                            Je prijs is ook te zien op de pagina{' '}
                            <a 
                                href="/prijzen" 
                                className="text-[#003884] font-bold underline hover:text-[#AA167C] transition-colors"
                            >
                                'prijzen'
                            </a>.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
                    aria-label="Start een nieuw Bingo spel"
                >
                    Opnieuw spelen
                </button>
            </div>
        );
    }

    // VERLIES SCHERM - Met carousel
    return (
        <div className="flex flex-col min-h-full p-6 py-8 animate-fade-in overflow-hidden max-w-md mx-auto w-full">
            <div className="text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-black text-[#003884] mb-2">
                    Helaas
                </h2>
                <h3 className="text-3xl md:text-4xl font-black text-[#003884] mb-4">
                    geen Bingo
                </h3>
                <p className="text-lg md:text-xl text-[#29313d] font-medium">
                    Volgende week nieuwe ronde nieuwe kansen
                </p>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="w-full overflow-hidden">
                    <Swiper
                        modules={[Autoplay, Pagination, Parallax]}
                        spaceBetween={16}
                        slidesPerView={1}
                        parallax={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 1,
                            },
                            1280: {
                                slidesPerView: 1,
                            },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        className="swiper-initialized swiper-horizontal -mb-2 -mt-2 swiper-backface-hidden"
                        data-testid="Carousel"
                        aria-label="Carousel met informatie over extra mogelijkheden"
                    >
                    {carouselCards.map((card) => (
                        <SwiperSlide
                            key={card.id}
                            className="!h-auto pb-2 pt-2"
                            data-testid="CarouselSlide"
                            role="group"
                            aria-label={`Slide ${card.id}: ${card.title}`}
                        >
                            <div className="h-full w-full">
                                <div className="h-full w-full bg-white border border-[#e5e5e5] rounded-lg overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] transition-shadow flex flex-col">
                                    {/* Thumbnail with parallax */}
                                    <div className="relative overflow-hidden shrink-0 h-[180px] md:h-[240px] w-full">
                                        <div 
                                            className="overflow-hidden absolute h-full w-full"
                                            data-swiper-parallax="-23%"
                                        >
                                            <img
                                                src={card.thumbnail}
                                                alt={card.title}
                                                className="h-full w-full object-cover"
                                                data-swiper-parallax-scale="0.15"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex grow flex-col gap-5 px-5 py-5">
                                        <div className="grow flex flex-col gap-2">
                                            <div>
                                                <h3 
                                                    className="text-lg font-bold text-[#29313d] mb-2 break-words"
                                                    data-swiper-parallax="-100"
                                                >
                                                    {card.title}
                                                </h3>
                                            </div>
                                            <div className="flex flex-col items-start gap-2 text-left">
                                                <p 
                                                    className="text-sm text-[#7a7a7a] leading-relaxed break-words"
                                                    data-swiper-parallax="-200"
                                                    data-swiper-parallax-duration="600"
                                                >
                                                    {card.content}
                                                </p>
                                            </div>
                                        </div>
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
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </div>

                {/* Play Again Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-[#003884] text-white font-bold rounded-md shadow-lg hover:bg-[#002a5f] transition-colors uppercase tracking-wide text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003884]"
                        aria-label="Start een nieuw Bingo spel"
                    >
                        Opnieuw spelen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameResult;

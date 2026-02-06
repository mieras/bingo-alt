import React from 'react';
import mailHeaderImage from '../assets/vl-bingo-mail-header.png';
import mailHeaderImageMob from '../assets/vl-bingo-mail-header-mob.png';
import appBannerImage from '../assets/vl-bingo-app-banner.png';
import { getLastSunday, formatDateLong } from '../lib/utils';

const MailScreen = ({ onNavigateToAccount, onNavigateToBingo, onPlayNow }) => {
  const lastSunday = getLastSunday();
  const dateText = formatDateLong(lastSunday);

  return (
    <div className="flex overflow-y-auto flex-col w-full h-full bg-white">
      {/* Hero Image Section - Mobile (-mob) vs Desktop responsive */}
      <div className="flex relative justify-center w-full shrink-0">
        <img
          src={mailHeaderImageMob}
          alt="Bekijk de uitslagen"
          className="h-auto w-full max-w-[480px] border-0 rounded-none md:hidden"
        />
        <img
          src={mailHeaderImage}
          alt="Bekijk de uitslagen"
          className="hidden h-auto w-full max-w-[765px] border-0 rounded-none md:block md:rounded-lg"
        />
      </div>

      {/* Main Content Section - Based on HTML structure */}
      <div className="w-full bg-white">
        {/* Content wrapper - max-width 600px, gecentreerd */}
        <div className="mx-auto w-full max-w-[600px]">
          {/* Title */}
          <h1
            className="w-full text-left px-4 pb-3 mt-4 font-extrabold text-[#003884] md:px-11"
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              lineHeight: 'clamp(32px, 5.5vw, 44px)',
            }}
          >
            Tijd voor Bingo!
          </h1>

          {/* Body Text */}
          <p className="w-full px-4 text-left text-base leading-6 font-normal text-[#333333] md:px-11">
            De Bingo van <strong className="lowercase">{dateText}</strong> staat klaar. Speel nu en vink alle nummers af. Volle kaart? U ziet direct uw prijs! Ook als u niet speelt kunt u via uw eigen account zien of u prijzen heeft gewonnen. Veel plezier!
          </p>
          {/* CTA Button */}
          <div className="px-4 pt-4 w-full md:px-11">
            <button
              onClick={onNavigateToBingo}
              className="block mx-auto md:mx-0 px-8 py-4 md:min-w-[210px] md:w-auto text-base w-full leading-4 font-bold text-white bg-[#009640] rounded-lg border-b-4 border-[#087239] shadow-[0_1px_#0c7b3f] no-underline transition-all hover:opacity-90 active:scale-95"
            >
              Speel Bingo
            </button>

          </div>

        </div>
      </div>

      {/* VIP-KAART App Promotie Section - Background full width, content in wrapper */}
      <div
        className="relative mt-8 w-full pt-[30px] bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_vip-kaart-bg_lichtblauw_dt.png)',
          backgroundSize: 'auto 184px',
        }}
      >
        {/* Content wrapper - max-width 600px, gecentreerd, height 200px */}
        <div className="relative mx-auto w-full max-w-[600px]">
          {/* Mobile: App image bovenaan (alleen op mobile zichtbaar) */}
          <div className="block p-0 text-center md:hidden">
            <img
              src="https://email.vriendenloterij.nl/images/SMC/VL/Uitslagen/app_uitslagen.png"
              alt=""
              className="block mx-auto w-full max-w-[246px]"
            />
          </div>

          {/* Desktop layout: table structuur met 3 kolommen */}
          <div className="flex relative items-start w-full">
            {/* Kolom 1: Spacer 43px (alleen desktop) */}
            <div className="hidden shrink-0 md:block w-[43px]">&nbsp;</div>

            {/* Kolom 2: Content */}
            <div className="flex-1 px-4 max-w-[300px] md:px-0">
              <h3 className="pt-[30px] pb-1.5 text-left text-lg leading-[22px] font-bold text-[#003884]">
                Uw VIP-KAART op zak én direct zien of u gewonnen heeft
              </h3>
              <p className="p-0 text-left text-[15px] leading-4 font-[350] text-[#003884]">
                Beleef het in de app
              </p>
              <div className="flex gap-2 py-3 pb-[30px]">
                <a
                  href="https://apps.apple.com/nl/app/vriendenloterij/id1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download in de App Store"
                  className="pr-2 pb-px"
                >
                  <img
                    src="https://email.vriendenloterij.nl/images/SMC/VL/btn_app_store.png"
                    alt="App Store"
                    width="110"
                    height="33"
                    className="block"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=nl.vriendenloterij"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download op Google Play"
                  className="pb-px"
                >
                  <img
                    src="https://email.vriendenloterij.nl/images/SMC/VL/btn_google_play.png"
                    alt="Google Play"
                    width="110"
                    height="33"
                    className="block"
                  />
                </a>
              </div>
            </div>

            {/* Kolom 3: App Image 280px (alleen desktop) */}
            <div className="hidden shrink-0 p-0 md:block w-[280px]">
              <img
                src="https://email.vriendenloterij.nl/images/SMC/VL/Uitslagen/app_uitslagen.png"
                alt=""
                width="246"
                height="207"
                className="block max-w-[246px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Background full width, content in wrapper */}
      <div className="mt-4 w-full bg-[#fcfaf7]">
        {/* Content wrapper - max-width 600px, gecentreerd */}
        <div className="mx-auto w-full max-w-[600px] p-10">
          <div className="flex flex-col items-center w-full">
            {/* Feedback Section */}
            <p className="pb-2 text-center text-base leading-6 font-semibold text-[#515151]">
              Wat vindt u van deze e-mail?
            </p>
            <div className="flex gap-2 pb-8">
              <a href="#" title="Feedback positief">
                <img
                  alt="Duim omhoog"
                  height="45"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_feedback_positief.png"
                  width="45"
                  className="block"
                />
              </a>
              <a href="#" title="Feedback negatief">
                <img
                  alt="Duim omlaag"
                  height="45"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_feedback_negatief.png"
                  width="45"
                  className="block"
                />
              </a>
            </div>

            {/* Social Media */}
            <p className="pb-2 text-center text-base leading-6 font-semibold text-[#515151]">
              Volg ons:
            </p>
            <div className="flex gap-4 pb-10">
              <a href="https://www.instagram.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="Instagram">
                <img
                  alt="Instagram"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_instagram.png"
                  width="40"
                  className="block"
                />
              </a>
              <a href="https://www.youtube.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="YouTube">
                <img
                  alt="YouTube"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_youtube.png"
                  width="40"
                  className="block"
                />
              </a>
              <a href="https://www.facebook.com/vriendenloterij" target="_blank" rel="noopener noreferrer" title="Facebook">
                <img
                  alt="Facebook"
                  src="https://email.vriendenloterij.nl/images/SMC/VL/202404_icon_facebook.png"
                  width="40"
                  className="block"
                />
              </a>
            </div>

            {/* Footer Text */}
            <p className="px-4 text-center text-sm leading-[22px] font-[350] text-[#515151] md:px-16">
              <a href="https://www.vriendenloterij.nl" className="text-[#515151]">VriendenLoterij</a>,{' '}
              <a href="https://www.vriendenloterij.nl" className="no-underline text-[#515151]">
                Beethovenstraat 200, 1077 JZ Amsterdam
              </a>
              <br /><br />
              Let op! De afgebeelde prijzen zijn onder voorbehoud. Het Prijzenpakket van VriendenLoterij is wekelijks wisselend.
              <br /><br />
              De vergunning voor de loterij is afgegeven door de Kansspelautoriteit onder kenmerk 300027/14481 d.d. 21/10/2021.
              <br /><br />
              <a href="https://www.vriendenloterij.nl/privacy" className="text-[#515151]">Privacy Statement</a>
              {' '}
              <a href="https://www.vriendenloterij.nl/uitschrijven" className="text-[#515151]">Uitschrijven</a>
            </p>

            {/* 18+ Badge */}
            <div className="pt-6">
              <img
                alt="18+ Speel bewust"
                height="31"
                src="https://email.vriendenloterij.nl/images/SMC/VL/2024-wlkm_18plus_speel_bewust.png"
                width="123"
                className="block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailScreen;

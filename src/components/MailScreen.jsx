import React from 'react';
import mailHeaderImage from '../assets/vl-bingo-mail-header.png';
import appBannerImage from '../assets/vl-bingo-app-banner.png';

const MailScreen = ({ onNavigateToAccount, onNavigateToBingo, onPlayNow }) => {
  return (
    <div className="flex overflow-y-auto flex-col w-full h-full bg-white">
      {/* Hero Image Section - Desktop/Mobile responsive */}
      <div className="flex relative justify-center w-full shrink-0">
        <img
          src={mailHeaderImage}
          alt="Bekijk de uitslagen"
          className="h-auto w-full max-w-[480px] border-0 rounded-none md:max-w-[765px] md:rounded-lg"
        />
      </div>

      {/* Main Content Section - Based on HTML structure */}
      <div className="w-full bg-white">
        {/* Content wrapper - max-width 600px, gecentreerd */}
        <div className="mx-auto w-full max-w-[600px]">
          {/* Title */}
          <h1
            className="w-full text-left px-4 pb-3 font-extrabold text-[#003884] md:px-11"
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              lineHeight: 'clamp(32px, 5.5vw, 44px)',
            }}
          >
            Uitslagen VriendenLoterij Eredivisie Bingo
          </h1>

          {/* Body Text */}
          <p className="w-full px-4 text-left text-base leading-6 font-normal text-[#333333] md:px-11">
            De VriendenLoterij Eredivisie Bingo uitslagen van maandag 29 december zijn bekend! Speel{' '}
            <button
              onClick={onNavigateToAccount}
              className="text-[#003884] underline cursor-pointer hover:text-[#002a5f]"
            >
              Bingo
            </button>{' '}
            in je{' '}
            <button
              onClick={onNavigateToAccount}
              className="text-[#003884] underline cursor-pointer hover:text-[#002a5f]"
            >
              mijn account
            </button>{' '}
            of in de VriendenLoterij app om te kijken of je gewonnen hebt.
          </p>

          {/* CTA Button */}
          <div className="w-full px-4 pt-4 md:px-11">
            <button
              onClick={onNavigateToBingo}
              className="block mx-auto px-8 py-4 min-w-[210px] text-base leading-4 font-bold text-white bg-[#009640] rounded-lg border-b-4 border-[#087239] shadow-[0_1px_#0c7b3f] no-underline transition-all hover:opacity-90 active:scale-95"
            >
              Ga naar de Bingo
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
            <p className="pb-2 text-center text-base leading-6 font-semibold text-[#515151] pb-2">
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
            <p className="pb-2 text-center text-base leading-6 font-semibold text-[#515151] pb-2">
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

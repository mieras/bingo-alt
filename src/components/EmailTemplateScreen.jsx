import React from 'react';
import GameHeader from './game/GameHeader';
import ContentWrapper from './ContentWrapper';

const EmailTemplateScreen = () => {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <GameHeader />
      
      <ContentWrapper className="flex flex-col items-center justify-center flex-1 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#003884] mb-4">
            E-mail Template
          </h1>
          <p className="text-gray-600">
            Dit scherm is een placeholder voor de e-mail template functionaliteit.
          </p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default EmailTemplateScreen;

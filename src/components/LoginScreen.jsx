import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import vlLogo from '../assets/vl_logo.png';

const LoginScreen = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Geen validatie, gewoon inloggen
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full flex flex-col">
      <ContentWrapper className="flex flex-col items-center flex-1 p-6">
        <div className="w-full max-w-sm">
          {/* Logo - Centraal bovenaan */}
          <div className="flex justify-center mb-8">
            <img
              src={vlLogo}
              alt="VriendenLoterij"
              className="h-auto max-h-[60px] w-auto"
            />
          </div>

          {/* Titel */}
          <h1 className="text-3xl font-bold text-[#003884] mb-6 text-left">
            Inloggen
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                E-mailadres<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003884]"
                placeholder="E-mailadres*"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Wachtwoord<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003884]"
                  placeholder="Wachtwoord*"
                />
                {/* Eye icon placeholder - kan later worden toegevoegd */}
              </div>
            </div>
            
            {/* Wachtwoord vergeten link */}
            <div className="text-left">
              <a href="#" className="text-sm text-[#003884] hover:underline">
                Wachtwoord vergeten?
              </a>
            </div>
            
            {/* Inloggen button - Groen */}
            <button
              type="submit"
              className="w-full bg-[#009640] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#087239] transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#009640]"
              style={{
                borderBottom: '4px solid #087239',
                textShadow: '0 1px #0c7b3f',
              }}
            >
              Inloggen
            </button>
          </form>
          
          {/* Account aanmaken button - Secundair */}
          <button
            type="button"
            className="w-full mt-4 bg-white border-2 border-[#003884] text-[#003884] font-bold py-4 px-6 rounded-lg hover:bg-[#003884] hover:text-white transition-colors uppercase tracking-wide text-base focus:outline-none focus:ring-2 focus:ring-[#003884] focus:ring-offset-2"
          >
            Account aanmaken
          </button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default LoginScreen;

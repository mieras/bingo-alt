import React, { useEffect, useRef, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import vlLogo from '../assets/vl_logo.png';

const LoginScreen = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const typingTimersRef = useRef({ email: null, password: null });
  const typingIndexRef = useRef({ email: 0, password: 0 });

  const dummyEmail = 'naam@domein.nl';
  const dummyPassword = 'dummyPass1234';

  const stopTyping = (field) => {
    const timer = typingTimersRef.current[field];
    if (timer) {
      clearInterval(timer);
      typingTimersRef.current[field] = null;
      typingIndexRef.current[field] = 0;
    }
  };

  const startTyping = (field, value, setter) => {
    if (typingTimersRef.current[field]) return;
    typingIndexRef.current[field] = 0;
    typingTimersRef.current[field] = setInterval(() => {
      typingIndexRef.current[field] += 1;
      const next = value.slice(0, typingIndexRef.current[field]);
      setter(next);
      if (typingIndexRef.current[field] >= value.length) {
        stopTyping(field);
      }
    }, 40);
  };

  useEffect(() => {
    return () => {
      stopTyping('email');
      stopTyping('password');
    };
  }, []);

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
                onFocus={() => {
                  if (!email) {
                    startTyping('email', dummyEmail, setEmail);
                  }
                }}
                onInput={() => stopTyping('email')}
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
                  onFocus={() => {
                    if (!password) {
                      startTyping('password', dummyPassword, setPassword);
                    }
                  }}
                  onInput={() => stopTyping('password')}
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
            
            {/* Inloggen button - Primary */}
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Inloggen
            </button>
          </form>
          
          {/* Account aanmaken button - Secondary */}
          <button
            type="button"
            className="w-full mt-4 btn-secondary"
          >
            Account aanmaken
          </button>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default LoginScreen;

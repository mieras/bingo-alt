import React from 'react';

/**
 * ContentWrapper component that limits content width to 375px
 * Wraps header + content to ensure consistent max-width across all screens
 */
const ContentWrapper = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[375px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default ContentWrapper;

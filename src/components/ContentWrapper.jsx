import React from 'react';

/**
 * ContentWrapper component that limits content width to 375px
 * Wraps header + content to ensure consistent max-width across all screens
 */
const ContentWrapper = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto w-full ${className}`}>
      {children}
    </div>
  );
};

export default ContentWrapper;

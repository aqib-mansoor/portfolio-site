import React from 'react';

export const BackgroundOrbs: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -2,
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Orb 1: Gold Theme */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 219, 112, 0.05) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
          filter: 'blur(40px)',
          animation: 'floatOrb1 25s ease-in-out infinite alternate'
        }}
      />
      {/* Orb 2: Cyan Accent */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97, 218, 251, 0.03) 0%, transparent 70%)',
          bottom: '15%',
          right: '10%',
          filter: 'blur(60px)',
          animation: 'floatOrb2 30s ease-in-out infinite alternate'
        }}
      />
      {/* Orb 3: Soft Purple/Red Accent */}
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 45, 32, 0.02) 0%, transparent 70%)',
          top: '40%',
          right: '25%',
          filter: 'blur(50px)',
          animation: 'floatOrb3 22s ease-in-out infinite alternate'
        }}
      />
    </div>
  );
};

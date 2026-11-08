import React, { useState } from 'react';

export const FloatingPetals: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  if (!enabled) {
    return (
      <button
        onClick={() => setEnabled(true)}
        className="fixed bottom-4 right-4 z-40 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
        title="Turn on floating flower petals"
      >
        <span>🌸</span>
        <span>Show Flowers</span>
      </button>
    );
  }

  // 14 floating petal particles with staggered delays, random left positions, and varied sizes
  const petals = [
    { id: 1, left: '6%', delay: '0s', size: 16, anim: 'animate-petal-1', rotate: 12, opacity: 0.7, type: 'cherry' },
    { id: 2, left: '18%', delay: '3.5s', size: 20, anim: 'animate-petal-2', rotate: 45, opacity: 0.8, type: 'rose' },
    { id: 3, left: '32%', delay: '1.2s', size: 14, anim: 'animate-petal-1', rotate: -30, opacity: 0.65, type: 'blossom' },
    { id: 4, left: '48%', delay: '6s', size: 22, anim: 'animate-petal-2', rotate: 75, opacity: 0.75, type: 'cherry' },
    { id: 5, left: '62%', delay: '2.5s', size: 18, anim: 'animate-petal-1', rotate: -15, opacity: 0.8, type: 'rose' },
    { id: 6, left: '76%', delay: '5s', size: 15, anim: 'animate-petal-2', rotate: 60, opacity: 0.7, type: 'blossom' },
    { id: 7, left: '88%', delay: '1.8s', size: 19, anim: 'animate-petal-1', rotate: -45, opacity: 0.75, type: 'cherry' },
    { id: 8, left: '12%', delay: '8s', size: 16, anim: 'animate-petal-2', rotate: 30, opacity: 0.65, type: 'rose' },
    { id: 9, left: '26%', delay: '9.5s', size: 18, anim: 'animate-petal-1', rotate: -60, opacity: 0.7, type: 'blossom' },
    { id: 10, left: '42%', delay: '4.2s', size: 15, anim: 'animate-petal-2', rotate: 20, opacity: 0.8, type: 'cherry' },
    { id: 11, left: '56%', delay: '7.8s', size: 21, anim: 'animate-petal-1', rotate: 80, opacity: 0.75, type: 'rose' },
    { id: 12, left: '71%', delay: '10.5s', size: 14, anim: 'animate-petal-2', rotate: -25, opacity: 0.65, type: 'blossom' },
    { id: 13, left: '83%', delay: '12s', size: 17, anim: 'animate-petal-1', rotate: 50, opacity: 0.7, type: 'cherry' },
    { id: 14, left: '94%', delay: '7s', size: 20, anim: 'animate-petal-2', rotate: -70, opacity: 0.75, type: 'rose' },
  ];

  return (
    <div className="petal-container fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 ${p.anim}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.type === 'cherry' && (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M12 0C7 6 0 16 0 24C0 28.4 5.4 32 12 32C18.6 32 24 28.4 24 24C24 16 17 6 12 0Z"
                fill="url(#cherryGrad)"
              />
              <defs>
                <linearGradient id="cherryGrad" x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBCFE8" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 'rose' && (
            <svg
              width={p.size * 1.1}
              height={p.size * 1.1}
              viewBox="0 0 28 28"
              fill="none"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M14 2C8 2 2 8 2 14C2 20 8 26 14 26C20 26 26 20 26 14C26 8 20 2 14 2ZM14 22C9.6 22 6 18.4 6 14C6 9.6 9.6 6 14 6C18.4 6 22 9.6 22 14C22 18.4 18.4 22 14 22Z"
                fill="#FDA4AF"
                fillOpacity="0.8"
              />
              <circle cx="14" cy="14" r="5" fill="#FB7185" />
            </svg>
          )}

          {p.type === 'blossom' && (
            <span
              style={{
                fontSize: `${p.size}px`,
                filter: 'drop-shadow(0 2px 4px rgba(244,114,182,0.25))'
              }}
            >
              🌸
            </span>
          )}
        </div>
      ))}

      {/* Discreet toggle on bottom corner */}
      <button
        onClick={() => setEnabled(false)}
        className="pointer-events-auto fixed bottom-4 right-4 z-40 bg-white/90 hover:bg-pink-50 text-pink-700 border border-pink-200 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all backdrop-blur-sm cursor-pointer"
        title="Toggle floating floral petals"
      >
        <span>🌸</span>
        <span className="hidden sm:inline">Flowers: On</span>
      </button>
    </div>
  );
};

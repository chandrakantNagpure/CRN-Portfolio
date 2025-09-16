import React from 'react';

const HeroIllustration = () => {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Definitions for Gradients and Filters */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F5F5F5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#E0E0E0', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#CFD8DC', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#B0BEC5', stopOpacity: 0.8 }} />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="400" fill="url(#bgGradient)" />

      {/* Minimal Desk Setup */}
      <g transform="translate(50, 200)">
        <rect x="0" y="0" width="450" height="150" fill="#D2B48C" filter="url(#shadow)" />{' '}
        {/* Wooden desk */}
        <rect x="0" y="150" width="450" height="20" fill="#A1887F" /> {/* Desk edge */}
      </g>

      {/* Laptop on Desk */}
      <g transform="translate(150, 150)" filter="url(#shadow)">
        <rect x="0" y="0" width="200" height="120" rx="8" fill="#E0F7FA" />
        <path d="M0 120H200L190 140H10L0 120Z" fill="#B0BEC5" />
      </g>

      {/* Name Tag on Desk */}
      <rect x="70" y="360" width="60" height="20" rx="5" fill="#CFD8DC" filter="url(#shadow)" />
      <text
        x="100"
        y="375"
        fill="#607D8B"
        fontSize="12"
        textAnchor="middle"
        fontFamily="'Inter', 'Helvetica', sans-serif"
        fontWeight="600"
      >
        Chandrakant Nagpure
      </text>

      {/* Right Side Panel (Inspired by david-hckh.com) */}
      <g transform="translate(550, 20)">
        <rect
          x="0"
          y="0"
          width="30"
          height="360"
          rx="5"
          fill="url(#panelGradient)"
          filter="url(#shadow)"
        />
        {/* Social Media Icons */}
        <g transform="translate(5, 20)">
          <g className="transition-transform duration-300 hover:scale-[1.1]">
            <circle cx="10" cy="10" r="10" fill="#333" /> {/* GitHub */}
            <text
              x="10"
              y="12"
              fill="#FFF"
              fontSize="12"
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              G
            </text>
          </g>
          <g
            transform="translate(0, 30)"
            className="transition-transform duration-300 hover:scale-[1.1]"
          >
            <circle cx="10" cy="10" r="10" fill="#0077B5" /> {/* LinkedIn */}
            <text
              x="10"
              y="12"
              fill="#FFF"
              fontSize="12"
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              L
            </text>
          </g>
          <g
            transform="translate(0, 60)"
            className="transition-transform duration-300 hover:scale-[1.1]"
          >
            <circle cx="10" cy="10" r="10" fill="#1DA1F2" /> {/* Twitter */}
            <text
              x="10"
              y="12"
              fill="#FFF"
              fontSize="12"
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
            >
              T
            </text>
          </g>
        </g>
        {/* Navigation Links */}
        <g transform="translate(5, 150)">
          <text
            x="10"
            y="10"
            fill="#607D8B"
            fontSize="10"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            className="transition-transform duration-300 hover:scale-[1.05]"
          >
            Portfolio
          </text>
          <text
            x="10"
            y="30"
            fill="#607D8B"
            fontSize="10"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            className="transition-transform duration-300 hover:scale-[1.05]"
          >
            About
          </text>
          <text
            x="10"
            y="50"
            fill="#607D8B"
            fontSize="10"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            className="transition-transform duration-300 hover:scale-[1.05]"
          >
            Contact
          </text>
        </g>
      </g>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.3; }
          }
        `}
      </style>
    </svg>
  );
};

export default HeroIllustration;

/*
  Enhanced Tailwind CSS Configuration for Mystical Tarot & Numerology
  Following the golden ratio design principles with mystical theming
*/

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      // Mobile optimization utilities
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'touch-target': '44px', // Minimum touch target size
      },
      minWidth: {
        'touch-target': '44px',
      },
      // Enhanced mystical color system
      colors: {
        // Primary mystical colors - dark navy blue base
        mystical: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Deep purple accents
        cosmic: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Golden accents for mystical elements
        golden: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Pastel mystical colors
        ethereal: {
          blue: '#a5b4fc',
          pink: '#f0abfc',
          purple: '#c4b5fd',
          mint: '#86efac',
          rose: '#fda4af',
        },
        // Theme variants
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          muted: '#64748b',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          muted: '#94a3b8',
        },
        // Dashboard specific colors
        night: '#0a0a0f',
        lavender: '#a78bfa',
        gold: '#fbbf24',
        'crystal-clear': 'rgba(255, 255, 255, 0.1)',
        'text-celestial': '#e0e7ff',
        'text-mystic': '#c4b5fd',
      },
      
      // Enhanced typography with mystical fonts
      fontFamily: {
        mystical: ['Playfair Display', 'serif'], // For headings and mystical elements
        'mystic': ['Cinzel', 'serif'], // Dashboard specific font
        body: ['Inter', 'system-ui', 'sans-serif'], // For body text
        mono: ['JetBrains Mono', 'monospace'], // For code/technical elements
      },
      
      // Enhanced spacing following golden ratio
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'golden-sm': '0.618rem',
        'golden-md': '1.618rem',
        'golden-lg': '2.618rem',
        'golden-xl': '4.236rem',
      },
      
      // Enhanced mystical animations
      animation: {
        'mystical-pulse': 'mystical-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.4s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'star-pop': 'starPop 0.5s cubic-bezier(0.4,0,0.2,1)',
        'ethereal-drift': 'etherealDrift 8s ease-in-out infinite',
        'crystal-rotate': 'crystalRotate 12s linear infinite',
        'moon-phase': 'moonPhase 4s ease-in-out infinite',
        'card-flip': 'cardFlip 0.8s ease-in-out',
        'mystical-entrance': 'mysticalEntrance 1s ease-out',
      },
      
      // Enhanced keyframes for mystical effects
      keyframes: {
        'mystical-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(251, 191, 36, 0.4)',
          },
        },
        'etherealDrift': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) translateX(5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) translateX(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-15px) translateX(3px) rotate(0.5deg)' },
        },
        'crystalRotate': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'moonPhase': {
          '0%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0.6', transform: 'scale(1)' },
        },
        'cardFlip': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg) scale(1.05)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'mysticalEntrance': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.9)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        starPop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5) rotate(-10deg)' },
          '70%': { transform: 'scale(1.2) rotate(10deg)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      
      // Enhanced background images and patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mystical-pattern': 'radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.15) 1px, transparent 0)',
        'star-field': 'radial-gradient(2px 2px at 20px 30px, #fbbf24, transparent), radial-gradient(2px 2px at 40px 70px, #a855f7, transparent)',
        'ethereal-mist': 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(251, 191, 36, 0.1))',
      },
      
      // Enhanced box shadows for mystical effects
      boxShadow: {
        'mystical': '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)',
        'ethereal': '0 10px 40px rgba(168, 85, 247, 0.2), 0 0 20px rgba(251, 191, 36, 0.1)',
        'golden': '0 0 20px rgba(251, 191, 36, 0.4)',
        'cosmic': '0 0 25px rgba(168, 85, 247, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      
      // Enhanced border radius for organic feel
      borderRadius: {
        'mystical': '1.618rem', // Golden ratio
        'organic': '60% 40% 40% 20% / 70% 50% 30% 25%',
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        'mystical': '16px',
        'ethereal': '24px',
      },
    },
  },
  plugins: [],
};

export default config;

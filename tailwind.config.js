module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'luxury-light': {
          primary: '#D4AF37', // Classic Gold (Buttons, accents)
          secondary: '#64748B', // Muted Blue-Gray (Subtle text, subtitles)
          accent: '#0F4C81', // Deep Navy (Headings, highlights)
          neutral: '#0F172A', // Dark Charcoal (Main text)
          'base-100': '#F5F5F5', // Soft Ivory (Background)
        },
      },
      {
        'luxury-dark': {
          primary: '#FFD700', // Bright Gold (Buttons, accents)
          secondary: '#CBD5E1', // Light Gray-Blue (Subtitles, secondary text)
          accent: '#38BDF8', // Soft Blue (Highlights)
          neutral: '#F9FAFB', // Near White (Main text)
          'base-100': '#1B1B1B', // Very Dark (Background)
        },
      },
    ],
  },
};

import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#1D4ED8', // Blue
    secondary: '#9333EA', // Purple
    background: '#F9FAFB', // Light Gray
    text: '#111827', // Dark Gray
    border: '#E5E7EB', // Gray
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export default theme;
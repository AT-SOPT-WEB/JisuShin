import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  colors: {
    primary: '#4CAF50',
    secondary: '#F5F5F5',
    text: '#333333',
    placeholder: '#999999',
    error: '#FF0000',
    background: '#FFFFFF',
    border: '#E0E0E0',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  },
  space: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
});
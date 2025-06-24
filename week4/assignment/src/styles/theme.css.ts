import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  colors: {
    primary: '#009dda',
    secondary: '#dff2fc',
    text: '#333333',
    placeholder: '#7ecef4',
    error: '#FF6B6B',
    background: '#FFFFFF',
    border: '#bae3f9',
    accent: '#a0d2f2',
    lightBackground: '#f8fcff',
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
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  shadows: {
    small: '0 0.125rem 0.25rem rgba(0, 157, 218, 0.1)',
    medium: '0 0.25rem 0.5rem rgba(0, 157, 218, 0.15)',
    large: '0 0.5rem 1rem rgba(0, 157, 218, 0.2)',
  },
});
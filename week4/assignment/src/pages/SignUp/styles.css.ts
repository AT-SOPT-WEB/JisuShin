import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

// keyframes 정의
const fadeInAnimation = keyframes({
  from: { opacity: 0, transform: 'translateY(0.625rem)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '1.25rem',
  backgroundColor: vars.colors.lightBackground,
});

export const formContainer = style({
  width: '100%',
  maxWidth: '28.125rem',
  padding: '2.5rem',
  borderRadius: vars.borderRadius.medium,
  boxShadow: vars.shadows.medium,
  backgroundColor: vars.colors.background,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-0.313rem)',
      boxShadow: vars.shadows.large,
    },
  },
});

export const title = style({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1.875rem',
  color: vars.colors.primary,
});

export const inputGroup = style({
  marginBottom: '1.25rem',
});

export const input = style({
  width: '100%',
  padding: '0.75rem',
  borderRadius: vars.borderRadius.small,
  border: `1px solid ${vars.colors.border}`,
  fontSize: '1rem',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.colors.primary,
      boxShadow: `0 0 0 0.188rem ${vars.colors.secondary}`,
    },
  },
});

export const inputLabel = style({
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: vars.colors.text,
  display: 'block',
});

export const button = style({
  width: '100%',
  padding: '0.875rem',
  borderRadius: vars.borderRadius.small,
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  marginTop: '1.563rem',
  transition: 'all 0.3s ease',
});

export const activeButton = style({
  backgroundColor: vars.colors.primary,
  color: '#ffffff',
  selectors: {
    '&:hover': {
      backgroundColor: '#0089c1',
    },
    '&:active': {
      backgroundColor: '#007ab0',
    },
  },
});

export const disabledButton = style({
  backgroundColor: '#cccccc',
  color: '#666666',
  cursor: 'not-allowed',
  opacity: 0.7,
});

export const errorText = style({
  color: vars.colors.error,
  fontSize: vars.fontSizes.small,
  marginTop: '0.5rem',
  padding: '0.5rem',
  borderRadius: vars.borderRadius.small,
  backgroundColor: 'rgba(255, 107, 107, 0.1)',
});

export const loginLink = style({
  textAlign: 'center',
  marginTop: '1.563rem',
  fontSize: vars.fontSizes.small,
  color: vars.colors.text,
});

export const loginLinkText = style({
  color: vars.colors.primary,
  cursor: 'pointer',
  marginLeft: '0.313rem',
  fontWeight: 'bold',
  transition: 'color 0.2s ease',
  selectors: {
    '&:hover': {
      color: '#0089c1',
      textDecoration: 'underline',
    },
  },
});

export const fadeIn = style({
  animation: `${fadeInAnimation} 0.5s ease-in-out`,
});
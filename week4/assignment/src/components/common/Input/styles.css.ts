import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: vars.space.medium,
});

export const label = style({
  fontSize: vars.fontSizes.medium,
  marginBottom: vars.space.small,
  fontWeight: 'bold',
  color: vars.colors.text,
});

export const input = style({
  width: '100%',
  padding: '0.75rem',
  borderRadius: vars.borderRadius.small,
  border: `1px solid ${vars.colors.border}`,
  fontSize: vars.fontSizes.medium,
  transition: 'all 0.3s ease',
  backgroundColor: vars.colors.background,
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.primary,
    boxShadow: `0 0 0 0.188rem ${vars.colors.secondary}`,
  },
  '::placeholder': {
    color: '#aabbc8',
    opacity: 0.7,
  },
});

export const errorMessage = style({
  color: vars.colors.error,
  fontSize: vars.fontSizes.small,
  marginTop: '0.313rem',
  padding: '0.5rem',
  borderRadius: vars.borderRadius.small,
  backgroundColor: 'rgba(255, 107, 107, 0.1)',
});

export const successMessage = style({
  color: '#4CAF50',
  fontSize: vars.fontSizes.small,
  marginTop: '0.313rem',
});
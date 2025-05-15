import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

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
  maxWidth: '25rem',
  padding: '2.5rem',
  borderRadius: vars.borderRadius.medium,
  boxShadow: vars.shadows.medium,
  backgroundColor: vars.colors.background,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  ':hover': {
    transform: 'translateY(-0.313rem)',
    boxShadow: vars.shadows.large,
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
  ':focus': {
    outline: 'none',
    borderColor: vars.colors.primary,
    boxShadow: `0 0 0 0.188rem ${vars.colors.secondary}`,
  },
});

export const loginButton = style({
  backgroundColor: vars.colors.primary,
  color: '#ffffff',
  width: '100%',
  padding: '0.875rem',
  borderRadius: vars.borderRadius.small,
  cursor: 'pointer',
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  border: 'none',
  marginTop: '1.25rem',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#0089c1',
  },
  ':active': {
    backgroundColor: '#007ab0',
  },
});

export const signupText = style({
  textAlign: 'center',
  marginTop: '1.563rem',
  fontSize: vars.fontSizes.small,
  color: vars.colors.text,
});

export const signupLink = style({
  color: vars.colors.primary,
  cursor: 'pointer',
  marginLeft: '0.313rem',
  fontWeight: 'bold',
  transition: 'color 0.2s ease',
  ':hover': {
    color: '#0089c1',
    textDecoration: 'underline',
  },
});
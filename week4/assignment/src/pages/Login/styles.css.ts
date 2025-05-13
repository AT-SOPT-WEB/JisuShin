import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: '#f5f5f5',
});

export const formContainer = style({
  width: '100%',
  maxWidth: '400px',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

export const title = style({
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '30px',
});

export const inputGroup = style({
  marginBottom: '15px',
});

export const input = style({
  width: '100%',
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #e0e0e0',
  fontSize: '16px',
});

export const loginButton = style({
  backgroundColor: vars.colors.primary,
  color: '#ffffff',
  width: '100%',
  padding: '12px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  border: 'none',
  marginTop: '20px',
});

export const signupText = style({
  textAlign: 'center',
  marginTop: '20px',
  fontSize: vars.fontSizes.small,
});

export const signupLink = style({
  color: vars.colors.primary,
  cursor: 'pointer',
  marginLeft: '5px',
  ':hover': {
    textDecoration: 'underline',
  },
});
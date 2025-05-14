import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '0.75rem 1.25rem',
  borderRadius: vars.borderRadius.small,
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: 'none',
  outline: 'none',
});

export const button = styleVariants({
  primary: [
    base,
    {
      backgroundColor: vars.colors.primary,
      color: '#ffffff',
      boxShadow: '0 0.125rem 0.375rem rgba(0, 157, 218, 0.3)',
      ':hover': {
        backgroundColor: '#0089c1',
        transform: 'translateY(-0.125rem)',
        boxShadow: '0 0.25rem 0.5rem rgba(0, 157, 218, 0.4)',
      },
      ':active': {
        backgroundColor: '#007ab0',
        transform: 'translateY(0)',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 157, 218, 0.3)',
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.text,
      boxShadow: '0 0.125rem 0.375rem rgba(126, 206, 244, 0.2)',
      ':hover': {
        backgroundColor: '#cfe9f9',
        transform: 'translateY(-0.125rem)',
        boxShadow: '0 0.25rem 0.5rem rgba(126, 206, 244, 0.3)',
      },
      ':active': {
        backgroundColor: '#b8dff7',
        transform: 'translateY(0)',
        boxShadow: '0 0.125rem 0.25rem rgba(126, 206, 244, 0.2)',
      },
    },
  ],
  disabled: [
    base,
    {
      backgroundColor: '#cccccc',
      color: '#666666',
      cursor: 'not-allowed',
      boxShadow: 'none',
      opacity: 0.7,
      ':hover': {
        backgroundColor: '#cccccc',
        transform: 'none',
        boxShadow: 'none',
      },
    },
  ],
});
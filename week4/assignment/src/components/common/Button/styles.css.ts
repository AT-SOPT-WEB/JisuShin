import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '10px 15px',
  borderRadius: '5px',
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  border: 'none',
  outline: 'none',
});

export const button = styleVariants({
  primary: [
    base,
    {
      backgroundColor: vars.colors.primary,
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#3d8b3d',
      },
      ':active': {
        backgroundColor: '#2d682d',
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: vars.colors.secondary,
      color: vars.colors.text,
      ':hover': {
        backgroundColor: '#e0e0e0',
      },
      ':active': {
        backgroundColor: '#cccccc',
      },
    },
  ],
  disabled: [
    base,
    {
      backgroundColor: '#cccccc',
      color: '#666666',
      cursor: 'not-allowed',
      ':hover': {
        backgroundColor: '#cccccc',
      },
    },
  ],
});
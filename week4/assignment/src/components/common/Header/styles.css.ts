import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 20px',
  backgroundColor: vars.colors.primary,
  color: '#FFFFFF',
});

export const nav = style({
  display: 'flex',
  gap: '20px',
});

export const navItem = style({
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 0.8,
  },
});

export const activeNavItem = style({
  fontWeight: 'bold',
  borderBottom: '2px solid #FFFFFF',
});

export const userName = style({
  fontWeight: 'bold',
});
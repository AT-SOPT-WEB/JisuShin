import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.938rem 1.875rem',
  backgroundColor: vars.colors.primary,
  color: '#FFFFFF',
  boxShadow: '0 0.125rem 0.625rem rgba(0, 157, 218, 0.2)',
});

export const nav = style({
  display: 'flex',
  gap: '1.875rem',
});

export const navItem = style({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  fontWeight: '500',
  color: 'rgba(255, 255, 255, 0.85)',
  padding: '0.5rem 0',
  selectors: {
    '&:hover': {
      color: '#FFFFFF',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '0%',
      height: '0.125rem',
      backgroundColor: '#FFFFFF',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    },
  },
});

export const activeNavItem = style({
  fontWeight: 'bold',
  color: '#FFFFFF',
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '0.125rem',
      backgroundColor: '#FFFFFF',
    },
  },
});

export const userName = style({
  fontWeight: 'bold',
  padding: '0.5rem 1rem',
  borderRadius: vars.borderRadius.small,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-0.125rem)',
    },
  },
});
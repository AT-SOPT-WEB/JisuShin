import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.colors.lightBackground,
});

export const content = style({
  flex: 1,
  padding: '1.875rem',
  maxWidth: '56.25rem',
  margin: '0 auto',
  width: '100%',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.938rem 1.875rem',
  backgroundColor: vars.colors.primary,
  color: '#FFFFFF',
  boxShadow: '0 0.125rem 0.625rem rgba(0, 157, 218, 0.2)',
});

export const tabsContainer = style({
  display: 'flex',
  gap: '1.875rem',
});

export const tab = style({
  padding: '0.625rem 0',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  fontWeight: '500',
  color: 'rgba(255, 255, 255, 0.85)',
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

export const activeTab = style({
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

export const userNameContainer = style({
  fontWeight: 'bold',
  padding: '0.5rem 1rem',
  borderRadius: vars.borderRadius.small,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)',
});

export const form = style({
  backgroundColor: vars.colors.background,
  padding: '1.563rem',
  borderRadius: vars.borderRadius.medium,
  boxShadow: vars.shadows.medium,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&:hover': {
      transform: 'translateY(-0.188rem)',
      boxShadow: vars.shadows.large,
    },
  },
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
  height: '2.75rem',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.colors.primary,
      boxShadow: `0 0 0 0.188rem ${vars.colors.secondary}`,
    },
    '&::placeholder': {
      color: '#aabbc8',
      opacity: 0.7,
    },
  },
});

export const searchContainer = style({
  display: 'flex',
  marginBottom: '1.25rem',
  gap: '0.625rem',
  alignItems: 'center',
});

export const searchResultContainer = style({
  marginTop: '2.5rem',
  paddingTop: '1rem',
});

export const memberList = style({
  backgroundColor: vars.colors.background,
  borderRadius: vars.borderRadius.medium,
  boxShadow: vars.shadows.small,
  overflow: 'hidden',
  marginTop: '1rem',
});

export const memberItem = style({
  padding: '0.938rem',
  borderBottom: '1px solid #e0e0e0',
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

export const memberName = style({
  fontWeight: 'bold',
  marginBottom: '0.313rem',
});

export const actionButton = style({
  width: '6.25rem',
  flexShrink: 0,
});
import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const content = style({
  flex: 1,
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  width: '100%',
});

export const tabsContainer = style({
  display: 'flex',
  marginBottom: '20px',
});

export const tab = style({
  padding: '10px 20px',
  marginRight: '10px',
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
  transition: 'all 0.2s',
});

export const activeTab = style({
  borderBottom: `2px solid ${vars.colors.primary}`,
  color: vars.colors.primary,
  fontWeight: 'bold',
});

export const form = style({
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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

export const button = style({
  backgroundColor: vars.colors.primary,
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  border: 'none',
});

export const searchContainer = style({
  display: 'flex',
  marginBottom: '20px',
  gap: '10px',
});

export const searchButton = style({
  marginLeft: '10px',
});

export const memberList = style({
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
});

export const memberItem = style({
  padding: '15px',
  borderBottom: '1px solid #e0e0e0',
  ':last-child': {
    borderBottom: 'none',
  },
});

export const memberName = style({
  fontWeight: 'bold',
  marginBottom: '5px',
});

export const memberEmail = style({
  color: '#666666',
  fontSize: vars.fontSizes.small,
});
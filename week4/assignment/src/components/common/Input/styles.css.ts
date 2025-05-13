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
});

export const input = style({
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: `1px solid ${vars.colors.border}`,
  fontSize: vars.fontSizes.medium,
  transition: 'border-color 0.2s',
  ':focus': {
    borderColor: vars.colors.primary,
  },
});

export const errorMessage = style({
  color: vars.colors.error,
  fontSize: vars.fontSizes.small,
  marginTop: '5px',
});
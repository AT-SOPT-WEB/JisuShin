import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
  fontFamily: "'Noto Sans KR', sans-serif",
  color: vars.colors.text,
  backgroundColor: vars.colors.background,
});

globalStyle('html', {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});
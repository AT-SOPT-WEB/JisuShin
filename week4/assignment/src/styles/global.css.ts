import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
  fontFamily: "'Noto Sans KR', sans-serif",
  color: vars.colors.text,
  backgroundColor: vars.colors.lightBackground,
});

globalStyle('html', {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  color: vars.colors.primary,
  margin: '0 0 1rem 0',
});

globalStyle('a', {
  color: vars.colors.primary,
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
});

globalStyle('a:hover', {
  color: vars.colors.accent,
});

globalStyle('::placeholder', {
  color: vars.colors.placeholder,
  opacity: 0.7,
});

globalStyle('button, input, select, textarea', {
  fontFamily: "'Noto Sans KR', sans-serif",
});
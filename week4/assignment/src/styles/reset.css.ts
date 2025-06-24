import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('button', {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
});

globalStyle('input', {
  outline: 'none',
});
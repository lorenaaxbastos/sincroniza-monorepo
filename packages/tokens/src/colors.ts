export const brandColors = {
  primary: '#4a50c6',
  secondary: '#39b4af',
  tertiary: '#ff526b',
  quaternary: '#dea24f',
} as const;

export const grayColors = {
  white: '#ffffff',
  100: '#f8f9fa',
  200: '#e9ecef',
  300: '#dee2e6',
  400: '#ced4da',
  500: '#adb5bd',
  600: '#6c757d',
  700: '#495057',
  800: '#343a40',
  900: '#212529',
  black: '#000000',
} as const;

export const darkGrayColors = {
  white: '#000000',
  100: '#121214',
  200: '#1a1a1e',
  300: '#29292e',
  400: '#323238',
  500: '#6c757d',
  600: '#7c7c8a',
  700: '#8d8d99',
  800: '#c4c4cc',
  900: '#e1e1e6',
  black: '#ffffff',
} as const;

export const feedbackColors = {
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1',
} as const;

export const colors = {
  ...brandColors,
  feedback: feedbackColors,
  gray: grayColors,
  darkGray: darkGrayColors,
} as const;

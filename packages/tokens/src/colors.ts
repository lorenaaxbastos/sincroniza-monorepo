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

export const feedbackColors = {
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1',
} as const;

export const colors = {
  ...brandColors,
  gray: grayColors,
} as const;

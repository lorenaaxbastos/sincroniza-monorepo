export const durations = {
  fast: '100ms',
  base: '200ms',
  slow: '300ms',
  slowest: '400ms',
} as const;

export const easings = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

export const transitions = {
  fast: `${durations.fast} ${easings.out}`,
  base: `${durations.base} ${easings.default}`,
  smooth: `${durations.slow} ${easings.default}`,
} as const;

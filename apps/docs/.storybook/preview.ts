import type { Preview } from '@storybook/react';
import { setAriaState, toggleTheme } from '../../../packages/ui/src/utils';
import '@sincroniza/ui/styles/global.css';

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const themeBtn = target.closest<HTMLElement>('[data-theme-toggle]');

  if (themeBtn) {
    const newTheme = toggleTheme();
    const isDark = newTheme === 'dark';
    setAriaState(themeBtn, 'aria-pressed', isDark, 'data-active');
  }
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;

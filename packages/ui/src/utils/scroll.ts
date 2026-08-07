export function getScrollTarget(
  selector = '[data-scrollable]',
): HTMLElement | Window {
  if (typeof window === 'undefined') return {} as Window;

  const element = document.querySelector<HTMLElement>(selector);
  if (element) {
    const overflowY = window.getComputedStyle(element).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return element;
    }
  }
  return window;
}

export function getScrollPosition(target: HTMLElement | Window): number {
  if (target instanceof Window) {
    return window.scrollY || document.documentElement.scrollTop;
  }
  return target.scrollTop;
}

export function scrollToTop(target: HTMLElement | Window, top = 0): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';

  if (target instanceof Window) {
    window.scrollTo({ top, behavior });
  } else {
    target.scrollTo({ top, behavior });
  }
}

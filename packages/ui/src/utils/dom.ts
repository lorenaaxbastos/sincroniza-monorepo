export function toggleDataState(
  element: HTMLElement | null,
  attrName: string,
  states: [string, string],
  forceState?: string,
): string {
  if (!element) return states[1];
  const current = element.getAttribute(attrName);
  const next = forceState ?? (current === states[0] ? states[1] : states[0]);

  element.setAttribute(attrName, next);
  return next;
}

export function toggleDataFlag(
  element: HTMLElement | null,
  attrName: string,
  forceValue?: boolean,
): boolean {
  if (!element) return false;
  const hasAttr = element.hasAttribute(attrName);
  const nextValue = forceValue ?? !hasAttr;

  if (nextValue) {
    element.setAttribute(attrName, 'true');
  } else {
    element.removeAttribute(attrName);
  }
  return nextValue;
}

export function setAriaState(
  element: HTMLElement | null,
  ariaAttr: `aria-${string}`,
  value: boolean,
  flagAttr?: string,
): void {
  if (!element) return;

  element.setAttribute(ariaAttr, String(value));

  if (flagAttr) {
    toggleDataFlag(element, flagAttr, value);
  }
}

export function closeOpenElements(
  container: Document | HTMLElement = document,
): void {
  const openElements = container.querySelectorAll<HTMLElement>(
    '[data-state="open"]',
  );

  openElements.forEach((el) => {
    toggleDataState(el, 'data-state', ['open', 'closed'], 'closed');
  });

  const activeTriggers = container.querySelectorAll<HTMLElement>(
    '[data-active="true"]',
  );

  activeTriggers.forEach((trigger) => {
    setAriaState(trigger, 'aria-expanded', false, 'data-active');
  });
}

export function toggleTheme(storageKey = 'theme'): 'light' | 'dark' {
  const root = document.documentElement;
  const currentTheme =
    root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem(storageKey, nextTheme);

  return nextTheme;
}

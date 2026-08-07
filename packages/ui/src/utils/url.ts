export function isExternalUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const isAbsolute = /^(https?:)?\/\//i.test(url);
  const isSpecialProtocol = /^(mailto|tel|sms):/i.test(url);

  return isAbsolute || isSpecialProtocol;
}

export interface ExternalLinkAttributes {
  target?: string;
  rel?: string;
}

export function getLinkAttributes(
  href?: string,
  isExternalOverride?: boolean,
  target?: string,
  rel?: string,
): ExternalLinkAttributes {
  const isExternal = isExternalOverride ?? isExternalUrl(href);

  if (!isExternal) {
    return { target, rel };
  }

  return {
    target: target ?? '_blank',
    rel: rel ?? 'noopener noreferrer',
  };
}

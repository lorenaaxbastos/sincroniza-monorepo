import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getLinkAttributes, isExternalUrl } from '@/utils/url';
import styles from './Link.module.css';

export type LinkColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface'
  | 'inherit';

export type LinkSize = 'sm' | 'md' | 'lg' | 'inherit';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps extends Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'color'
> {
  /** URL de destino do link */
  href: string;
  /** Esquema de cor do link */
  color?: LinkColor;
  /** Tamanho tipográfico do link */
  size?: LinkSize;
  /** Comportamento da linha de sublinhado */
  underline?: LinkUnderline;
  /** Força a indicação de link externo (adiciona target="_blank" e rel="noopener noreferrer") */
  isExternal?: boolean;
  /** Exibe o ícone de atalho externo após o texto quando o link for externo */
  showExternalIcon?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno do link */
  children?: React.ReactNode;
}

/**
 * O `Link` é utilizado para navegação entre páginas ou recursos externos,
 * oferecendo feedback visual, suporte a acessibilidade e ícones externos automáticos.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      color = 'primary',
      size = 'inherit',
      underline = 'hover',
      isExternal,
      showExternalIcon = false,
      className = '',
      children,
      target,
      rel,
      style,
      ...rest
    },
    ref,
  ) => {
    const isAutoExternal = isExternal ?? isExternalUrl(href);
    const linkAttrs = getLinkAttributes(href, isExternal, target, rel);

    const classNames = [
      styles.link,
      styles[color],
      styles[`size-${size}`],
      styles[`underline-${underline}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a
        ref={ref}
        href={href}
        target={linkAttrs.target}
        rel={linkAttrs.rel}
        className={classNames}
        style={style}
        {...rest}
      >
        {children}
        {isAutoExternal && (
          <>
            <span className="sinc-sr-only">(abre em uma nova aba)</span>
            {showExternalIcon && (
              <ExternalLink
                className={styles.externalIcon}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </a>
    );
  },
);

Link.displayName = 'Link';

export default Link;

import React from 'react';
import { Tooltip } from '@/components/Tooltip';
import styles from './NavLink.module.css';

export type NavLinkVariant = 'block' | 'line';
export type NavLinkColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface';

export interface NavLinkProps extends Omit<
  React.ComponentPropsWithoutRef<'a'>,
  'color'
> {
  /** URL de destino do link de navegação */
  href: string;
  /** Estilo visual do link ('block' para destaque em bloco, 'line' para indicador inferior) */
  variant?: NavLinkVariant;
  /** Esquema de cores do link */
  color?: NavLinkColor;
  /** Indica se o link corresponde à rota/página atual */
  isActive?: boolean;
  /** Ícone exibido antes do rótulo */
  icon?: React.ReactNode;
  /** Rótulo/texto do link (utilizado também como fallback para o Tooltip) */
  label?: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno personalizado */
  children?: React.ReactNode;
}

/**
 * O `NavLink` é o item individual de navegação. Gerencia acessibilidade (`aria-current`),
 * ícones, estados ativos e colapso automático com Tooltip para contêineres compactos.
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      variant = 'block',
      color = 'surface',
      isActive = false,
      icon,
      label,
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const textContent =
      label ?? (typeof children === 'string' ? children : undefined);

    const classNames = [
      styles.navLink,
      styles[variant],
      styles[color],
      isActive && styles.active,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <li className={styles.item}>
        <Tooltip
          content={textContent}
          position="right"
          className={styles.tooltip}
        >
          <a
            ref={ref}
            href={href}
            className={classNames}
            aria-current={isActive ? 'page' : undefined}
            style={style}
            {...rest}
          >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{children ?? label}</span>
          </a>
        </Tooltip>
      </li>
    );
  },
);

NavLink.displayName = 'NavLink';

export default NavLink;

import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';
export type BadgeColor =
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
  | 'surface';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Estilo visual do badge */
  variant?: BadgeVariant;
  /** Cor temática do badge */
  color?: BadgeColor;
  /** Tamanho proporcional do badge (padding e tamanho de fonte) */
  size?: BadgeSize;
  /** Aplica formato de pílula totalmente arredondado */
  isPill?: boolean;
  /** Transforma o texto do badge para caixa alta (uppercase) */
  isUppercase?: boolean;
  /** Exibe um ponto indicador visual antes do conteúdo */
  hasDot?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno do badge */
  children?: React.ReactNode;
}

/**
 * O `Badge` é um componente visual utilizado para destacar status, categorias,
 * contadores ou marcadores informativos curtos.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'subtle',
      color = 'primary',
      size = 'md',
      isPill = false,
      isUppercase = false,
      hasDot = false,
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[color],
      styles[size],
      isPill && styles.pill,
      isUppercase && styles.uppercase,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} style={style} {...rest}>
        {hasDot && <span className={styles.dot} aria-hidden="true" />}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;

import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type SpinnerColor =
  | 'current'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface';

export interface SpinnerProps extends React.ComponentPropsWithRef<'div'> {
  /** Estilo visual do indicador de carregamento */
  variant?: 'circle' | 'dots' | 'ring';
  /** Tamanho do spinner (preset ou valor numérico em px) */
  size?: SpinnerSize;
  /** Cor do spinner */
  color?: SpinnerColor;
  /** Texto legível por leitores de tela */
  label?: string;
  /** Classes CSS adicionais aplicadas ao contêiner raiz (wrapper) do componente */
  className?: string;
}

const SIZE_MAP: Record<string, string> = {
  xs: '1.2rem',
  sm: '1.6rem',
  md: '2.4rem',
  lg: '3.2rem',
  xl: '4.8rem',
};

/**
 * O `Spinner` indica visualmente um estado de carregamento ou processamento em andamento na interface.
 * Suporta diferentes variantes visuais, tamanhos predefinidos ou numéricos em pixels/rem,
 * e integra-se nativamente a componentes como o `Button`.
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = 'circle',
      size = 'md',
      color = 'current',
      label = 'Carregando...',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const computedSize =
      typeof size === 'number'
        ? `${(size / 10).toString()}rem`
        : SIZE_MAP[size] || size;

    const colorClass = color !== 'current' ? styles[color] : '';

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${colorClass} ${className}`.trim()}
        style={
          {
            '--sinc-spinner-size': computedSize,
            ...style,
          } as React.CSSProperties
        }
        role="status"
        aria-live="polite"
        {...rest}
      >
        {variant === 'circle' && <div className={styles.circle} />}

        {variant === 'dots' && (
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
        )}

        {variant === 'ring' && <div className={styles.ring} />}

        <span className="sinc-sr-only">{label}</span>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;

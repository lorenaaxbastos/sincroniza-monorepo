import React from 'react';
import styles from './Separator.module.css';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SeparatorColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'light'
  | 'dark'
  | 'white'
  | 'black'
  | 'surface';
export type SeparatorSize = 'sm' | 'md' | 'lg' | number;

export interface SeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'color'
> {
  /** Orientação visual e estrutural do separador */
  orientation?: SeparatorOrientation;
  /** Se verdadeiro, oculta o elemento de leitores de tela. Se falso, aplica role="separator" */
  decorative?: boolean;
  /** Rótulo textual central exibido quando a orientação for horizontal */
  label?: React.ReactNode;
  /** Espaçamento externo (margem) vertical ou horizontal */
  spacing?: SeparatorSpacing;
  /** Esquema de cores do separador */
  color?: SeparatorColor;
  /** Espessura da linha em pixels ou preset ('sm', 'md', 'lg') */
  size?: SeparatorSize;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo personalizado para o rótulo central */
  children?: React.ReactNode;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: '1px',
  md: '2px',
  lg: '4px',
};

/**
 * O `Separator` é utilizado para criar divisões visuais ou semânticas entre seções,
 * listas ou grupos de elementos, suportando orientações horizontal e vertical e rótulos centrais.
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      decorative = true,
      label,
      spacing = 'md',
      color = 'surface',
      size = 'sm',
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const labelContent = label ?? children;
    const isHorizontal = orientation === 'horizontal';
    const hasContent = isHorizontal && Boolean(labelContent);

    const thickness =
      typeof size === 'number' ? `${String(size)}px` : SIZE_MAP[size] || '1px';

    const ariaAttrs = decorative
      ? { 'aria-hidden': 'true' as const }
      : { role: 'separator' as const, 'aria-orientation': orientation };

    const classNames = [
      styles.separator,
      styles[orientation],
      styles[`spacing-${spacing}`],
      styles[color],
      hasContent && styles.withContent,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle = {
      '--_thickness': thickness,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={classNames}
        style={customStyle}
        {...ariaAttrs}
        {...rest}
      >
        {hasContent && <span className={styles.label}>{labelContent}</span>}
      </div>
    );
  },
);

Separator.displayName = 'Separator';

export default Separator;

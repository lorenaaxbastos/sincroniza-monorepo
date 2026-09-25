import React from 'react';
import { cx } from '@/utils/cx';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Forma geométrica do placeholder visual */
  variant?: SkeletonVariant;
  /** Estilo e efeito da animação visual */
  animation?: SkeletonAnimation;
  /** Largura customizada (aceita número em px ou string com unidade CSS) */
  width?: string | number;
  /** Altura customizada (aceita número em px ou string com unidade CSS) */
  height?: string | number;
  /** Quantidade de blocos/linhas gerados em sequência automática */
  count?: number;
  /** Se verdadeiro, esconde o placeholder e revela o conteúdo interno com animação */
  isLoaded?: boolean;
  /** Texto anunciado para leitores de tela durante o estado de carregamento */
  loadingText?: string;
  /** Classes CSS adicionais para o container */
  className?: string;
  /** Conteúdo renderizado quando `isLoaded` for `true` */
  children?: React.ReactNode;
}

const formatDimension = (value?: string | number): string | undefined => {
  if (value === undefined || value === '') return undefined;
  return typeof value === 'number' ? `${String(value)}px` : value;
};

/**
 * O `Skeleton` exibe uma estrutura visual temporária que espelha o layout final
 * enquanto dados assíncronos são carregados do servidor.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      count = 1,
      isLoaded = false,
      loadingText = 'Carregando conteúdo...',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    if (isLoaded) {
      return (
        <div className={cx(styles.loadedContent, className)} style={style}>
          {children}
        </div>
      );
    }

    const formattedWidth = formatDimension(width);
    const formattedHeight = formatDimension(
      height ?? (variant === 'circular' ? width : undefined),
    );

    const rootStyle: React.CSSProperties = {
      width: formattedWidth,
      ...style,
    };

    const itemStyle: React.CSSProperties = {
      width: '100%',
      height: formattedHeight,
    };

    const skeletonClass = cx(
      styles.skeleton,
      styles[variant],
      animation !== 'none' && styles[animation],
    );

    const renderItems = () => {
      return Array.from({ length: Math.max(1, count) }).map((_, index) => (
        <span
          key={index}
          className={skeletonClass}
          style={itemStyle}
          aria-hidden="true"
        />
      ));
    };

    return (
      <div
        ref={ref}
        className={cx(styles.root, className)}
        style={rootStyle}
        aria-busy="true"
        {...props}
      >
        <span className="sinc-sr-only" role="status">
          {loadingText}
        </span>
        {renderItems()}
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';

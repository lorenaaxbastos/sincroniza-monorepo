import React from 'react';
import { cx } from '@/utils/cx';
import styles from './Progress.module.css';

export type ProgressColor =
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

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant = 'continuous' | 'segmented';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor atual do progresso */
  value?: number;
  /** Valor máximo para o cálculo da porcentagem */
  max?: number;
  /** Esquema de cores do tema ou paleta */
  color?: ProgressColor;
  /** Tamanho de altura da barra */
  size?: ProgressSize;
  /** Variante de renderização: barra contínua ou blocos segmentados */
  variant?: ProgressVariant;
  /** Quantidade de blocos no modo segmentado */
  segments?: number;
  /** Habilita a animação de carregamento contínuo sem valor fixo */
  isIndeterminate?: boolean;
  /** Rótulo exibido acima da barra de progresso */
  label?: React.ReactNode;
  /** Exibe a porcentagem exata calculada ao lado da label */
  showValueLabel?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * O `Progress` é o componente utilizado para exibir de forma visual o status de conclusão de uma tarefa, processo ou etapas de um formulário.
 * Suporta renderização contínua ou em blocos discretos (`variant="segmented"`), estados de carregamento infinito (`isIndeterminate`),
 * rótulos com cálculo automático de porcentagem e adequação a todos os esquemas de cores e tamanhos do sistema.
 * Possui suporte total a acessibilidade com a injeção automática de atributos ARIA (`role="progressbar"`, `aria-valuenow`, etc).
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      color = 'primary',
      size = 'md',
      variant = 'continuous',
      segments = 5,
      isIndeterminate = false,
      label,
      showValueLabel = false,
      className,
      ...props
    },
    ref,
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = Math.round((clampedValue / max) * 100);

    const activeSegmentsCount = Math.floor((clampedValue / max) * segments);

    const hasHeader = Boolean(label ?? showValueLabel);

    return (
      <div
        ref={ref}
        className={cx(
          styles.container,
          styles[`color-${color}`],
          styles[`size-${size}`],
          isIndeterminate && styles.isIndeterminate,
          className,
        )}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={
          isIndeterminate ? 'Carregando...' : `${String(percentage)}%`
        }
        {...props}
      >
        {hasHeader && (
          <div className={styles.header}>
            {label && <span className={styles.label}>{label}</span>}
            {showValueLabel && !isIndeterminate && (
              <span className={styles.valueLabel}>{percentage}%</span>
            )}
          </div>
        )}

        {variant === 'continuous' ? (
          <div className={styles.track}>
            <div
              className={styles.indicator}
              style={{
                width: isIndeterminate ? undefined : `${String(percentage)}%`,
              }}
            />
          </div>
        ) : (
          <div className={styles.segmentedTrack}>
            {Array.from({ length: segments }).map((_, index) => {
              const isActive = index < activeSegmentsCount;

              return (
                <div
                  key={index}
                  className={cx(
                    styles.segment,
                    isActive && styles.segmentActive,
                  )}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

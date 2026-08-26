import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import type { CardProps } from '@/components/Card';
import { cx } from '@/utils/cx';
import styles from './FlipCard.module.css';

export type FlipCardDirection = 'horizontal' | 'vertical';
export type FlipCardTrigger = 'hover' | 'click' | 'manual';

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controla o estado de rotação do cartão de forma controlada */
  isFlipped?: boolean;
  /** Estado inicial de rotação do cartão para uso não controlado */
  defaultFlipped?: boolean;
  /** Callback disparado sempre que o estado de rotação do cartão muda */
  onFlipChange?: (isFlipped: boolean) => void;
  /** Tipo de gatilho interativo para acionar a rotação ('click', 'hover' ou 'manual') */
  trigger?: FlipCardTrigger;
  /** Eixo de animação da rotação 3D ('horizontal' ou 'vertical') */
  flipDirection?: FlipCardDirection;
  /** Rótulo acessível do botão para leitores de tela e navegação via teclado no modo hover */
  flipButtonLabel?: string;
  /** Classes CSS adicionais para customização do contêiner */
  className?: string;
  /** Conteúdo interno do cartão, composto por FlipCard.Front e FlipCard.Back */
  children?: React.ReactNode;
}

export type FlipCardFaceProps = CardProps;

export const FlipCardFront = React.forwardRef<
  HTMLDivElement,
  FlipCardFaceProps
>(({ className, ...props }, ref) => (
  <Card ref={ref} className={cx(styles.front, className)} {...props} />
));
FlipCardFront.displayName = 'FlipCard.Front';

export const FlipCardBack = React.forwardRef<HTMLDivElement, FlipCardFaceProps>(
  ({ className, ...props }, ref) => (
    <Card ref={ref} className={cx(styles.back, className)} {...props} />
  ),
);
FlipCardBack.displayName = 'FlipCard.Back';

/**
 * O `FlipCard` oferece um efeito de rotação 3D interativo para revelar conteúdo secundário no verso.
 */
export const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  (
    {
      children,
      isFlipped: controlledIsFlipped,
      defaultFlipped = false,
      onFlipChange,
      trigger = 'click',
      flipDirection = 'horizontal',
      flipButtonLabel = 'Alternar visualização do cartão',
      className,
      onClick,
      onKeyDown,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledFlipped, setUncontrolledFlipped] =
      useState(defaultFlipped);
    const isControlled = controlledIsFlipped !== undefined;
    const isFlipped = isControlled ? controlledIsFlipped : uncontrolledFlipped;

    const handleFlipToggle = () => {
      const nextState = !isFlipped;
      if (!isControlled) {
        setUncontrolledFlipped(nextState);
      }
      onFlipChange?.(nextState);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (trigger === 'click') {
        handleFlipToggle();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (trigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleFlipToggle();
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(e);
      if (
        trigger === 'hover' &&
        isFlipped &&
        !e.currentTarget.contains(e.relatedTarget)
      ) {
        if (!isControlled) {
          setUncontrolledFlipped(false);
        }
        onFlipChange?.(false);
      }
    };

    const interactiveProps =
      trigger === 'click'
        ? {
            role: 'button' as const,
            tabIndex: 0,
            'aria-expanded': isFlipped,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
          }
        : {
            onClick,
            onKeyDown,
          };

    return (
      <div
        ref={ref}
        className={cx(
          styles.container,
          styles[flipDirection],
          styles[`trigger-${trigger}`],
          isFlipped && styles.isFlipped,
          className,
        )}
        onBlur={handleBlur}
        {...interactiveProps}
        {...props}
      >
        {trigger === 'hover' && (
          <Button
            className="sinc-sr-only --focusable"
            onClick={(e) => {
              e.stopPropagation();
              handleFlipToggle();
            }}
            aria-expanded={isFlipped}
          >
            {flipButtonLabel}
          </Button>
        )}

        <div className={styles.inner}>{children}</div>
      </div>
    );
  },
) as React.ForwardRefExoticComponent<
  FlipCardProps & React.RefAttributes<HTMLDivElement>
> & {
  Front: typeof FlipCardFront;
  Back: typeof FlipCardBack;
};

FlipCard.displayName = 'FlipCard';

FlipCard.Front = FlipCardFront;
FlipCard.Back = FlipCardBack;

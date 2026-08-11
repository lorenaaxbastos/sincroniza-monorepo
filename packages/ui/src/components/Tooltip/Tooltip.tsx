import React, { useId } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'center' | 'start' | 'end';

export interface TooltipProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'content'
> {
  /** Conteúdo textual ou elemento renderizado dentro do balão do tooltip */
  content?: React.ReactNode;
  /** Lado em que o tooltip se posicionará em relação ao elemento filho */
  position?: TooltipPosition;
  /** Alinhamento do tooltip em relação ao eixo da posição escolhida */
  align?: TooltipAlign;
  /** Desabilita a exibição do tooltip */
  isDisabled?: boolean;
  /** Elemento interativo gatilho que ativará a exibição do tooltip */
  children: React.ReactNode;
  /** Classes CSS adicionais aplicadas ao contêiner wrapper */
  className?: string;
}

/**
 * O `Tooltip` exibe um pequeno balão informativo quando o usuário passa o mouse
 * ou foca via teclado em um elemento interativo.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = 'top',
      align = 'center',
      isDisabled = false,
      children,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const tooltipId = useId();

    const wrapperClassNames = [
      styles.wrapper,
      isDisabled && styles.isDisabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const tooltipClassNames = [
      styles.tooltip,
      styles[position],
      styles[`align-${align}`],
    ]
      .filter(Boolean)
      .join(' ');

    const shouldRenderTooltip = !isDisabled && Boolean(content);

    return (
      <div ref={ref} className={wrapperClassNames} style={style} {...rest}>
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{
                'aria-describedby'?: string;
              }>,
              {
                'aria-describedby': shouldRenderTooltip ? tooltipId : undefined,
              },
            )
          : children}

        {shouldRenderTooltip && (
          <span id={tooltipId} className={tooltipClassNames} role="tooltip">
            {content}
          </span>
        )}
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;

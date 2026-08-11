import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button';
import {
  getScrollPosition,
  getScrollTarget,
  scrollToTop,
} from '@/utils/scroll';
import styles from './ScrollToTop.module.css';

export interface ScrollToTopProps extends Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'color'
> {
  /** Distância em pixels de rolagem necessária para exibir o botão */
  threshold?: number;
  /** Seletor CSS do contêiner com rolagem. Se omitido, utiliza a janela global (window) */
  targetSelector?: string;
  /** Rótulo acessível para leitores de tela */
  ariaLabel?: string;
  /** Tamanho do ícone em pixels */
  iconSize?: number;
  /** Permite customizar qualquer propriedade do botão base */
  buttonProps?: Partial<ButtonProps>;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * O `ScrollToTop` exibe um botão flutuante que reaparece quando a página é rolada
 * além de um limite predefinido, permitindo ao usuário retornar ao topo com um único clique.
 */
export const ScrollToTop = React.forwardRef<
  HTMLButtonElement,
  ScrollToTopProps
>(
  (
    {
      threshold = 300,
      targetSelector,
      ariaLabel = 'Voltar ao topo da página',
      iconSize = 24,
      buttonProps,
      className = '',
      style,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const scrollTarget = getScrollTarget(targetSelector);

      const handleScroll = () => {
        const currentScroll = getScrollPosition(scrollTarget);
        setIsVisible(currentScroll > threshold);
      };

      handleScroll();
      scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        scrollTarget.removeEventListener('scroll', handleScroll);
      };
    }, [threshold, targetSelector]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const scrollTarget = getScrollTarget(targetSelector);
      scrollToTop(scrollTarget);

      buttonProps?.onClick?.(e);
      onClick?.(e);
    };

    const classNames = [
      styles.scrollToTop,
      isVisible && styles.visible,
      buttonProps?.className,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Button
        ref={ref}
        variant="solid"
        color="primary"
        isIconOnly
        isPill
        aria-label={ariaLabel}
        className={classNames}
        onClick={handleClick}
        style={style}
        {...buttonProps}
        {...rest}
      >
        <ArrowUp size={iconSize} aria-hidden="true" />
      </Button>
    );
  },
);

ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop;

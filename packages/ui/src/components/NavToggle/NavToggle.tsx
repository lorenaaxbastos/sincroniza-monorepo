import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button';
import type { ButtonProps } from '@/components/Button';
import { setAriaState, toggleDataState } from '@/utils/dom';
import styles from './NavToggle.module.css';

export interface NavToggleProps extends Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'color'
> {
  /** Seletor CSS do elemento alvo que será aberto/fechado (ex: `.sinc-sidebar` ou `#menu-mobile`) */
  targetSelector?: string;
  /** Texto acessível para leitores de tela */
  ariaLabel?: string;
  /** Permite customizar qualquer propriedade do botão base */
  buttonProps?: Partial<ButtonProps>;
  /** Classes CSS adicionais aplicadas ao componente */
  className?: string;
}

/**
 * O `NavToggle` é um botão especializado para alternar a exibição de menus e painéis laterais em dispositivos móveis.
 * Permite controlar o estado de exibição do elemento alvo via manipulação direta de DOM (`data-state`) e gerencia
 * automaticamente a acessibilidade (`aria-expanded`) e a alternância de ícones (`Menu` / `X`).
 */
export const NavToggle = React.forwardRef<HTMLButtonElement, NavToggleProps>(
  (
    {
      targetSelector = '.sinc-sidebar',
      ariaLabel = 'Abrir/fechar menu de navegação',
      buttonProps,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const targetEl = document.querySelector<HTMLElement>(targetSelector);

      if (targetEl) {
        const newState = toggleDataState(targetEl, 'data-state', [
          'open',
          'closed',
        ]);
        const isOpen = newState === 'open';

        setAriaState(e.currentTarget, 'aria-expanded', isOpen, 'data-active');
      }

      buttonProps?.onClick?.(e);
      rest.onClick?.(e);
    };

    return (
      <Button
        variant="ghost"
        color="surface"
        size="md"
        isIconOnly
        ref={ref}
        className={`${styles.toggle} ${buttonProps?.className ?? ''} ${className}`.trim()}
        data-nav-toggle
        data-target={targetSelector}
        aria-label={ariaLabel}
        aria-expanded="false"
        onClick={handleClick}
        {...buttonProps}
        {...rest}
      >
        <Menu className={styles.iconMenu} size={24} />
        <X className={styles.iconClose} size={24} />
      </Button>
    );
  },
);

NavToggle.displayName = 'NavToggle';

export default NavToggle;

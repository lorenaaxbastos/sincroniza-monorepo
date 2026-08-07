import React from 'react';
import { Spinner } from '@/components/Spinner';
import { getLinkAttributes, isExternalUrl } from '@/utils/url';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost';
export type ButtonColor =
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
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonWidth = 'fit' | 'full';

interface CommonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  width?: ButtonWidth;
  isPill?: boolean;
  isUppercase?: boolean;
  isIconOnly?: boolean;
  hasShadow?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  as?: 'button' | 'a';
  children?: React.ReactNode;
  className?: string;
}

export type ButtonAsButton = CommonProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonAsAnchor = CommonProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof CommonProps> & {
    href: string;
    isExternal?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const SPINNER_SIZES: Record<ButtonSize, number | 'xs' | 'sm'> = {
  sm: 'xs',
  md: 14,
  lg: 'sm',
};

/**
 * O `Button` é o componente primário para ações e interações do usuário.
 * Suporta variações visuais, estados de carregamento integrados com o `Spinner`,
 * proporções para ícones isolados (`isIconOnly`), temas de cores e renderização polimórfica como botão (`<button>`) ou link (`<a>`).
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'solid',
    color = 'primary',
    size = 'md',
    width = 'fit',
    isPill = false,
    isUppercase = false,
    isIconOnly = false,
    hasShadow = false,
    isLoading = false,
    disabled = false,
    className = '',
    children,
    as: _as,
    ...restProps
  } = props;

  const isDisabled = disabled || isLoading;

  if ('href' in restProps && restProps.href) {
    const { href, isExternal, target, rel, ...anchorProps } =
      restProps as ButtonAsAnchor;

    const isAutoExternal = isExternal ?? isExternalUrl(href);
    const linkAttrs = getLinkAttributes(href, isExternal, target, rel);

    const classes = [
      styles.button,
      styles[variant],
      styles[color],
      styles[size],
      width === 'full' ? styles.wFull : styles.wFit,
      isPill && styles.pill,
      isUppercase && styles.uppercase,
      isIconOnly && styles.iconOnly,
      hasShadow && styles.hasShadow,
      isDisabled && styles.isDisabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={isDisabled ? undefined : href}
        target={isDisabled ? undefined : linkAttrs.target}
        rel={isDisabled ? undefined : linkAttrs.rel}
        aria-disabled={isDisabled ? 'true' : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={classes}
        {...anchorProps}
      >
        {isLoading ? (
          <>
            <span className={isIconOnly ? 'sinc-sr-only' : undefined}>
              Carregando
            </span>
            <Spinner size={SPINNER_SIZES[size]} variant="ring" />
          </>
        ) : (
          <>
            {children}
            {isAutoExternal && (
              <span className="sinc-sr-only">(abre em uma nova aba)</span>
            )}
          </>
        )}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = restProps as ButtonAsButton;

  const classes = [
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    width === 'full' ? styles.wFull : styles.wFit,
    isPill && styles.pill,
    isUppercase && styles.uppercase,
    isIconOnly && styles.iconOnly,
    hasShadow && styles.hasShadow,
    isDisabled && styles.isDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading ? 'true' : undefined}
      className={classes}
      {...buttonProps}
    >
      {isLoading ? (
        <>
          <span className={isIconOnly ? 'sinc-sr-only' : undefined}>
            Carregando
          </span>
          <Spinner size={SPINNER_SIZES[size]} variant="ring" />
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

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

export interface ButtonProps extends Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'color'
> {
  /** Estilo visual e variante de preenchimento do botão */
  variant?: ButtonVariant;
  /** Esquema de cor temática do botão */
  color?: ButtonColor;
  /** Tamanho proporcional do botão (padding e tamanho da fonte) */
  size?: ButtonSize;
  /** Comportamento de largura do botão ('fit' para ajustar ao conteúdo ou 'full' para ocupar 100%) */
  width?: ButtonWidth;
  /** Aplica bordas totalmente arredondadas em formato de pílula */
  isPill?: boolean;
  /** Transforma todo o texto do botão para caixa alta (uppercase) */
  isUppercase?: boolean;
  /** Ajusta o botão para proporção quadrada/circular ideal quando contiver apenas um ícone */
  isIconOnly?: boolean;
  /** Adiciona sombra de elevação visual ao botão */
  hasShadow?: boolean;
  /** Exibe estado de carregamento, desabilita interações e substitui o conteúdo por um Spinner */
  isLoading?: boolean;
  /** Desabilita o botão e impede interações do usuário */
  disabled?: boolean;
  /** Elemento ou tag HTML base a ser renderizada ('button' ou 'a') */
  as?: 'button' | 'a';
  /** Tipo de comportamento nativo do botão HTML ('button', 'submit' ou 'reset') */
  type?: 'button' | 'submit' | 'reset';
  /** URL de destino quando o botão é renderizado como link (`<a>`) */
  href?: string;
  /** Indica se o link é externo (adiciona target="_blank" e rel="noopener noreferrer") */
  isExternal?: boolean;
  /** Destino da navegação para links */
  target?: string;
  /** Relação do link para segurança/SEO */
  rel?: string;
  /** Classes CSS adicionais aplicadas ao elemento raiz do botão */
  className?: string;
  /** Conteúdo interno renderizado dentro do botão */
  children?: React.ReactNode;
}

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
    as,
    href,
    isExternal,
    target,
    rel,
    type = 'button',
    ...restProps
  } = props;

  const isDisabled = disabled || isLoading;
  const isLink = Boolean(href ?? as === 'a');

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

  if (isLink && href) {
    const isAutoExternal = isExternal ?? isExternalUrl(href);
    const linkAttrs = getLinkAttributes(href, isExternal, target, rel);

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={isDisabled ? undefined : href}
        target={isDisabled ? undefined : linkAttrs.target}
        rel={isDisabled ? undefined : linkAttrs.rel}
        aria-disabled={isDisabled ? 'true' : undefined}
        tabIndex={isDisabled ? -1 : undefined}
        className={classes}
        {...(restProps as React.ComponentPropsWithoutRef<'a'>)}
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

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading ? 'true' : undefined}
      className={classes}
      {...restProps}
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

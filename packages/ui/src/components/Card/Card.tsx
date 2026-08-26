import React from 'react';
import { cx } from '@/utils/cx';
import styles from './Card.module.css';

export type CardColor =
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

export type CardVariant = 'solid' | 'subtle' | 'outline';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  color?: CardColor;
  /** Imagem de fundo do Card (URL) */
  bgImage?: string;
  /** Cor de sobreposição para a imagem de fundo */
  bgOverlay?: string;
  /** Adiciona efeito de elevação e translação suave no hover */
  isHoverable?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Conteúdo interno do card */
  children?: React.ReactNode;
}

export interface CardMediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
}

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cx(styles.header, className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'Card.Header';

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cx(styles.body, className)} {...props}>
    {children}
  </div>
));
CardBody.displayName = 'Card.Body';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cx(styles.footer, className)} {...props}>
    {children}
  </div>
));
CardFooter.displayName = 'Card.Footer';

export const CardMedia = React.forwardRef<HTMLImageElement, CardMediaProps>(
  ({ className, aspectRatio = 'auto', alt = '', style, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cx(styles.media, className)}
      style={{
        ...style,
        aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
      }}
      {...props}
    />
  ),
);
CardMedia.displayName = 'Card.Media';

/**
 * O `Card` é um contêiner flexível para agrupar conteúdos e ações relacionadas em uma mesma unidade visual.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'surface',
      bgImage,
      bgOverlay,
      isHoverable = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const backgroundImage = bgImage
      ? bgOverlay
        ? `linear-gradient(${bgOverlay}, ${bgOverlay}), url('${bgImage}')`
        : `url('${bgImage}')`
      : undefined;

    return (
      <div
        ref={ref}
        className={cx(
          styles.card,
          styles[variant],
          styles[color],
          isHoverable && styles.isHoverable,
          bgImage && styles.hasBgImage,
          className,
        )}
        style={{
          ...style,
          ...(backgroundImage ? { backgroundImage } : {}),
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
) as React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Media: typeof CardMedia;
};

Card.displayName = 'Card';

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;

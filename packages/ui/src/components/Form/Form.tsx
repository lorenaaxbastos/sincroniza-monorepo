import React, { useMemo } from 'react';
import { cx } from '@/utils/cx';
import styles from './Form.module.css';
import { FormContext, useFormContext } from './FormContext';

export type FormGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FormProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> {
  /** Espaçamento vertical macro entre os elementos diretos do formulário (fieldsets, banners, ações) */
  gap?: FormGap;
  /** Estado desabilitado global para os campos do formulário */
  disabled?: boolean;
  /** Callback acionado ao submeter o formulário (executa preventDefault automaticamente) */
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
  /** Desativa as validações de balão nativas do navegador */
  noValidate?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Elementos filhos */
  children?: React.ReactNode;
}

export interface FormFieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Título semântico do grupo de campos */
  legend?: React.ReactNode;
  /** Desabilita exclusivamente este grupo de campos */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Elementos filhos (geralmente Stack, Grid ou campos isolados) */
  children?: React.ReactNode;
}

export const FormFieldset = React.forwardRef<
  HTMLFieldSetElement,
  FormFieldsetProps
>(({ legend, disabled: localDisabled, className, children, ...props }, ref) => {
  const parentContext = useFormContext();

  // Sobrescreve o disabled do pai se for passado localmente
  const disabled = localDisabled ?? parentContext.disabled ?? false;
  const contextValue = useMemo(() => ({ disabled }), [disabled]);

  return (
    <FormContext.Provider value={contextValue}>
      <fieldset
        ref={ref}
        disabled={disabled}
        className={cx(styles.fieldset, className)}
        {...props}
      >
        {legend && <legend className={styles.legend}>{legend}</legend>}
        {children}
      </fieldset>
    </FormContext.Provider>
  );
});
FormFieldset.displayName = 'Form.Fieldset';

/**
 * O `Form` é o orquestrador macro para entrada de dados.
 * Ele gerencia a submissão, a propagação do estado `disabled` e o espaçamento macro (`gap`).
 */
export const FormRoot = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      gap = 'lg',
      disabled = false,
      onSubmit,
      noValidate = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(() => ({ disabled }), [disabled]);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(e);
    };

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          noValidate={noValidate}
          onSubmit={handleSubmit}
          className={cx(styles.root, styles[`gap-${gap}`], className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
) as React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<HTMLFormElement>
> & {
  Fieldset: typeof FormFieldset;
};

FormRoot.displayName = 'Form';
FormRoot.Fieldset = FormFieldset;

export { FormRoot as Form };

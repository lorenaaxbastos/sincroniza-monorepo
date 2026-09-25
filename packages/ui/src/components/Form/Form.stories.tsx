import { useState } from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import type { FormGap, FormProps } from './Form';
import { useFormContext } from './FormContext';

type FormStoryProps = FormProps & Record<string, unknown>;

const MockInput = (
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string },
) => {
  const { disabled } = useFormContext();
  const isDisabled = disabled ?? props.disabled;

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontSize: '1.4rem',
        fontWeight: 600,
        fontFamily: 'inherit',
        color: 'var(--color-gray-800, #1e293b)',
        width: '100%',
      }}
    >
      {props.label && <span>{props.label}</span>}
      <input
        {...props}
        disabled={isDisabled}
        style={{
          width: '100%',
          padding: '0.875rem 1rem',
          fontFamily: 'inherit',
          fontSize: '1.4rem',
          borderRadius: 'var(--radii-md, 8px)',
          border: '1px solid var(--color-gray-300, #cbd5e1)',
          backgroundColor: isDisabled
            ? 'var(--color-gray-100, #f1f5f9)'
            : '#fff',
          color: 'var(--color-gray-900, #0f172a)',
          cursor: isDisabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
    </label>
  );
};

const MockButton = ({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
}) => {
  const { disabled } = useFormContext();
  const isDisabled = disabled ?? props.disabled;
  const isPrimary = variant === 'primary';

  return (
    <button
      {...props}
      disabled={isDisabled}
      style={{
        padding: '0.875rem 1.5rem',
        fontFamily: 'inherit',
        fontSize: '1.4rem',
        fontWeight: 600,
        borderRadius: 'var(--radii-md, 8px)',
        border: isPrimary ? 'none' : '1px solid var(--color-gray-300, #cbd5e1)',
        backgroundColor: isDisabled
          ? 'var(--color-gray-200, #e2e8f0)'
          : isPrimary
            ? 'var(--color-primary, #0070f3)'
            : '#fff',
        color: isDisabled
          ? 'var(--color-gray-500, #64748b)'
          : isPrimary
            ? '#fff'
            : 'var(--color-gray-800, #1e293b)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </button>
  );
};

const meta: Meta<FormStoryProps> = {
  title: 'Componentes/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <ArgTypes />
        </>
      ),
    },
  },
  args: {
    gap: 'lg',
    disabled: false,
    noValidate: true,
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { category: 'Propriedades (Props)' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    noValidate: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    onSubmit: {
      action: 'submitted',
      table: { category: 'Eventos (Actions)' },
    },
    children: { table: { category: 'Propriedades (Props)' } },
    className: { table: { category: 'Propriedades (Props)' } },
    '--sinc-form-gap': {
      control: 'text',
      description: 'Espaçamento vertical customizado do Form.',
      table: { category: 'Variáveis CSS' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: (args) => (
    <Form {...args} style={{ maxWidth: '520px' }}>
      <Form.Fieldset legend="Informações básicas">
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <MockInput
            label="E-mail"
            type="email"
            placeholder="nome@empresa.com"
          />
          <MockInput label="Senha" type="password" placeholder="••••••••" />
        </div>
      </Form.Fieldset>

      <MockButton type="submit">Entrar</MockButton>
    </Form>
  ),
};

export const TodasAsVariacoesDeGap: Story = {
  name: 'Gaps',
  render: (args) => {
    const gaps: FormGap[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          maxWidth: '580px',
        }}
      >
        {gaps.map((gapValue) => (
          <div key={gapValue}>
            <span
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--color-gray-500, #64748b)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              gap={gapValue}
            </span>
            <Form
              {...args}
              gap={gapValue}
              style={{
                border: '1px dashed var(--color-gray-300, #cbd5e1)',
                padding: '1.5rem',
                borderRadius: '8px',
                marginTop: '0.5rem',
              }}
            >
              <Form.Fieldset legend={`Bloco A`}>
                <MockInput
                  label="Campo principal"
                  placeholder="Digite algo..."
                />
              </Form.Fieldset>

              <Form.Fieldset legend={`Bloco B`}>
                <MockInput
                  label="Campo secundário"
                  placeholder="Digite algo..."
                />
              </Form.Fieldset>

              <MockButton type="submit">Ação do Formulário</MockButton>
            </Form>
          </div>
        ))}
      </div>
    );
  },
};

export const EstadoDesabilitado: Story = {
  name: 'Estado Desabilitado',
  args: { disabled: true },
  render: (args) => (
    <Form {...args} style={{ maxWidth: '520px' }}>
      <Form.Fieldset legend="Somente leitura">
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <MockInput label="Usuário" defaultValue="admin123" />
          <MockInput label="Cargo" defaultValue="Gerente" />
        </div>
      </Form.Fieldset>
      <MockButton type="submit">Salvar alterações</MockButton>
    </Form>
  ),
};

const FormFeedbackMock = (args: FormStoryProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    args.onSubmit?.(e);
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 1000);
  };

  return (
    <Form
      {...args}
      disabled={loading}
      onSubmit={handleSubmit}
      style={{ maxWidth: '520px' }}
    >
      {error && (
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '1.4rem',
            fontFamily: 'inherit',
          }}
        >
          <strong>Erro do servidor:</strong> não foi possível processar seu
          formulário.
        </div>
      )}
      <Form.Fieldset legend="Criar conta">
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <MockInput label="E-mail" placeholder="usuario@email.com" />
        </div>
      </Form.Fieldset>
      <MockButton type="submit">
        {loading ? 'Processando...' : 'Cadastrar'}
      </MockButton>
    </Form>
  );
};

export const FeedbackEAssincrono: Story = {
  name: 'Loading E Feedback Macro',
  render: (args) => <FormFeedbackMock {...args} />,
};

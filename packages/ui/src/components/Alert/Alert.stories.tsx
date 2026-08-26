import React from 'react';
import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { BellRing } from 'lucide-react';
import { type CardVariant } from '../Card';
import { Alert } from './Alert';
import type { AlertProps, AlertStatus } from './Alert';

type AlertStoryProps = AlertProps & Record<string, unknown>;

const meta: Meta<AlertStoryProps> = {
  title: 'Componentes/Alert',
  component: Alert,
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
    status: 'info',
    variant: 'subtle',
    title: 'Atualização do sistema',
    children: 'Novas funcionalidades foram adicionadas à plataforma.',
    isDismissible: false,
    disableExitAnimation: false,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      table: { category: 'Propriedades (Props)' },
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
      table: { category: 'Propriedades (Props)' },
    },
    title: { control: 'text', table: { category: 'Propriedades (Props)' } },
    children: { control: 'text', table: { category: 'Propriedades (Props)' } },
    isDismissible: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    disableExitAnimation: {
      control: 'boolean',
      table: { category: 'Propriedades (Props)' },
    },
    icon: {
      control: 'boolean',
      description: 'Passe `false` ou `""` para esconder, ou passe um nó React.',
      table: { category: 'Propriedades (Props)' },
    },
    onClose: { table: { disable: true } },
    className: { table: { category: 'Propriedades (Props)' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StoryRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
      width: '100%',
    }}
  >
    <span
      style={{
        fontSize: 'var(--font-size-xs, 1.2rem)',
        fontFamily: 'monospace',
        color: 'var(--color-gray-500)',
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

export const Padrão: Story = {};

export const Status: Story = {
  render: () => {
    const statuses: AlertStatus[] = ['info', 'success', 'warning', 'error'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          maxWidth: '60rem',
        }}
      >
        {statuses.map((s) => (
          <StoryRow key={s} label={`status="${s}"`}>
            <Alert status={s} title={`Este é um alerta de ${s}`}>
              Descrição padrão explicando os detalhes para o usuário sobre o
              evento ocorrido.
            </Alert>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const Variantes: Story = {
  render: () => {
    const variants: CardVariant[] = ['subtle', 'solid', 'outline'];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          maxWidth: '60rem',
        }}
      >
        {variants.map((v) => (
          <StoryRow key={v} label={`variant="${v}"`}>
            <Alert variant={v} status="info" title={`Variante ${v}`}>
              Os alertas herdam as variantes de preenchimento do componente
              Card.
            </Alert>
          </StoryRow>
        ))}
      </div>
    );
  },
};

export const CustomizacaoDeIcone: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.6rem',
        maxWidth: '60rem',
      }}
    >
      <StoryRow label="icon={<BellRing /> (Customizado)">
        <Alert
          status="info"
          title="Nova notificação"
          icon={<BellRing size={20} />}
        >
          Você tem mensagens não lidas no sistema.
        </Alert>
      </StoryRow>

      <StoryRow label="icon={false} (Sem Ícone)">
        <Alert status="success" title="Salvo com sucesso" icon={false}>
          Suas configurações foram atualizadas. O layout se reajusta
          automaticamente sem o ícone.
        </Alert>
      </StoryRow>
    </div>
  ),
};

export const ApenasTitulo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.6rem',
        maxWidth: '60rem',
      }}
    >
      <StoryRow label="Sem a prop children">
        <Alert status="error" title="A conexão com o servidor foi perdida." />
      </StoryRow>
      <StoryRow label="Sem children e sem ícone">
        <Alert
          status="warning"
          title="Sua sessão expira em 5 minutos."
          icon={false}
        />
      </StoryRow>
    </div>
  ),
};

export const Descartavel: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.6rem',
        maxWidth: '60rem',
      }}
    >
      <StoryRow label="isDismissible={true}">
        <Alert status="info" title="Alerta com opção de fechar" isDismissible>
          Exibe o botão de fechar no canto superior direito e dispara a animação
          suave de saída ao ser desativado.
        </Alert>
      </StoryRow>

      <StoryRow label="isDismissible={false}">
        <Alert
          status="info"
          title="Alerta permanente (padrão)"
          isDismissible={false}
        >
          Não exibe o botão de fechar. Indicado para avisos do sistema que devem
          permanecer fixos até que a situação seja resolvida.
        </Alert>
      </StoryRow>
    </div>
  ),
};

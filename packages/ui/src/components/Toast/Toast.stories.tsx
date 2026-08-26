import { ArgTypes, Description, Title } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';
import { Toast } from './Toast';
import type { ToastProps } from './Toast';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

type ToastStoryProps = ToastProps & Record<string, unknown>;

/**
 * O `Toast` é o componente de notificação flutuante temporária para feedback de ações do usuário.
 * Renderiza internamente uma barra de tempo linear que congela instantaneamente no `hover`,
 * eleva a notificação com sombras marcantes (`shadow-lg`) e é gerenciado globalmente via `ToastProvider` e `useToast()`.
 */
const meta: Meta<ToastStoryProps> = {
  title: 'Componentes/Toast',
  component: Toast,
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
    status: 'success',
    variant: 'solid',
    title: 'Ação concluída',
    children: 'Seus dados foram atualizados com sucesso no servidor.',
    duration: 5000,
    isDismissible: true,
  },
  argTypes: {
    duration: {
      control: 'number',
      description: 'Duração em ms antes do autodescarte (passe 0 para fixar)',
      table: { category: 'Propriedades (Toast)' },
    },
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'O estado semântico do alerta (define cor e ícone padrão)',
      table: { category: 'Propriedades (Alert)' },
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
      description: 'Variante visual de preenchimento (herda do Card)',
      table: { category: 'Propriedades (Alert)' },
    },
    title: {
      control: 'text',
      description: 'Título em destaque do alerta',
      table: { category: 'Propriedades (Alert)' },
    },
    children: {
      control: 'text',
      description: 'Conteúdo detalhado da mensagem',
      table: { category: 'Propriedades (Alert)' },
    },
    isDismissible: {
      control: 'boolean',
      description: 'Habilita o botão de fechar o alerta',
      table: { category: 'Propriedades (Alert)' },
    },
    icon: {
      control: 'boolean',
      description:
        'Substitui o ícone padrão. Passe `false`, `null` ou `""` para ocultar.',
      table: { category: 'Propriedades (Alert)' },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
      table: { category: 'Propriedades (Alert)' },
    },
    id: { table: { disable: true } },
    isExiting: { table: { disable: true } },
    disableExitAnimation: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponenteIsolado: Story = {};

const ToastDemoControls = () => {
  const { toastSuccess, toastError, toastWarning, toastInfo, dismissAll } =
    useToast();

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button
        color="success"
        onClick={() =>
          toastSuccess({
            title: 'Salvo com sucesso!',
            children: 'Passe o mouse por cima do Toast para congelar o tempo.',
          })
        }
      >
        Toast Sucesso
      </Button>

      <Button
        color="error"
        onClick={() =>
          toastError({
            title: 'Erro na requisição',
            children: 'Não foi possível conectar ao banco de dados.',
          })
        }
      >
        Toast Erro
      </Button>

      <Button
        color="warning"
        onClick={() =>
          toastWarning({
            title: 'Sessão expirando',
            children: 'Sua sessão irá expirar em 2 minutos.',
          })
        }
      >
        Toast Aviso
      </Button>

      <Button
        color="info"
        onClick={() =>
          toastInfo({
            title: 'Nova atualização',
            children: 'Uma nova versão da plataforma está disponível.',
          })
        }
      >
        Toast Info
      </Button>

      <Button variant="outline" color="dark" onClick={dismissAll}>
        Limpar Todos
      </Button>
    </div>
  );
};

export const SistemaGlobalContext: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemoControls />
    </ToastProvider>
  ),
};

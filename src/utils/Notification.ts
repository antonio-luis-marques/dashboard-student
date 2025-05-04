import { Notification } from "@/types/Notification";

export const notifications: Notification[] = [
    {
      id: '1',
      date: '2025-01-01',
      title: 'Pagamento Recebido',
      description: 'Pagamento recebido com sucesso.',
      status: 'success',
    },
    {
      id: '2',
      date: '2025-01-01',
      title: 'Erro na Transação',
      description: 'Ocorreu um erro ao processar sua transação.',
      status: 'error',
    },
    {
      id: '3',
      date: '2025-01-01',
      title: 'Fatura Gerada',
      description: 'Sua nova fatura foi gerada.',
      status: 'info',
    },
  ];
  
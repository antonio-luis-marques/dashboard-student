import { Transaction } from "@/types/Transacton";

export const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-01 10:00',
      status: 'Completo',
      paymentMethod: 'Pix',
      value: 100.0,
      fee: 2.0,
      client: 'João Silva',
      email: 'joao@gmail.com',
      contact: '123456789',
      type: 'Venda',
      notes: 'Pagamento rápido',
    },
    {
      id: '2',
      date: '2024-01-02 15:30',
      status: 'Pendente',
      paymentMethod: 'Cartão',
      value: 200.0,
      fee: 5.0,
      client: null,
      type: 'Venda',
    },
  ];
export type Transaction = {
  id: string;
  date: string; // Formato ISO: YYYY-MM-DD HH:mm
  status: 'Pendente' | 'Completo' | 'Falhou';
  paymentMethod: 'Cartão' | 'Pix' | 'Transferência';
  value: number;
  fee: number;
  client: string | null;
  email?: string; 
  contact?: string; 
  type: 'Venda' | 'Reembolso';
  notes?: string; 
};

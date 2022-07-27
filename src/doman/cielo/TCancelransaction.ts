export type TCancelransaction = {
  nameConnection: string;
  tid?: string;
  paymentId?: string;
  merchantOrderId?: string;
  amount: number;
};

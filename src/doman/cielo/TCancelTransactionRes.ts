export type TCancelTransactionRes = {
  err?: boolean;
  merchantOrderId?: string;
  paymentId?: string;
  tid?: string;
  amount: number;
  authorizationCode?: string;
  returnCode: string;
  returnMessage: string;
  proofOfSale: string;
};

import { EnumCieloTypeTransaction } from "./EnumCieloTypeTransaction";

export type TPayNowRes = {
  err?: boolean;
  merchantOrderId: string;
  tid: string;
  paymentId: string;
  returnCode: string;
  returnMessage: string;
  authorizationCode?: string;
  provider: string;
  receivedDate: Date;
  type: EnumCieloTypeTransaction;
  amount: number;
};

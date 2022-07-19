import { TCustomer } from "../../../doman/cielo/TCustomer";
import { TPayment } from "../../../doman/cielo/TPayment";
import { TErrorGeneric } from "../../../doman";
import PaymentCieloService from "../../../services/paymentCieloService";

export interface TCreditPayReq {
  nameConnection: string;
  merchantOrderId: String;
  customer: TCustomer;
  payment: TPayment;
}

export interface TCreditPayRes {
  merchantOrderId: String;
  customer: TCustomer;
  payment: TPayment;
}

export async function creditPay(
  requestData: TCreditPayReq
): Promise<TCreditPayRes | TErrorGeneric> {
  const paymentCieloService = new PaymentCieloService();
  return await paymentCieloService.payNow(requestData);
}

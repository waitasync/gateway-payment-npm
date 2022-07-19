import { TCustomer } from "../../../doman/cielo/TCustomer";
import { TPayment } from "../../../doman/cielo/TPayment";
import { TErrorGeneric } from "../../../doman";
import PaymentCieloService from "../../../services/paymentCieloService";

export interface TCreditPayReq {
  MerchantOrderId: String;
  Customer: TCustomer;
  Payment: TPayment;
}

export interface TCreditPayRes {
  MerchantOrderId: String;
  Customer: TCustomer;
  Payment: TPayment;
}

export async function creditPay(
  requestData: TCreditPayReq
): Promise<TCreditPayRes | TErrorGeneric> {
  const paymentCieloService = new PaymentCieloService();
  return await paymentCieloService.payNow(requestData);
}

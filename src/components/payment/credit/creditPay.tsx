import { TCieloCreditPay, TCieloCustomer, TCieloPayment } from "../../../doman";
import { TErrorGeneric } from "../../../doman";
import { CieloService } from "../../../services/cieloService";

export interface TCreditPayReq {
  nameConnection: string;
  data: TCieloCreditPay;
}

export interface TCreditPayRes {
  merchantOrderId: string;
  customer: TCieloCustomer;
  payment: TCieloPayment;
}

export async function creditPay(
  payload: TCreditPayReq
): Promise<TCreditPayRes | TErrorGeneric> {
  const paymentCieloService = new CieloService();
  return paymentCieloService.credit.payNow(payload);
}

import {
  TCieloCreditPay,
  TCieloCustomer,
  TCieloPayment,
  TCredentials,
} from "../../../doman";

import { TTypeConnectionEnum } from "../../../doman/TTypeConnectionEnum";
import { PaymentConfigService } from "../../../services";
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

export async function creditPay(payload: TCreditPayReq) {
  const paymentConfig: TCredentials = await PaymentConfigService.getConnection(
    payload.nameConnection
  );

  if (paymentConfig.type == TTypeConnectionEnum.Cielo) {
    const paymentCieloService = new CieloService();
    return paymentCieloService.credit.payNow(payload);
  }

  return {
    err: true,
    message: "undefined",
  };
}

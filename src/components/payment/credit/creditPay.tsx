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
  merchantOrderId: string; // Numero de identificação do Pedido.
  customer: TCieloCustomer;
  payment: TCieloPayment;
}

export async function creditPay(payload: TCreditPayReq) {
  try {
    const paymentConfig: TCredentials =
      await PaymentConfigService.getConnection(payload.nameConnection);

    if (paymentConfig.type == TTypeConnectionEnum.Cielo) {
      if (!payload.data.payment?.capture) {
        payload.data.payment.capture = true;
      }

      const amount = Number(payload.data.payment.amount) * 100;
      payload.data.payment.amount = amount;

      console.log(777, "cielo", payload);
      const paymentCieloService = new CieloService();
      return paymentCieloService.credit.payNow(payload);
    }

    return {
      err: true,
      message: "undefined",
    };
  } catch (error) {
    console.log(444, error);
  }
}

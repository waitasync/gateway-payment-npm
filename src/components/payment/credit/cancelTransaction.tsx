import { TCredentials } from "../../../doman";

import { TTypeConnectionEnum } from "../../../doman/TTypeConnectionEnum";
import { PaymentConfigService } from "../../../services";
import { CieloService } from "../../../services/cieloService";

export interface TCancelTransactionReq {
  nameConnection: string;
  data: {
    paymentId?: string;
    merchantOrderId?: string;
    amount: number;
  };
}

export async function cancelTransaction(payload: TCancelTransactionReq) {
  try {
    const paymentConfig: TCredentials =
      await PaymentConfigService.getConnection(payload.nameConnection);

    switch (paymentConfig.type) {
      case TTypeConnectionEnum.Cielo:
        const paymentCieloService = new CieloService();
        return paymentCieloService.credit.cancelTransaction({
          ...payload,
          ...payload.data,
        });

      default:
        return {
          err: true,
          message: "undefined",
        };
    }
  } catch (error) {
    console.log(444, error);
  }
}

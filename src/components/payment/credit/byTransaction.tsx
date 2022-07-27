import { TCredentials } from "../../../doman";

import { TTypeConnectionEnum } from "../../../doman/TTypeConnectionEnum";
import { PaymentConfigService } from "../../../services";
import { CieloService } from "../../../services/cieloService";

export interface TByTransactionReq {
  nameConnection: string;
  data: {
    paymentId?: string;
    tid?: string;
  };
}

export async function byTransaction(payload: TByTransactionReq) {
  try {
    const paymentConfig: TCredentials =
      await PaymentConfigService.getConnection(payload.nameConnection);

    switch (paymentConfig.type) {
      case TTypeConnectionEnum.Cielo:
        const paymentCieloService = new CieloService();
        return paymentCieloService.credit.checkedByTransaction({
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

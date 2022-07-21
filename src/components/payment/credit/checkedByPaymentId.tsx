import { TCheckedByPaymentId, TCredentials } from "../../../doman";

import { TTypeConnectionEnum } from "../../../doman/TTypeConnectionEnum";
import { PaymentConfigService } from "../../../services";
import { CieloService } from "../../../services/cieloService";

export interface TCheckedByPaymentIdReq {
  nameConnection: string;
  data: { paymentId: string };
}

export async function checkedByPaymentId(payload: TCheckedByPaymentIdReq) {
  try {
    const paymentConfig: TCredentials =
      await PaymentConfigService.getConnection(payload.nameConnection);

    if (paymentConfig.type == TTypeConnectionEnum.Cielo) {
      const paymentCieloService = new CieloService();
      return paymentCieloService.credit.checkedByPaymentId({
        ...payload,
        paymentId: payload.data.paymentId,
      });
    }

    return {
      err: true,
      message: "undefined",
    };
  } catch (error) {
    console.log(444, error);
  }
}

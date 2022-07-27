import {
  TCieloCard,
  TCieloCreditCard,
  TCredentials,
  TTypeConnectionEnum,
} from "../../../doman";
import { CieloService, PaymentConfigService } from "../../../services";

export interface TCardTokenizedAddReq {
  nameConnection: string;
  data: TCieloCard;
}

export interface TcardTokenizedAddRes {
  merchantOrderId: string;
  card: TCieloCreditCard;
}

export async function cardTokenizedAdd(payload: TCardTokenizedAddReq) {
  try {
    const paymentConfig: TCredentials =
      await PaymentConfigService.getConnection(payload.nameConnection);

    switch (paymentConfig.type) {
      case TTypeConnectionEnum.Cielo:
        const paymentCieloService = new CieloService();
        return paymentCieloService.card.add({
          ...payload,
          card: {
            customerName: payload.data?.customerName,
            cardNumber: payload.data?.cardNumber,
            expirationDate: payload.data?.expirationDate,
            brand: payload.data?.brand,
            holder: payload.data?.holder,
          },
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

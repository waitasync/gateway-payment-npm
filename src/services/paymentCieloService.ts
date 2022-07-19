import { TCreditPayProps } from "../doman/cielo/TCreditPayProps";
import { TErrorGeneric } from "../doman/TErrorGeneric";

export default class PaymentCieloService {
  public paymentCielo() {}

  payNow(payload: TCreditPayProps): TErrorGeneric {
    return { message: "teste" };
  }

  refund(payload: TCreditPayProps): TErrorGeneric {
    return { message: "teste" };
  }
}

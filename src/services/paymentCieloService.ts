import { TPaymentConfigProps } from "../doman";
import { TCreditPayProps } from "../doman/cielo/TCreditPayProps";
import { TErrorGeneric } from "../doman/TErrorGeneric";

export class PaymentCieloService {
  constructor(paymentConfig: TPaymentConfigProps) {}

  payNow(payload: TCreditPayProps): TErrorGeneric {
    return { message: "teste" };
  }

  refund(payload: TCreditPayProps): TErrorGeneric {
    return { message: "teste" };
  }
}

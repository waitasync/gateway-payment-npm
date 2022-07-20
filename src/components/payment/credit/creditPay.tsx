import { TCustomer } from "../../../doman/cielo/TCustomer";
import { TPayment } from "../../../doman/cielo/TPayment";
import { TErrorGeneric, TPaymentConfigProps } from "../../../doman";
import { PaymentConfigService, PaymentCieloService } from "../../../services";

export interface TCreditPayReq {
  nameConnection: string;
  merchantOrderId: String;
  customer: TCustomer;
  payment: TPayment;
}

export interface TCreditPayRes {
  merchantOrderId: String;
  customer: TCustomer;
  payment: TPayment;
}

export async function creditPay(
  requestData: TCreditPayReq
): Promise<TCreditPayRes | TErrorGeneric> {
  const resPaymentConfig: any = await PaymentConfigService.getConnection(
    requestData?.nameConnection
  );

  if (resPaymentConfig?.err) {
    return resPaymentConfig;
  }

  const PaymentConfigProps: TPaymentConfigProps = resPaymentConfig;
  const paymentCieloService = new PaymentCieloService(PaymentConfigProps);
  return await paymentCieloService.payNow(requestData);
}

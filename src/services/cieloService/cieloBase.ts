import { TPaymentConfigProps } from "../../doman";
import { PaymentConfigService } from "../paymentConfigService";

export class CieloBase {
  paymentConfig?: TPaymentConfigProps;
  errorMessageConnection: string | undefined;

  async getConnection(name: string) {
    this.paymentConfig = await PaymentConfigService.getConnection(name);
    this.errorMessageConnection = this.paymentConfig?.message || "";
    return this.paymentConfig.err;
  }
}

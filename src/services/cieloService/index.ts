import { TErrorGeneric, TPaymentConfigProps } from "../../doman";
import { CieloCardService } from "./cieloCardService";
import { CieloCreditService } from "./cieloCreditService";

export class CieloService {
  paymentConfig: Promise<TPaymentConfigProps | TErrorGeneric> | undefined;
  card: CieloCardService;
  credit: CieloCreditService;

  constructor() {
    this.card = new CieloCardService();
    this.credit = new CieloCreditService();
  }
}

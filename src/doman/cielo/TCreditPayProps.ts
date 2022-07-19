import { TCustomer } from "./TCustomer";
import { TPayment } from "./TPayment";

export type TCreditPayProps = {
  MerchantOrderId: String;
  Customer: TCustomer;
  Payment: TPayment;
};

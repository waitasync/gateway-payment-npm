import { TCustomer } from "./TCustomer";
import { TPayment } from "./TPayment";

export type TCreditPayProps = {
  nameConnection: String;
  merchantOrderId: String;
  customer: TCustomer;
  payment: TPayment;
};

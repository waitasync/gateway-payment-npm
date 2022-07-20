import { TCieloCustomer } from "./TCieloCustomer";
import { TCieloPayment } from "./TCieloPayment";

export type TCieloCreditPay = {
  merchantOrderId: string;
  customer: TCieloCustomer;
  payment: TCieloPayment;
};

import { TCieloCustomer } from "./TCieloCustomer";
import { TCieloPayment } from "./TCieloPayment";

export type TCieloCreditPay = {
  merchantOrderId: string; // is required
  customer: TCieloCustomer;
  payment: TCieloPayment;
};

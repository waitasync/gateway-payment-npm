import PaymentConfig from "../../../services/paymentConfig";

export interface payDebitProps {
  teste?: boolean;
  data: String;
}

export const payDebit = async (payload: payDebitProps) => {
  return await PaymentConfig.getKey();
};

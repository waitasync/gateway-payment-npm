import PaymentConfig from "../../services/paymentConfig";

export interface setCredentialsProps {
  urlTransaction?: String;
  urlQuery: String;
  id: String;
  key: String;
}

export const setCredentials = async (payload: setCredentialsProps) => {
  return await PaymentConfig.setConfig(payload);
};

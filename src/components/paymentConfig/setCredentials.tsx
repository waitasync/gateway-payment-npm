import { TCredentials } from "../../doman";
import { PaymentConfigService } from "../../services";

export { TCredentials };

export const setCredentials = async (payload: Array<TCredentials>) => {
  return await PaymentConfigService.setConfig(payload);
};

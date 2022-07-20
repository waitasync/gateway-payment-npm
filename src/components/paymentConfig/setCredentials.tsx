import { TTypeConnectionEnum } from "../../doman/TTypeConnectionEnum";
import { PaymentConfigService } from "../../services";
export interface setCredentialsProps {
  name: String;
  type: TTypeConnectionEnum;
  urlTransaction?: String;
  urlQuery?: String;
  id?: String;
  key?: String;
}

export const setCredentials = async (payload: Array<setCredentialsProps>) => {
  return await PaymentConfigService.setConfig(payload);
};

import { TTypeConnectionEnum } from "./TTypeConnectionEnum";

export type TPaymentConfigProps = {
  name?: String;
  type?: TTypeConnectionEnum;
  urlTransaction?: String;
  urlQuery?: String;
  id?: String;
  key?: String;
  err?: boolean;
  message?: string;
  data?: any;
};

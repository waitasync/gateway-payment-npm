import { TTypeConnectionEnum } from "./TTypeConnectionEnum";

export type TCredentials = {
  name?: string;
  type?: TTypeConnectionEnum;
  urlTransaction?: string;
  urlQuery?: string;
  id?: string;
  key?: string;
  err?: boolean;
  message?: string;
  data?: any;
};

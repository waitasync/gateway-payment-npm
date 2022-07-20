import { EnumMethodHttp } from "../enums/EnumMethodHttp";
import { AxiosRequestHeaders } from "axios";

export type IHttpRequestOptions = {
  method: EnumMethodHttp;
  path: string;
  hostname: string;
  encoding: string;
  port: number;
  timeout?: number;
  headers?: any;
  [x: string]: any;
};

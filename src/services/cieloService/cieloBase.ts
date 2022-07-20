import {
  IHttpRequestOptions,
  TCieloCreditPay,
  TErrorGeneric,
  TCredentials,
} from "../../doman";
import { PaymentConfigService } from "../paymentConfigService";
import httpAxios from "../../services/http.axios";
import { EnumMethodHttp } from "../../doman/enums/EnumMethodHttp";

export class CieloBase {
  paymentConfig?: TCredentials;
  errorMessageConnection: string | undefined;

  public async checkConnection(name: string) {
    this.paymentConfig = await PaymentConfigService.getConnection(name);
    this.errorMessageConnection = this.paymentConfig?.message || "";
    return this.paymentConfig.err;
  }

  private getHttpRequestOptions(params: {
    method: EnumMethodHttp;
    hostname: string;
    path: string;
    notContentType?: boolean;
  }): IHttpRequestOptions {
    return {
      method: params.method,
      path: params.path,
      hostname: params.hostname,
      port: 443,
      encoding: "utf-8",
      timeout: 3000,
      headers: {
        MerchantId: this.paymentConfig?.id,
        MerchantKey: this.paymentConfig?.key,
        ...(params?.notContentType == true
          ? {}
          : { "Content-Type": "application/json" }),
      },
    } as IHttpRequestOptions;
  }

  public async post<D, R>(
    params: { path: string },
    data?: D
  ): Promise<R | TErrorGeneric> {
    const options: IHttpRequestOptions = this.getHttpRequestOptions({
      method: EnumMethodHttp.POST,
      path: params?.path,
      hostname: this.paymentConfig?.urlTransaction || "",
    });
    return await httpAxios({ data, options });
  }

  public async get<R>(params: {
    path: string;
    notContentType?: boolean;
  }): Promise<R | TErrorGeneric> {
    const hostname: String | any = this.paymentConfig?.urlQuery;
    const { path, notContentType } = params;
    const method = EnumMethodHttp.GET;
    const options: IHttpRequestOptions = this.getHttpRequestOptions({
      path,
      hostname,
      method,
      notContentType: notContentType || false,
    });

    return await httpAxios({ options });
  }

  public async put<D, R>(
    params: { path: string },
    data?: D
  ): Promise<R | TErrorGeneric> {
    const { path } = params;
    const hostname: String | any = this.paymentConfig?.urlQuery;
    const options: IHttpRequestOptions = this.getHttpRequestOptions({
      method: EnumMethodHttp.PUT,
      path,
      hostname,
    });
    return await httpAxios({ data, options });
  }
}

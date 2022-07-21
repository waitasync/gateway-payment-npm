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
  errorMessageConnection: string | undefined;
  paymentConfig: TCredentials | undefined;

  public async checkConnection(name: string) {
    this.paymentConfig = await PaymentConfigService.getConnection(name);
    this.errorMessageConnection = this.paymentConfig?.message || "";
    console.log("checkConnection", this.paymentConfig);
    return !this.paymentConfig?.err;
  }

  private getHttpRequestOptions(params: {
    method: EnumMethodHttp;
    hostname: string;
    path: string;
    notContentType?: boolean;
  }): IHttpRequestOptions {
    const opt = {
      method: params.method,
      path: params.path,
      hostname: params.hostname,
      // encoding: "utf-8",
      // timeout: 3000,
      headers: {
        merchantId: this.paymentConfig?.id || "merchantId not found",
        merchantKey: this.paymentConfig?.key || "merchantKey not found",
        ...(params?.notContentType == true
          ? {}
          : { "Content-Type": "application/json" }),
      },
    };

    return opt;
  }

  public async post<D, R>(
    params: { path: string },
    data?: D
  ): Promise<R | TErrorGeneric> {
    const options: IHttpRequestOptions = await this.getHttpRequestOptions({
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
    const options: IHttpRequestOptions = await this.getHttpRequestOptions({
      method: EnumMethodHttp.GET,
      path: params?.path,
      notContentType: params?.notContentType || false,
      hostname: this.paymentConfig?.urlQuery || "",
    });
    console.log(123456, options);
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

import {
  IHttpRequestOptions,
  TErrorGeneric,
  TCredentials,
  TDataReturnCodeTransaction,
  DataReturnCodeTransaction,
  TDataReturnCodeCancel,
  DataReturnCodeCancell,
  TPrepareReturnPayload,
  EnumReturnPay,
  TPayNowRes,
  TCancelTransactionRes,
  TCieloCard,
  TCardTokenizedAddRes,
} from "../../doman";

import { PaymentConfigService } from "../paymentConfigService";
import httpAxios from "../../services/http.axios";
import { EnumMethodHttp } from "../../doman/enums/EnumMethodHttp";

//https://developercielo.github.io/manual/cielo-ecommerce#consulta-bin

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

    console.log(9999, opt);
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
    return await httpAxios({ options });
  }

  public async put<D, R>(
    params: { path: string; notContentType?: boolean },
    data?: D
  ): Promise<R | TErrorGeneric> {
    const options: IHttpRequestOptions = await this.getHttpRequestOptions({
      method: EnumMethodHttp.PUT,
      path: params?.path,
      notContentType: params?.notContentType || false,
      hostname: this.paymentConfig?.urlTransaction || "",
    });
    return await httpAxios({ data, options });
  }

  protected returnTransactionAPI(payload: any): TDataReturnCodeTransaction {
    const response = payload?.data;
    const returnCode = response?.returnCode || response?.payment.returnCode;
    const dataCode = DataReturnCodeTransaction.find((f) =>
      Array.isArray(f.returnCode)
        ? f.returnCode.includes(returnCode)
        : f.returnCode == returnCode
    );

    if (dataCode) {
      return {
        ...dataCode,
        ...(returnCode ? { returnCode } : {}),
        ...(response?.returnMessage
          ? { returnMessage: response?.returnMessage }
          : {}),
      };
    }

    return (
      DataReturnCodeTransaction.find((f) => f.code == 3) || {
        code: 3,
        err: true,
        message: "Não Autorizada",
        ...(returnCode ? { returnCode } : {}),
        ...(response?.returnMessage
          ? { returnMessage: response?.returnMessage }
          : {}),
      }
    );
  }

  protected returnCancelTransactionAPI(payload): TDataReturnCodeCancel {
    const response = payload?.data;
    const dataCode = DataReturnCodeCancell.find(
      (f) => f.returnCode == response?.returnCode
    );

    if (dataCode) {
      return {
        ...dataCode,
        returnCode: response?.returnCode,
        returnMessage: response?.returnMessage,
      };
    }

    return {
      err: true,
      code: 3,
      returnCode: response?.returnCode,
      returnMessage: response?.returnMessage,
      message: "Falha no processamento. Por favor, tente novamente.",
    };
  }

  protected async prepareReturn(
    payload: TPrepareReturnPayload | null,
    response: any,
    type: EnumReturnPay
  ): Promise<
    TPayNowRes | TCancelTransactionRes | TCardTokenizedAddRes | TErrorGeneric
  > {
    const verifyByTransaction = [EnumReturnPay.byReceipt];
    const cancelTransaction = [EnumReturnPay.cancelTransaction];
    const verifyCardTokenized = [EnumReturnPay.cardTokenizedAdd];

    if (type == EnumReturnPay.PAY) {
      // retorno para pagamento

      if (response?.err) {
        return {
          err: true,
          status: response?.data?.status,
          message: response?.data?.message,
          data: response?.data,
        };
      }

      const result: TDataReturnCodeTransaction =
        this.returnTransactionAPI(response);
      console.log(7777, result, response);
      if (type == EnumReturnPay.PAY && !result?.err && result?.code == 1) {
        return {
          err: result?.err,
          merchantOrderId: response?.data?.merchantOrderId,
          tid: response?.data?.payment?.tid,
          paymentId: response?.data?.payment?.paymentId,
          returnCode: response?.data?.payment?.returnCode,
          returnMessage: response?.data?.payment?.returnMessage,
          receivedDate: new Date(response?.data?.payment?.receivedDate),
          authorizationCode: response?.data?.payment?.authorizationCode,
          provider: response?.data?.payment?.provider,
          type: response?.data?.payment?.type,
          amount: response?.data?.payment?.amount / 100,
          code: result.code,
        };
      }

      return {
        err: true,
        merchantOrderId: response?.data?.merchantOrderId,
        tid: response?.data?.payment?.tid,
        paymentId: response?.data?.payment?.paymentId,
        returnCode: response?.data?.payment?.returnCode,
        returnMessage: response?.data?.payment?.returnMessage,
        receivedDate: new Date(response?.data?.payment?.receivedDate),
        provider: response?.data?.payment?.provider,
        type: response?.data?.payment?.type,
        amount: response?.data?.payment?.amount / 100,
        code: result.code,
      };
    } else if (type == EnumReturnPay.cancelTransaction) {
      // retorno para cancelamentos

      const result: TDataReturnCodeCancel =
        this.returnCancelTransactionAPI(response);
      if (
        cancelTransaction.includes(type) &&
        !result?.err &&
        result?.code == 1
      ) {
        return {
          err: response?.err,
          ...(payload?.amount ? { amount: payload.amount } : {}),
          ...(payload?.paymentId ? { paymentId: payload.paymentId } : {}),
          ...(payload?.merchantOrderId
            ? { merchantOrderId: payload.merchantOrderId }
            : {}),
          ...(payload?.tid ? { tid: payload.tid } : {}),
          authorizationCode: response?.data?.authorizationCode,
          tid: response?.data?.tid,
          returnCode: response?.data?.returnCode,
          returnMessage: response?.data?.returnMessage,
          proofOfSale: response?.data?.proofOfSale,
          message: result.message,
          code: result.code,
        };
      }

      return {
        err: true,
        authorizationCode: response?.data?.authorizationCode,
        tid: response?.data?.tid,
        returnCode: response?.data?.returnCode,
        returnMessage: response?.data?.returnMessage,
        proofOfSale: response?.data?.proofOfSale,
        message: result.message,
        code: result.code,
      };
    } else if (verifyByTransaction.includes(type)) {
      if (response?.err) {
        return {
          err: true,
          status: response?.data?.status,
          message: response?.data?.message,
          data: response?.data,
        };
      }

      // retorno para consultas
      if (!response?.err) {
        return {
          err: response?.err,
          merchantOrderId: response?.data?.merchantOrderId,
          tid: response?.data?.payment?.tid,
          paymentId: response?.data?.payment?.paymentId,
          receivedDate: new Date(response?.data?.payment?.receivedDate),
          authorizationCode: response?.data?.payment?.authorizationCode,
          provider: response?.data?.payment?.provider,
          type: response?.data?.payment?.type,
          amount: response?.data?.payment?.amount / 100,
        };
      }
    } else if (verifyCardTokenized.includes(type)) {
      if (response?.err) {
        return {
          err: true,
          status: response?.data?.status,
          message: response?.data?.message,
          data: response?.data,
        };
      }

      // retorno para consultas
      if (!response?.err) {
        return {
          err: response?.err,
          cardToken: response?.data?.cardToken,
        };
      }
    }

    return {
      err: true,
      ...response?.data,
    };
  }
}

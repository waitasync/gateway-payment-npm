import {
  DReturnCancel,
  TCheckedByPaymentId,
  TCieloCreditPay,
  TErrorGeneric,
  TPayNowRes,
} from "../../doman";
import { CieloBase } from "./cieloBase";

export type TPayNowReq = {
  nameConnection: string;
  data: TCieloCreditPay;
};

export type TCheckedByTID = {
  nameConnection: string;
  TID: string;
};

export type TCheckedByMerchantOrderId = {
  nameConnection: string;
  merchantOrderId: string;
};

export type TCheckedByRecurrentPaymentId = {
  nameConnection: string;
  recurrentPaymentId: string;
};

export type TCancelByPaymentId = {
  nameConnection: string;
  paymentId: string;
  amount: number;
};

export type TCancelByMerchantOrderId = {
  nameConnection: string;
  merchantOrderId: string;
  amount: number;
};

export class CieloCreditService extends CieloBase {
  private async prepareReturn(
    response: any
  ): Promise<TPayNowRes | TErrorGeneric> {
    if (response?.err) {
      return {
        err: true,
        status: response?.data?.status,
        message: response?.data?.message,
      };
    }

    const result = this.returnAPI(response);
    if (!result?.err && result?.code == 1) {
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
      };
    }

    return {
      err: result?.err,
      merchantOrderId: response?.data?.merchantOrderId,
      tid: response?.data?.payment?.tid,
      paymentId: response?.data?.payment?.paymentId,
      returnCode: response?.data?.payment?.returnCode,
      returnMessage: response?.data?.payment?.returnMessage,
      receivedDate: new Date(response?.data?.payment?.receivedDate),
      provider: response?.data?.payment?.provider,
      type: response?.data?.payment?.type,
      amount: response?.data?.payment?.amount / 100,
    };
  }

  async payNow(payload: TPayNowReq): Promise<TPayNowRes | TErrorGeneric> {
    const connection = await this.checkConnection(payload.nameConnection);

    if (!connection) {
      throw new Error(this.errorMessageConnection);
    }

    const response = await this.post<TCieloCreditPay, any | TErrorGeneric>(
      { path: "1/sales/" },
      payload.data
    );
    return await this.prepareReturn(response);
  }

  async checkedByPaymentId(payload: TCheckedByPaymentId) {
    console.log("checkedByPaymentId", payload);
    const connection = await this.checkConnection(payload.nameConnection);

    if (!connection) {
      throw new Error(this.errorMessageConnection);
    }

    const response = await this.get<any | TErrorGeneric>({
      path: `1/sales/${payload.paymentId}`,
    });

    console.log("checkedByPaymentId.response", response);

    return await this.prepareReturn(response);
  }
  async checkedByTID(payload: TCheckedByTID) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/sales/acquirerTid/${payload.TID}`,
    });
  }
  async checkedByMerchantOrderId(payload: TCheckedByMerchantOrderId) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/sales?merchantOrderId=${payload.merchantOrderId}`,
    });
  }
  async checkedByRecurrentPaymentId(payload: TCheckedByRecurrentPaymentId) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/RecurrentPayment/${payload.recurrentPaymentId}`,
    });
  }
  async cancelByPaymentId(payload: TCancelByPaymentId) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/sales/${payload.paymentId}/void?amount=${payload.amount}`,
    });
  }
  async cancelByMerchantOrderId(payload: TCancelByMerchantOrderId) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/sales/OrderId/${payload.merchantOrderId}/void?amount=${payload.amount}`,
    });
  }
  async returnCancell() {
    return DReturnCancel;
  }
  //https://developercielo.github.io/manual/cielo-ecommerce#consulta-bin

  returnAPI(payload) {
    const response = payload?.data;
    if (
      [51, "51", 116, "116", 121, "121", "A5"].includes(
        response?.payment?.returnCode
      )
    ) {
      return {
        err: true,
        code: 7,
        returnCode: response?.payment?.returnCode,
        returnMessage: response?.payment?.returnMessage,
        message: "Problemas com o Cartão de Crédito",
      };
    }
    if (
      [54, "54", 6, "06", 101, "101", "BV"].includes(
        response?.payment?.returnCode
      )
    ) {
      return {
        err: true,
        code: 3,
        returnMessage: response?.payment?.returnMessage,
        message: "Cartão Expirado",
      };
    }
    if (
      [41, "41", 200, "200", "FD", 43, "43", 78, "78"].includes(
        response?.payment?.returnCode
      )
    ) {
      return {
        err: true,
        code: 4,
        returnCode: response?.payment?.returnCode,
        returnMessage: response?.payment?.returnMessage,
        message: "Cartão Bloqueado",
      };
    }

    if (["77", 77].includes(response?.payment?.returnCode)) {
      return {
        err: true,
        code: 6,
        returnCode: response?.payment?.returnCode,
        returnMessage: response?.payment?.returnMessage,
        message: "Cartão Cancelado",
      };
    }

    if (["002", 2].includes(response?.payment?.returnCode)) {
      return {
        err: true,
        code: 2,
        returnCode: response?.payment?.returnCode,
        returnMessage: response?.payment?.returnMessage,
        message: "Credenciais Invalida",
      };
    }

    if (
      ["00", 0, "0", 4, "4", "04", "6", 6].includes(
        response?.payment?.returnCode
      )
    ) {
      return {
        err: false,
        code: 1,
        returnCode: response?.payment?.returnCode,
        returnMessage: response?.payment?.returnMessage,
        message: "Autorizada",
      };
    }

    return {
      err: true,
      code: 2,
      returnCode: response?.payment?.returnCode,
      returnMessage: response?.payment?.returnMessage,
      message: "Não Autorizada",
    };
  }
}

import { DReturnCancel, TCieloCreditPay, TErrorGeneric } from "../../doman";
import { CieloBase } from "./cieloBase";

export type TPayNowReq = {
  nameConnection: string;
  data: TCieloCreditPay;
};

export type TCheckedByPaymentId = {
  nameConnection: string;
  paymentId: string;
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
  async payNow(payload: TPayNowReq) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.post<TCieloCreditPay, any | TErrorGeneric>(
      { path: "1/sales/" },
      payload.data
    );
  }

  async checkedByPaymentId(payload: TCheckedByPaymentId) {
    if (!this.checkConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }
    return await this.get<any | TErrorGeneric>({
      path: `1/sales/${payload.paymentId}`,
    });
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
}

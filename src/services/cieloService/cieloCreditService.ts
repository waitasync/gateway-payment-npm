import {
  TCheckedByPaymentId,
  TCieloCreditPay,
  TErrorGeneric,
  TPayNowRes,
  TByTransaction,
  TCancelransaction,
  EnumReturnPay,
} from "../../doman";

import { CieloBase } from "./cieloBase";

export type TPayNowReq = {
  nameConnection: string;
  data: TCieloCreditPay;
};

export type TCheckedByTID = {
  nameConnection: string;
  tid?: string;
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
  paymentId?: string;
  amount: number;
};

export type TCancelByMerchantOrderId = {
  nameConnection: string;
  merchantOrderId?: string;
  amount: number;
};

export class CieloCreditService extends CieloBase {
  async payNow(payload: TPayNowReq): Promise<TPayNowRes | TErrorGeneric> {
    if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    } else if (
      !payload?.data?.payment?.creditCard?.cardNumber &&
      !payload?.data?.payment?.creditCard?.cardToken
    ) {
      throw new Error("invalid parameters");
    }

    const response = await this.post<TCieloCreditPay, any | TErrorGeneric>(
      { path: "1/sales/" },
      payload.data
    );
    return await this.prepareReturn(payload.data, response, EnumReturnPay.PAY);
  }

  async checkedByTransaction(payload: TByTransaction) {
    if (payload.paymentId) {
      return await this.checkedByPaymentId(payload);
    } else if (payload.tid) {
      return await this.checkedByTID(payload);
    }
  }

  async checkedByPaymentId(payload: TCheckedByPaymentId) {
    if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    }
    const response = await this.get<any | TErrorGeneric>({
      path: `1/sales/${payload.paymentId}`,
    });
    return await this.prepareReturn(payload, response, EnumReturnPay.byReceipt);
  }

  async checkedByTID(payload: TCheckedByTID) {
    if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    }
    const response = await this.get<any | TErrorGeneric>({
      path: `1/sales/acquirerTid/${payload.tid}`,
    });
    return await this.prepareReturn(payload, response, EnumReturnPay.byReceipt);
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

  async cancelTransaction(payload: TCancelransaction) {
    if (payload.paymentId) {
      return await this.cancelByPaymentId(payload);
    } else if (payload.merchantOrderId) {
      return await this.cancelByMerchantOrderId(payload);
    }
  }

  convertAmountCents(amount: number) {
    return Number(Number(amount) * 100).toFixed(0);
  }
  async cancelByPaymentId(payload: TCancelByPaymentId) {
    if (!payload?.paymentId) {
      throw new Error("Search parameter not informed");
    } else if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    }

    const response = await this.put<any, any | TErrorGeneric>({
      path: `1/sales/${payload.paymentId}/void?amount=${this.convertAmountCents(
        payload.amount
      )}`,
    });
    return await this.prepareReturn(
      payload,
      response,
      EnumReturnPay.cancelTransaction
    );
  }

  async cancelByMerchantOrderId(payload: TCancelByMerchantOrderId) {
    if (!payload?.merchantOrderId) {
      throw new Error("Search parameter not informed");
    } else if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    }
    const response = await this.put<any, any | TErrorGeneric>({
      path: `1/sales/OrderId/${
        payload.merchantOrderId
      }/void?amount=${this.convertAmountCents(payload.amount)}`,
    });
    return await this.prepareReturn(
      payload,
      response,
      EnumReturnPay.cancelTransaction
    );
  }
}

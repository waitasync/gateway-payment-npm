import { TPaymentConfigProps } from "../doman";

export default class PaymentConfig {
  private static id: String;
  private static key: String;
  private static urlTransaction: String;
  private static urlQuery: String;

  static async setConfig(payload: TPaymentConfigProps) {
    try {
      if (!payload?.urlTransaction) {
        return {
          err: true,
          message: "transaction ur was not informed",
        };
      } else if (!payload?.urlQuery) {
        return {
          err: true,
          message: "query url was not informed",
        };
      } else if (!payload?.id) {
        return {
          err: true,
          message: "query merchantId was not informed",
        };
      } else if (!payload?.key) {
        return {
          err: true,
          message: "query merchantId was not informed",
        };
      }
      this.urlTransaction = payload.urlTransaction;
      this.urlQuery = payload.urlQuery;
      this.id = payload.id;
      this.key = payload.key;
      return {
        err: false,
        message: "success",
      };
    } catch (error: any) {
      return {
        err: true,
        message: error?.message,
      };
    }
  }

  static async getUrlTransaction() {
    return this.urlTransaction;
  }

  static async getUrlQuery() {
    return this.urlQuery;
  }

  static async getId() {
    return this.id;
  }

  static async getKey() {
    return this.key;
  }
}

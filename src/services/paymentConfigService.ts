import { TErrorGeneric, TPaymentConfigProps } from "../doman";

export class PaymentConfigService {
  private static connections: Array<TPaymentConfigProps>;

  static async setConfig(payload: Array<TPaymentConfigProps>) {
    this.connections = [];
    payload.forEach((connection, c) => {
      try {
        if (!connection?.name) {
          return {
            err: true,
            message: "transaction ur was not informed",
            data: connection,
          };
        } else if (!connection?.urlTransaction) {
          return {
            err: true,
            message: "transaction ur was not informed",
            data: connection,
          };
        } else if (!connection?.urlQuery) {
          return {
            err: true,
            message: "query url was not informed",
            data: connection,
          };
        } else if (!connection?.id) {
          return {
            err: true,
            message: "query merchantId was not informed",
            data: connection,
          };
        } else if (!connection?.key) {
          return {
            err: true,
            message: "query merchantId was not informed",
            data: connection,
          };
        }

        this.connections.push(connection);
      } catch (error: any) {
        return {
          err: true,
          message: error?.message,
          data: error,
        };
      }
    });
  }

  static async getConnection(name: String): Promise<TPaymentConfigProps> {
    if (!this.connections.length) {
      throw new Error("no credential configured");
    }

    const result: TPaymentConfigProps | undefined = await this.connections.find(
      (connection: TPaymentConfigProps) => connection.name == name
    );

    if (!result) {
      throw new Error("credentials not found");
    }

    return result;
  }
}

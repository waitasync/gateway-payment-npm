import { TErrorGeneric, TCredentials } from "../doman";

export class PaymentConfigService {
  private static connections: Array<TCredentials>;

  static async setConfig(payload: Array<TCredentials>) {
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

  static async getConnection(name: String): Promise<TCredentials> {
    if (!this.connections.length) {
      throw new Error("no credential configured");
    }

    const result: TCredentials | undefined = await this.connections.find(
      (connection: TCredentials) => connection.name == name
    );

    if (!result) {
      throw new Error("credentials not found");
    }

    return result;
  }
}

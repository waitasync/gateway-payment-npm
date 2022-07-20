import { TCieloCreditPay } from "../../doman";
import { CieloBase } from "./cieloBase";

export type TCreditPayProps = {
  nameConnection: string;
  data: TCieloCreditPay;
};

export class CieloCreditService extends CieloBase {
  async payNow(payload: TCreditPayProps) {
    if (!this.getConnection(payload.nameConnection)) {
      throw new Error(this.errorMessageConnection);
    }

    return { message: "teste" };
  }

  async refund(payload: TCreditPayProps) {
    return { message: "teste" };
  }
}

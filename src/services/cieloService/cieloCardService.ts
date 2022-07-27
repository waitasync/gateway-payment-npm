import { TErrorGeneric } from "../../doman";
import {
  EnumReturnPay,
  TCardTokenizedAddRes,
  TCieloCard,
} from "../../doman/cielo";
import { CieloBase } from "./cieloBase";

interface TCardTokenizedAddReq {
  nameConnection: string;
  card: TCieloCard;
}

export class CieloCardService extends CieloBase {
  async add(payload: TCardTokenizedAddReq) {
    if (!(await this.checkConnection(payload.nameConnection))) {
      throw new Error(this.errorMessageConnection);
    }
    const response = await this.post<
      TCieloCard,
      TCardTokenizedAddRes | TErrorGeneric
    >({ path: "1/card/" }, payload.card);
    return await this.prepareReturn(
      null,
      response,
      EnumReturnPay.cardTokenizedAdd
    );
  }
}

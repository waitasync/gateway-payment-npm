import { TCieloCard } from "../../doman/cielo";
import { CieloBase } from "./cieloBase";

interface TCardTokenizedAddReq {
  nameConnection: string;
  card: TCieloCard;
}

export class CieloCardService extends CieloBase {
  async add(payload: TCardTokenizedAddReq) {
    return { message: "teste" };
  }
}

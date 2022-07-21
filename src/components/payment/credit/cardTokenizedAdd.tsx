import { TCieloCard, TCieloCustomer, TCieloPayment } from "../../../doman";
// import { TErrorGeneric } from "../../../doman";
// import { CieloService } from "../../../services/cieloService";

export interface TCardTokenizedAddReq {
  nameConnection: string;
  card: TCieloCard;
}

export interface TcardTokenizedAddRes {
  merchantOrderId: string;
  customer: TCieloCustomer;
  payment: TCieloPayment;
}

export async function cardTokenizedAdd(payload: TCardTokenizedAddReq) {
  // const paymentCieloService = new CieloService();
  // return await paymentCieloService.card.add(payload);
}

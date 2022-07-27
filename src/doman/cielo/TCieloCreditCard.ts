import { EnumCieloBrand } from "./EnumCieloBrand";
import { TCieloCardOnFile } from "./TCieloCardOnFile";

export type TCieloCreditCard = {
  brand: EnumCieloBrand; // is required
  securityCode: number; // is required || is not required for cardAdd
  expirationDate?: string; // is required is not cardtoken - "12/2030";
  cardToken?: string;
  cardNumber?: string; // is required is not cardtoken - "1234123412341231";
  saveCard?: boolean; // Booleano que identifica se o cartão será salvo para gerar o CardToken.
  cardOnFile?: TCieloCardOnFile;
  holder?: string;
};

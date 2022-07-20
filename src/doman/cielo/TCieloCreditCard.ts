import { EnumCieloBrand } from "./EnumCieloBrand";
import { TCieloCardOnFile } from "./TCieloCardOnFile";

export type TCieloCreditCard = {
  cardNumber: string; // is required - "1234123412341231";
  expirationDate: string; // is required - "12/2030";
  securityCode: number; // is required
  saveCard: boolean; // Booleano que identifica se o cartão será salvo para gerar o CardToken.
  brand: EnumCieloBrand; // is required
  cardOnFile: TCieloCardOnFile;
  holder?: string;
};

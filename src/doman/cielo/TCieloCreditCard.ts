import { EnumCieloBrand } from "./EnumCieloBrand";
import { TCieloCardOnFile } from "./TCieloCardOnFile";

export type TCieloCreditCard = {
  CardNumber: string; //"1234123412341231";
  Holder: string;
  ExpirationDate: string; //"12/2030";
  SecurityCode: number;
  SaveCard: boolean;
  Brand: EnumCieloBrand;
  CardOnFile: TCieloCardOnFile;
};

import { EnumBrand } from "./EnumBrand";
import { TCardOnFile } from "./TCardOnFile";

export type TCreditCard = {
  CardNumber: String; //"1234123412341231";
  Holder: String;
  ExpirationDate: String; //"12/2030";
  SecurityCode: number;
  SaveCard: boolean;
  Brand: EnumBrand;
  CardOnFile: TCardOnFile;
};

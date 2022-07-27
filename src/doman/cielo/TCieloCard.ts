import { EnumMethodHttp } from "../enums/EnumMethodHttp";
import { EnumCieloBrand } from "./EnumCieloBrand";

export type TCieloCard = {
  customerName: string;
  cardNumber: string;
  holder: string;
  expirationDate: string;
  brand: EnumCieloBrand;
};

export type TCieloCardResponse = {
  CardToken: string;
  Links: {
    Method: EnumMethodHttp;
    Rel: string;
    Href: string;
  };
};

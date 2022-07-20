import { EnumMethodHttp } from "../enums/EnumMethodHttp";
import { EnumCieloBrand } from "./EnumCieloBrand";

export type TCieloCard = {
  CustomerName: string;
  CardNumber: string;
  Holder: string;
  ExpirationDate: string;
  Brand: EnumCieloBrand;
};

export type TCieloCardResponse = {
  CardToken: string;
  Links: {
    Method: EnumMethodHttp;
    Rel: string;
    Href: string;
  };
};

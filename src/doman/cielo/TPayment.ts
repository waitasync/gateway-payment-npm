import { EnumCountry } from "./EnumCountry";
import { EnumCurrency } from "./EnumCurrency";
import { EnumTypeTransaction } from "./EnumTypeTransaction";
import { TAirlineData } from "./TAirlineData";
import { TCreditCard } from "./TCreditCard";

export type TPayment = {
  Currency: EnumCurrency;
  Country: EnumCountry;
  ServiceTaxAmount: number;
  Installments: number;
  Interest: String;
  Capture: boolean;
  Authenticate: String;
  Recurrent: String;
  SoftDescriptor: String;
  CreditCard: TCreditCard;
  IsCryptoCurrencyNegotiation: boolean;
  Type: EnumTypeTransaction;
  Amount: number;
  AirlineData: TAirlineData;
};

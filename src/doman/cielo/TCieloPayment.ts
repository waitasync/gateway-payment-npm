import { EnumCieloCountry } from "./EnumCieloCountry";
import { EnumCieloCurrency } from "./EnumCieloCurrency";
import { EnumCieloTypeTransaction } from "./EnumCieloTypeTransaction";
import { TCieloAirlineData } from "./TCieloAirlineData";
import { TCieloCreditCard } from "./TCieloCreditCard";

export type TCieloPayment = {
  Currency: EnumCieloCurrency;
  Country: EnumCieloCountry;
  ServiceTaxAmount: number;
  Installments: number;
  Interest: string;
  Capture: boolean;
  Authenticate: string;
  Recurrent: string;
  SoftDescriptor: string;
  CreditCard: TCieloCreditCard;
  IsCryptoCurrencyNegotiation: boolean;
  Type: EnumCieloTypeTransaction;
  Amount: number;
  AirlineData: TCieloAirlineData;
};

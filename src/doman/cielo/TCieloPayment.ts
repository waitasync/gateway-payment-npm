import { EnumCieloCountry } from "./EnumCieloCountry";
import { EnumCieloCurrency } from "./EnumCieloCurrency";
import { EnumCieloTypeTransaction } from "./EnumCieloTypeTransaction";
import { TCieloAirlineData } from "./TCieloAirlineData";
import { TCieloCreditCard } from "./TCieloCreditCard";

export type TCieloPayment = {
  type: EnumCieloTypeTransaction;
  installments: number; // Número de Parcelas.
  amount: number; // Valor do Pedido (ser enviado em centavos).
  currency?: EnumCieloCurrency;
  country?: EnumCieloCountry;
  serviceTaxAmount?: number;
  interest?: string;
  capture?: boolean; // Booleano que identifica que a autorização deve ser com captura automática (true) ou captura posterior (false).
  authenticate?: string;
  recurrent?: string;
  softDescriptor?: string;
  creditCard: TCieloCreditCard;
  isCryptoCurrencyNegotiation?: boolean;
  airlineData?: TCieloAirlineData;
};

import { TCieloAddress } from "./TCieloAddress";

export type TCieloCustomer = {
  Name: string;
  Email: string;
  Birthdate: string; //"1991-01-02";
  Address: TCieloAddress;
  DeliveryAddress: TCieloAddress;
  Billing: TCieloAddress;
};

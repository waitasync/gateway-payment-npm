import { TCieloAddress } from "./TCieloAddress";

export type TCieloCustomer = {
  name?: string;
  email?: string;
  birthdate?: string; //"1991-01-02";
  address?: TCieloAddress;
  deliveryAddress?: TCieloAddress;
  billing?: TCieloAddress;
};

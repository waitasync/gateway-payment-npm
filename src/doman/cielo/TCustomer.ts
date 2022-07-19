import { TAddress } from "./TAddress";

export type TCustomer = {
  Name: String;
  Email: String;
  Birthdate: String; //"1991-01-02";
  Address: TAddress;
  DeliveryAddress: TAddress;
  Billing: TAddress;
};

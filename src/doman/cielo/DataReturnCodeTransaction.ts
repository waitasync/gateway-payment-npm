import { TDataReturnCodeTransaction } from "./TDataReturnCodeTransaction";

export const DataReturnCodeTransaction: Array<TDataReturnCodeTransaction> = [
  {
    code: 1,
    returnCode: ["00", 0, "0", 4, "4", "04", "6", 6],
    err: false,
    message: "Autorizada",
  },
  {
    code: 3,
    err: true,
    message: "Não Autorizada",
  },
  {
    code: 4,
    returnCode: [51, "51", 116, "116", 121, "121", "A5"],
    err: true,
    message: "Problemas com o Cartão de Crédito",
  },
  {
    code: 5,
    returnCode: [54, "54", 6, "06", 101, "101", "BV"],
    err: true,
    message: "Cartão Expirado",
  },
  {
    code: 6,
    returnCode: [41, "41", 200, "200", "FD", 43, "43", 78, "78"],
    err: true,
    message: "Cartão Bloqueado",
  },
  {
    code: 7,
    returnCode: ["77", 77],
    err: true,
    message: "Cartão Cancelado",
  },
  {
    code: 8,
    returnCode: ["002", 2],
    err: true,
    message: "Credenciais Invalida",
  },
];

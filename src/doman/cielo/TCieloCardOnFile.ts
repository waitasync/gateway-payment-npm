/* 

  Indica o propósito de armazenamento de cartões, caso o campo “Usage” for “Used”.
  Recurring - Compra recorrente programada (ex. assinaturas)
  Unscheduled - Compra recorrente sem agendamento (ex. aplicativos de serviços)
  Installments - Parcelamento através da recorrência.

*/

export type TCieloCardOnFile = {
  usage?: string; // "Used";
  reason?: string; // "Unscheduled";
};

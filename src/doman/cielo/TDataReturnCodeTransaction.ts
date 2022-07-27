export type TDataReturnCodeTransaction = {
  code: number;
  returnCode?: number | string | Array<any> | any;
  err: boolean;
  message: string;
  returnMessage?: string;
};

// import { CieloCardService } from "./cieloCardService";
import { CieloCreditService } from "./cieloCreditService";

export class CieloService {
  // card: CieloCardService;
  credit: CieloCreditService;

  constructor() {
    // this.card = new CieloCardService();
    this.credit = new CieloCreditService();
  }
}

export interface UnitStock {
  name: string;
  ticker: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currency: string;
  logo: string;
}

export class CreatePortfolioDto {
  userId: string;
  stocks: Array<UnitStock>;
}

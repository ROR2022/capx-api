import { Connection } from 'mongoose';
import { PortfolioSchema } from './entities/portfolio.entity';

export const portfolioProviders = [
  {
    provide: 'PORTFOLIO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Portfolio', PortfolioSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

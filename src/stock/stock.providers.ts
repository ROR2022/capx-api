import { Connection } from 'mongoose';
import { StockSchema } from './entities/stock.entity';

export const stockProviders = [
  {
    provide: 'STOCK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Stock', StockSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

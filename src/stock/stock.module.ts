import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { databaseProviders } from 'src/database/database.providers';
import { stockProviders } from './stock.providers';

@Module({
  controllers: [StockController],
  providers: [StockService, ...databaseProviders, ...stockProviders],
})
export class StockModule {}

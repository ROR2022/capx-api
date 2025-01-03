import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { databaseProviders } from 'src/database/database.providers';
import { portfolioProviders } from './portfolio.providers';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, ...databaseProviders, ...portfolioProviders],
})
export class PortfolioModule {}

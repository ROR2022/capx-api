import { Injectable, Inject } from '@nestjs/common';
import { CreatePortfolioDto, UnitStock } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Model } from 'mongoose';
import { Portfolio } from './entities/portfolio.entity';
import { getStockPriceBySymbol } from 'src/lib/finnhubApi';

@Injectable()
export class PortfolioService {

  constructor(
    //eslint-disable-next-line
    @Inject('PORTFOLIO_MODEL')
    private portfolioModel: Model<Portfolio>,
  ) {}

  addStock(dataStock: UnitStock, id: string) {
    //this action first finds the portfolio by the user id and then pushes the new stock to the stocks array
    // if the portfolio does not exist, it creates a new one
    return this.portfolioModel.findOneAndUpdate(
      { userId: id },
      { $push: { stocks: dataStock } },
      { upsert: true, new: true },
    );
  }

  create(createPortfolioDto: CreatePortfolioDto) {
    const createdPortfolio = new this.portfolioModel(createPortfolioDto);
    return createdPortfolio.save();
  }

  findAll() {
    return this.portfolioModel.find().sort({ createdAt: -1 }).exec();
  }

  findOne(id: string) {
    return this.portfolioModel.findById(id).exec();
  }

  findByUserId(id: string) {
    return this.portfolioModel.findOne({ userId: id }).exec();
  }

  async dataDashboardByUserId(id: string) {
    try {
      const dataPortfolio: any = await this.portfolioModel.findOne({ userId: id }).exec();
      //ahora necesitamos consultar el current price de cada stock usando el symbol y el servicio getStockPriceBySymbol
      //para cada symbol en el listDataStock debemos hacer una llamada a getStockPriceBySymbol
      const listDataCurrentPrice = await Promise.all(
        dataPortfolio.stocks.map(async (stock: any) => {
          return await getStockPriceBySymbol(stock.symbol);
        }),
      );
      return { ...dataPortfolio._doc, dataPrice: listDataCurrentPrice };
    } catch (error) {
      console.log('error dataDashboardByUserId: ', error);
      return { error: String(error) };
    }
    //return this.portfolioModel.findOne({ userId: id }).select('stocks').exec();
  }

  update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioModel
      .findByIdAndUpdate(id, updatePortfolioDto, { new: true })
      .exec();
  }

  updateStocks(dataStocks: Array<UnitStock>, id: string) {
    return this.portfolioModel.findOneAndUpdate(
      { userId: id },
      { stocks: dataStocks },
      { new: true },
    );
  }

  remove(id: string) {
    return this.portfolioModel.findByIdAndDelete(id).exec();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Model } from 'mongoose';
import { Stock } from './entities/stock.entity';
import { getDataByQuery, getCompanyProfileBySymbol, getStockPriceBySymbol } from 'src/lib/finnhubApi';

@Injectable()
export class StockService {
  constructor(
    //eslint-disable-next-line
    @Inject('STOCK_MODEL')
    private stockModel: Model<Stock>,
  ) {}

  create(createStockDto: CreateStockDto) {
    const createdStock = new this.stockModel(createStockDto);
    return createdStock.save();
  }

  findAll() {
    return this.stockModel.find().sort({ createdAt: -1 }).exec();
  }

  findOne(id: string) {
    return this.stockModel.findById(id).exec();
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.stockModel
      .findByIdAndUpdate(id, updateStockDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.stockModel.findByIdAndDelete(id).exec();
  }

  async getDataStockByQuery(query: string) {
    try {
      const dataSymbol = await getDataByQuery(query);
      console.log('dataStockbyQuery:..', dataSymbol);
      const { result } = dataSymbol;
      if (!result) {
        return 'No data found';
      }
      const listSymbols = result.map((stock: any) => {
        return stock.symbol;
      });
      const listDataStock = await Promise.all(
        listSymbols.map(async (symbol: string) => {
          return await getCompanyProfileBySymbol(symbol);
        }),
      );
      const listDataStockFiltered = listDataStock.filter((stock: any) => {
        const { country, currency, logo } = stock;
        if (country || currency || logo) {
          return stock;
        }
      });
      const listDataStockWithPrice = await Promise.all(
        listDataStockFiltered.map(async (stock: any) => {
          const { symbol } = stock;
          const price = await getStockPriceBySymbol(symbol);
          const { error } = price;
          if (error) {
            return { ...stock, price: "No data" };
          }
          return { ...stock, ...price };
        }),
      );


      return listDataStockWithPrice;
      
    } catch (error) {
      console.error(error.data);
      return error;
    }
  }
}

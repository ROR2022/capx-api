import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';
//import { CreateStockDto } from './dto/create-stock.dto';
//import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  //eslint-disable-next-line
  constructor(private readonly stockService: StockService) {}

  /* @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  } */

  @Get('query/:query')
  getDataStockByQuery(@Param('query') query: string) {
    return this.stockService.getDataStockByQuery(query);
  }
}

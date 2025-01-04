import { Controller, Get, Post, Body, UseGuards, Req, Put } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { UnitStock } from './dto/create-portfolio.dto';
//import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('portfolio')
export class PortfolioController {
  //eslint-disable-next-line
  constructor(private readonly portfolioService: PortfolioService) {}

  
  /* @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  } */

  @UseGuards(AuthGuard)
  @Post("addStock")
  addStock(@Body() dataStock: UnitStock, @Req() req: any) {
    const id = req.user.id;
    return this.portfolioService.addStock(dataStock, id);
  }

  @UseGuards(AuthGuard)
  @Get("dataPortfolio")
  findDataPortfolio(@Req() req: any) {
    const id = req?.user?.id;
    if (!id) {
      return { message: "Invalid id user" };
    }
    return this.portfolioService.findByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Get("dataDashboard")
  findDataDashboard(@Req() req: any) {
    const id = req?.user?.id;
    if (!id) {
      return { message: "Invalid id user" };
    }
    return this.portfolioService.dataDashboardByUserId(id);
  }


  /* @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  } */

  @UseGuards(AuthGuard)
  @Put('updateStocks')
  updateStocks(@Body() dataStocks: Array<UnitStock>, @Req() req: any) {
    const id = req?.user?.id;
    if (!id) {
      return { message: "Invalid id user" };
    }
    return this.portfolioService.updateStocks(dataStocks, id);
  }
  
  

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  } */
}

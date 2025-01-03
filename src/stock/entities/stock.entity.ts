import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type StockDocument = HydratedDocument<Stock>;

@Schema({ timestamps: true })
export class Stock {
  @Prop({ required: true, minlength: 4, maxlength: 50 })
  name: string;

  @Prop({ required: true })
  buyPrice: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StockSchema =
  SchemaFactory.createForClass(Stock).plugin(mongoosePaginate);

StockSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});

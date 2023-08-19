import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({ required: true })
  product_id: number;

  @Prop({ required: true })
  pay_id: number;

  @Prop({ required: true })
  currency: "RUB" | "UAH" | "BYN" | "KZT" | "USD" | "EUR";

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  nickname: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  status: 'WAITING' | 'PAID';

  @Prop({ required: true })
  created: string;

  @Prop()
  closed: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

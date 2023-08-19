import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class InvoiceCreateDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
  @IsNotEmpty()
  nickname: string;
}
export class InvoiceNotificationDto {
  merchant_id: number;
  transaction_id: string;
  pay_id: number;
  amount: number;
  currency: 'RUB' | 'UAH' | 'BYN' | 'KZT' | 'USD' | 'EUR';
  profit: string;
  email: string;
  method: string;
  status: string;
  test: number;
  creation_date: string;
  completion_date: string;
  sign: string;
  nickname: string
}
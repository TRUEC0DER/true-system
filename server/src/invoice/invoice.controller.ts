import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { InvoiceNotificationDto } from "./dto/invoice.notification.dto";
import { RealIP } from "nestjs-real-ip";
import { InvoiceCreateDto } from "./dto/invoice.create.dto";

@Controller("invoice")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {
  }

  @Get("products")
  getProducts() {
    return this.invoiceService.getProducts();
  }

  @Post("create")
  create(@Body() invoiceCreateDto: InvoiceCreateDto) {
    return this.invoiceService.create(invoiceCreateDto);
  }

  @Post("notification")
  notification(@Body() notificationDto: InvoiceNotificationDto, @RealIP() ip) {
    return this.invoiceService.notification(notificationDto, ip)
  }
}

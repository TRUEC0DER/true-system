import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import config from './app.config.json'

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
    MongooseModule.forRoot(config.database.mongodb.url),
    InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

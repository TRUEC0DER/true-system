import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InvoiceNotificationDto } from "./dto/invoice.notification.dto";
import sha256 from "crypto-js/sha256";
import config from "./../app.config.json";
import { RCON } from "minecraft-server-util";
import { Invoice, InvoiceDocument } from "./schemas/invoice.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { InvoiceCreateDto } from "./dto/invoice.create.dto";

@Injectable()
export class InvoiceService {
  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>) {}

  getProducts() {
    const products = config.products.map(item => {
        return {
          id: item.id,
          name: item.name,
          info: item.info,
          price: item.price
        }
    })
    return products
  }

  async create(invoiceCreateDto: InvoiceCreateDto) {
    const getProduct = config.products.find(item => item.id === invoiceCreateDto.product_id)
    const date = `${Date.now().toFixed().slice(7, 12)}`

    if (await this.invoiceModel.findOne({ nickname: invoiceCreateDto.nickname, status: 'WAITING' })) {
      await this.invoiceModel.deleteOne({ nickname: invoiceCreateDto.nickname, status: 'WAITING' })
    }

    if (await this.invoiceModel.findOne({ nickname: invoiceCreateDto.nickname, status: 'PAID', product_id: invoiceCreateDto.product_id })) {
      throw new HttpException('The specified product has already been purchased under this nickname', HttpStatus.BAD_REQUEST)
    }

    await new this.invoiceModel({
      product_id: getProduct.id,
      pay_id: date,
      amount: getProduct.price,
      currency: 'RUB',
      nickname: invoiceCreateDto.nickname.replace(/(\/)/ig, "").replace(/ /ig, ""),
      status: 'WAITING',
      created: dayjs().format()
    }).save()

    const anypay = {
      merchant_id: config.anypay.merchant_id,
      pay_id: date,
      amount: getProduct.price,
      currency: 'RUB',
      email: "",
      desc: `${getProduct.info.slice(0, 100)} (${invoiceCreateDto.nickname})`,
      success_url: config.anypay.success_url,
      fail_url: config.anypay.fail_url
    }
    const sign = sha256(`${anypay.merchant_id}:${anypay.pay_id}:${anypay.amount}:${anypay.currency}:${anypay.desc}:${anypay.success_url}:${anypay.fail_url}:${config.anypay.secret_key}`).toString()
    return `${config.anypay.url}?merchant_id=${anypay.merchant_id}&pay_id=${anypay.pay_id}&amount=${anypay.amount}&desc=${anypay.desc.replace(/( )/ig, '+')}&email=${anypay.email}&currency=${anypay.currency}&success_url=${anypay.success_url}&fail_url=${anypay.fail_url}&sign=${sign}`
  }

  async notification (notificationDto: InvoiceNotificationDto, ip) {
    const client = new RCON()
    const findInvoice = await this.invoiceModel.findOne({ pay_id: notificationDto.pay_id })
    const nickname = findInvoice.nickname.replace(/(\/)/ig, "").replace(/ /ig, "")
    const notificationSign = sha256(`${notificationDto.currency}:${notificationDto.amount}:${notificationDto.pay_id}:${notificationDto.merchant_id}:${notificationDto.status}:${config.anypay.secret_key}`).toString()
    if (
      notificationSign !== notificationDto.sign
      || !config.anypay.allow_ips.includes(ip)
      || !findInvoice
      || Number(notificationDto.amount) !== findInvoice.amount
      || notificationDto.currency !== findInvoice.currency
      || findInvoice.status !== 'WAITING'
    ) {
      console.log(`[INVOICE | ${ip} | FAILED] - (${JSON.stringify(notificationDto)})`)
      throw new HttpException('The request was not authenticated', HttpStatus.BAD_REQUEST)
    }
    const getProduct = config.products.find(item => item.id === findInvoice.product_id)
    for (const servers of getProduct.servers) {
      await client.connect(servers.ip, servers.port)
      await client.login(servers.password)
      for (const commands of servers.commands) {
        await client.execute(commands.replace(/(%nickname%)/ig, nickname))
      }
      await client.close()
    }
    await this.invoiceModel.updateOne({ pay_id: notificationDto.pay_id }, { status: 'PAID', email: notificationDto.email, closed: dayjs().format() })
    console.log(`[INVOICE | ${ip} | SUCCESS] - (${JSON.stringify(notificationDto)})`)
    return 'OK'
  }
}

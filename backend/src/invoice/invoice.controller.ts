import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() invoice: Invoice): Promise<Invoice> {
    return this.invoiceService.create(invoice);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Invoice[]> {
    return this.invoiceService.findAll(page, limit);
  }

  @Get('revenue')
  getRevenueData(): Promise<any> {
    return this.invoiceService.getRevenueData();
  }

  @Get('products')
  getProductSuggestions(@Query('query') query: string): any[] {
    return this.invoiceService.getProductSuggestions(query);
  }
}

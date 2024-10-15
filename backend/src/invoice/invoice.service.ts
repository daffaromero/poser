import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  create(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.save(invoice);
  }

  findAll(page: number, limit: number): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getRevenueData(): Promise<any> {
    // Implement logic to fetch and aggregate revenue data
    return;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

const products = [
  { name: 'Product A', picture: 'url_to_picture_A', stock: 10, price: 100 },
  { name: 'Product B', picture: 'url_to_picture_B', stock: 5, price: 200 },
  // Add more products as needed
];

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  create(invoice: Invoice): Promise<Invoice> {
    return this.invoiceRepository.save(invoice);
  }

  findAll(page: number = 1, limit: number = 10): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getRevenueData(): Promise<any> {
    // Implement logic to fetch and aggregate revenue data
    return;
  }

  getProductSuggestions(query: string): any[] {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }
}

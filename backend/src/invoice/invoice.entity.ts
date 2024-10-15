import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  invoiceNo: number;

  @Column()
  date: string;

  @Column()
  customer: string;

  @Column()
  salesperson: string;

  @Column()
  paymentType: paymentTypeEnum;

  @Column({ nullable: true })
  notes: string;

  @Column('json')
  products: { name: string; picture: string; stock: number; price: number }[];

  @Column('decimal')
  totalAmount: number;
}

enum paymentTypeEnum {
  CASH,
  CREDIT,
  NOTCASHORCREDIT,
}

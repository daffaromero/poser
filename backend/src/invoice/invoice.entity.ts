import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  invoice_no: number;

  @Column()
  date: string;

  @Column()
  customer: string;

  @Column()
  salesperson: string;

  @Column()
  payment_type: paymentTypeEnum;

  @Column({ nullable: true })
  notes: string;

  @Column('json')
  products: { name: string; picture: string; stock: number; price: number }[];

  @Column('decimal')
  total_amount: number;
}

enum paymentTypeEnum {
  CASH,
  CREDIT,
  NOTCASHORCREDIT,
}

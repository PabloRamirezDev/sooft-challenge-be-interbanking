import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({ name: 'debit_account' })
  debitAccount: string;

  @Column({ name: 'credit_account' })
  creditAccount: string;

  @CreateDateColumn({ name: 'transaction_date' })
  transactionDate: Date;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}

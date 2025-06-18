import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { CompanyType } from '../../../../core/shared/enums/company-type.enum';

@Entity({ name: 'companies' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 13 })
  cuit: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @CreateDateColumn({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'company_type', enum: CompanyType })
  companyType: CompanyType;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.company)
  transactions: TransactionEntity[];
}

import { Injectable } from '@nestjs/common';
import { CompanyRepositoryPort } from '../../core/domain/ports/outbound/company.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../database/sqlite/entities/company.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Company } from '../../core/domain/entities/company.entity';

@Injectable()
export class CompanyRepositoryAdapter implements CompanyRepositoryPort {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}

  findCompaniesStartedAfter(date: Date): Promise<Company[]> {
    return this.repository.findBy({
      startDate: MoreThanOrEqual(date),
    });
  }

  findCompaniesWithTransactionsAfter(date: Date): Promise<Company[]> {
    return this.repository.findBy({
      transactions: {
        transactionDate: MoreThanOrEqual(date),
      },
    });
  }

  save(company: Company): Promise<Company> {
    return this.repository.save(company);
  }
}

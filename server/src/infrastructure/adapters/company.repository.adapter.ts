import { Injectable } from '@nestjs/common';
import { CompanyRepositoryPort } from '../../core/domain/ports/outbound/company.repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../database/sqlite/entities/company.entity';
import { MoreThanOrEqual, Repository, QueryFailedError } from 'typeorm';
import { Company } from '../../core/domain/entities/company.entity';
import { CompanyRepositoryError } from '../shared/error/company-repository.error';

@Injectable()
export class CompanyRepositoryAdapter implements CompanyRepositoryPort {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}

  async findCompaniesStartedAfter(date: Date): Promise<Company[]> {
    try {
      return await this.repository.findBy({
        startDate: MoreThanOrEqual(date),
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findCompaniesWithTransactionsAfter(date: Date): Promise<Company[]> {
    try {
      return await this.repository.findBy({
        transactions: {
          transactionDate: MoreThanOrEqual(date),
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async save(company: Company): Promise<Company> {
    try {
      return await this.repository.save(company);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error instanceof QueryFailedError) {
      console.log(error.message);

      if (
        error.message.includes('UNIQUE') &&
        error.message.includes('companies.id')
      ) {
        throw new CompanyRepositoryError('id already in use');
      }

      if (
        error.message.includes('UNIQUE') &&
        error.message.includes('companies.cuit')
      ) {
        throw new CompanyRepositoryError('cuit already in use');
      }
    }

    console.error(error);

    throw new CompanyRepositoryError('Internal Error');
  }
}

import { Company } from '../../entities/company.entity';

export interface CompanyRepositoryPort {
  findCompaniesWithTransactionsAfter(date: Date): Promise<Company[]>;

  findCompaniesStartedAfter(date: Date): Promise<Company[]>;

  save(company: Company): Promise<Company>;
}

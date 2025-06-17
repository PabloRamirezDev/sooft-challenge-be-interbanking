import { Company } from '../domain/entities/company.entity';
import { QueryCompanyDTO } from '../shared/dto/QueryCompany.dto';

export interface CompanyGetter {
  /**
   * @returns List of companies that match the specified criteria.
   */
  getCompanies(query: QueryCompanyDTO): Promise<Company[]>;
}

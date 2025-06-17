import { CreateCompanyDTO } from '../shared/dto/CreateCompany.dto';

export interface CompanyCreator {
  /**
   * @returns ID of the created company.
   */
  createCompany(company: CreateCompanyDTO): Promise<string>;
}

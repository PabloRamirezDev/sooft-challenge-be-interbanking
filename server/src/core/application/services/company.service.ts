import { CreateCompanyDTO } from '../../shared/dto/CreateCompany.dto';
import { CompanyCreator } from '../company-creator.usecase';
import { CompanyServicePort } from '../../domain/ports/inbound/company.service.port';
import { Company } from '../../domain/entities/company.entity';
import { CompanyGetter } from '../company-getter.usecase';
import { QueryCompanyDTO } from '../../shared/dto/QueryCompany.dto';
import { CompanyApplicationError } from '../../shared/error/company-application.error';

export class CompanyService implements CompanyCreator, CompanyGetter {
  public constructor(private company: CompanyServicePort) {}

  async createCompany(companyDto: CreateCompanyDTO): Promise<string> {
    const company = Company.create(
      companyDto.companyName,
      companyDto.cuit,
      companyDto.companyType,
    );

    const { id } = await this.company.save(company);

    return id;
  }

  async getCompanies(query: QueryCompanyDTO): Promise<Company[]> {
    const { startedAfter, withTransfersAfter } = query;

    if (startedAfter) {
      return this.company.findCompaniesStartedAfter(startedAfter);
    } else if (withTransfersAfter) {
      return this.company.findCompaniesWithTransactionsAfter(
        withTransfersAfter,
      );
    }

    throw new CompanyApplicationError('Not supported');
  }
}

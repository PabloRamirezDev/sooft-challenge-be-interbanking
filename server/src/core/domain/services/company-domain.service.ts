import { CompanyDomainError } from '../../shared/error/company-domain.error';
import { Company } from '../entities/company.entity';
import { CompanyServicePort } from '../ports/inbound/company.service.port';
import { CompanyRepositoryPort } from '../ports/outbound/company.repository.port';

export class CompanyDomainService implements CompanyServicePort {
  public constructor(private repository: CompanyRepositoryPort) {}

  public findCompaniesStartedAfter(date: Date): Promise<Company[]> {
    if (!this.validatePreviousDate(date)) {
      throw new CompanyDomainError('Date must be previous than current date');
    }

    return this.repository.findCompaniesStartedAfter(date);
  }

  public findCompaniesWithTransactionsAfter(date: Date): Promise<Company[]> {
    if (!this.validatePreviousDate(date)) {
      throw new CompanyDomainError('Date must be previous than current date');
    }

    return this.repository.findCompaniesWithTransactionsAfter(date);
  }

  public save(company: Company): Promise<Company> {
    this.validateCompany(company);

    return this.repository.save(company);
  }

  private validatePreviousDate(date: Date) {
    return date.getTime() <= Date.now();
  }

  private validateCompany(company: Company) {
    const { companyName, cuit } = company;

    if (typeof cuit !== 'string' || !this.validateCuit(cuit)) {
      throw new CompanyDomainError(
        'cuit must be a valid string and have the required format',
      );
    }

    if (typeof companyName !== 'string') {
      throw new CompanyDomainError('companyName must be a string');
    }
  }

  private validateCuit(cuit: string): boolean {
    if (cuit.length !== 13 || !/^\d{2}-\d{8}-\d$/.test(cuit)) {
      return false;
    }

    const base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    cuit = cuit.replace(/-/g, '');

    let aux = 0;
    for (let i = 0; i < 10; i++) {
      aux += parseInt(cuit[i], 10) * base[i];
    }

    aux = 11 - (aux - Math.floor(aux / 11) * 11);

    if (aux === 11) {
      aux = 0;
    }
    if (aux === 10) {
      aux = 9;
    }

    return aux === parseInt(cuit[10], 10);
  }
}

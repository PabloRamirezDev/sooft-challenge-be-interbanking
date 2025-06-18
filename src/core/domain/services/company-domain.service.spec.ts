import { Company } from '../entities/company.entity';
import { CompanyDomainService } from './company-domain.service';

const CompanyRepositoryMock = (
  company: Company,
  multipleCompanies: Company[],
) => {
  return {
    findCompaniesWithTransactionsAfter: jest
      .fn()
      .mockResolvedValue(multipleCompanies),
    findCompaniesStartedAfter: jest.fn().mockResolvedValue(multipleCompanies),
    save: jest.fn().mockResolvedValue(company),
  };
};

describe('CompanyDomainService', () => {
  let service: CompanyDomainService;
  let repositoryMock;
  const company = {
    id: '12345',
    companyName: 'Company X',
    cuit: '12-34567890-3',
    startDate: new Date(),
  } as Company;
  const multipleCompanies = [company] as Company[];

  beforeEach(() => {
    repositoryMock = CompanyRepositoryMock(company, multipleCompanies);
    service = new CompanyDomainService(repositoryMock);
  });

  describe('findCompaniesStartedAfter', () => {
    it('should return companies from repository.findCompaniesStartedAfter when date is previous than current date', () => {
      const date = new Date(Date.now() - 24 * 3600 * 1000);

      expect(service.findCompaniesStartedAfter(date)).resolves.toBe(
        multipleCompanies,
      );
      expect(repositoryMock.findCompaniesStartedAfter).toHaveBeenCalledWith(
        date,
      );
    });

    it('should throw error when date is equal or after current date', () => {
      const date = new Date(Date.now() + 5 * 1000);

      expect(() => service.findCompaniesStartedAfter(date)).toThrow(Error);
    });
  });

  describe('findCompaniesWithTransactionsAfter', () => {
    it('should return companies from repository.findCompaniesWithTransactionsAfter when date is previous than current date', () => {
      const date = new Date(Date.now() - 24 * 3600 * 1000);

      expect(service.findCompaniesWithTransactionsAfter(date)).resolves.toBe(
        multipleCompanies,
      );
      expect(
        repositoryMock.findCompaniesWithTransactionsAfter,
      ).toHaveBeenCalledWith(date);
    });

    it('should throw error when date is equal or after current date', () => {
      const date = new Date(Date.now() + 5 * 1000);

      expect(() => service.findCompaniesWithTransactionsAfter(date)).toThrow(
        Error,
      );
    });
  });

  describe('save', () => {
    it('should save company calling repository.save and return created company', () => {
      expect(service.save(company)).resolves.toBe(company);
      expect(repositoryMock.save).toHaveBeenCalledWith(company);
    });

    it('should throw error when cuit is not a string', () => {
      expect(() => service.save({ ...company, cuit: 12345 } as any)).toThrow(
        Error,
      );
    });

    it('should throw error when cuit has an valid format', () => {
      expect(() =>
        service.save({ ...company, cuit: '1234567890' } as any),
      ).toThrow(Error);
    });

    it('should throw error when last cuit digit does not match to the generated one', () => {
      expect(() =>
        service.save({ ...company, cuit: '12-34567890-1' } as any),
      ).toThrow(Error);
    });

    it('should throw error when companyName is not a string', () => {
      expect(() =>
        service.save({ ...company, companyName: ['name'] } as any),
      ).toThrow(Error);
    });
  });
});

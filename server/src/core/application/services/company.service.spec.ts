import { CompanyServicePort } from '../../domain/ports/inbound/company.service.port';
import { CompanyService } from './Company.service';
import { Company } from '../../domain/entities/company.entity';
import { CompanyApplicationError } from '../../shared/error/company-application.error';
import { CompanyType } from '../../shared/enums/company-type.enum';

const CompanyServicePortMock = (companies: Company[]) => ({
  save: jest.fn().mockResolvedValue({ id: '2' }),
  findCompaniesStartedAfter: jest.fn().mockResolvedValue(companies),
  findCompaniesWithTransactionsAfter: jest.fn().mockResolvedValue(companies),
});

describe('CompanyService', () => {
  let service: CompanyService;
  let adapterMock: CompanyServicePort;

  const companies = [
    {
      id: '1',
      companyName: 'test',
      cuit: '11-11111111-1',
      startDate: new Date(),
      companyType: CompanyType.SME,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    adapterMock = CompanyServicePortMock(companies);
    service = new CompanyService(adapterMock);
  });

  describe('createCompany', () => {
    const company = {
      companyName: 'test',
      cuit: '22-22222222-2',
      companyType: CompanyType.SME,
    };

    it('should create a new instance of Company', async () => {
      const createCompany = jest.spyOn(Company, 'create');

      await service.createCompany(company);

      expect(createCompany).toHaveBeenCalledWith(
        company.companyName,
        company.cuit,
        company.companyType,
      );
    });

    it('should pass an instance of Company to the save method of the port', async () => {
      await service.createCompany(company);

      expect(adapterMock.save).toHaveBeenCalledWith(expect.any(Company));
      expect(adapterMock.save).toHaveBeenCalledWith(
        expect.objectContaining({
          companyName: company.companyName,
          cuit: company.cuit,
        }),
      );
    });

    it('should return the id of the created company', async () => {
      const id = await service.createCompany(company);

      expect(id).toBe('2');
    });
  });

  describe('getCompanies', () => {
    it('should retrieve companies by startedAfter if specified', async () => {
      const query = { startedAfter: new Date() };

      const result = await service.getCompanies(query);

      expect(adapterMock.findCompaniesStartedAfter).toHaveBeenCalledWith(
        query.startedAfter,
      );
      expect(result).toBe(companies);
    });

    it('should retrieve companies by withTransfersAfter if specified', async () => {
      const query = { withTransfersAfter: new Date() };

      const result = await service.getCompanies(query);

      expect(
        adapterMock.findCompaniesWithTransactionsAfter,
      ).toHaveBeenCalledWith(query.withTransfersAfter);
      expect(result).toBe(companies);
    });

    it('should throw an error if passed neither startedAfter nor withTransfersAfter', () => {
      const query = {};

      expect(() => service.getCompanies(query)).rejects.toThrow(
        CompanyApplicationError,
      );
    });
  });
});

import { Repository } from 'typeorm';
import { CompanyRepositoryAdapter } from './company.repository.adapter';
import { CompanyType } from '../../core/shared/enums/company-type.enum';

describe('CompanyRepositoryAdapter', () => {
  let adapter: CompanyRepositoryAdapter;
  let repositoryMock: jest.Mocked<Repository<any>>;

  beforeEach(() => {
    repositoryMock = {
      findBy: jest.fn(),
      save: jest.fn(),
    } as any;

    adapter = new CompanyRepositoryAdapter(repositoryMock);
  });

  describe('findCompaniesStartedAfter', () => {
    it('should call findBy with startDate filter', async () => {
      const date = new Date();

      const expected = [{ id: '1', companyName: 'Test 1' }];
      repositoryMock.findBy.mockResolvedValue(expected);

      const result = await adapter.findCompaniesStartedAfter(date);

      expect(repositoryMock.findBy).toHaveBeenCalledWith({
        startDate: expect.any(Object),
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findCompaniesWithTransactionsAfter', () => {
    it('should call findBy with transactionDate filter', async () => {
      const date = new Date();

      const expected = [{ id: '2', companyName: 'Test 2' }];
      repositoryMock.findBy.mockResolvedValue(expected);

      const result = await adapter.findCompaniesWithTransactionsAfter(date);

      expect(repositoryMock.findBy).toHaveBeenCalledWith({
        transactions: {
          transactionDate: expect.any(Object),
        },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('save', () => {
    it('should save a company', async () => {
      const company = {
        id: '3',
        companyName: 'Test 3',
        cuit: '33-33333333-3',
        startDate: new Date(),
        companyType: CompanyType.Corporate,
      };

      repositoryMock.save.mockResolvedValue(company);

      const result = await adapter.save(company);

      expect(repositoryMock.save).toHaveBeenCalledWith(company);
      expect(result).toEqual(company);
    });
  });
});

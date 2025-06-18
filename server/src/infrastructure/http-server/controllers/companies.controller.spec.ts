import { Test } from '@nestjs/testing';
import { CompaniesController } from './Companies.controller';
import { COMPANY_SERVICE } from '../../../core/core.module';
import { BadRequestException } from '@nestjs/common';
import { CompanyType } from '../../../core/shared/enums/company-type.enum';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let companyCreatorMock: any;
  let companyGetterMock: any;

  beforeEach(async () => {
    companyCreatorMock = {
      createCompany: jest.fn(),
    };

    companyGetterMock = {
      getCompanies: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: COMPANY_SERVICE,
          useValue: {
            ...companyCreatorMock,
            ...companyGetterMock,
          },
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  describe('createCompany', () => {
    it('should call companyCreator.createCompany with the body params', async () => {
      const dto = {
        cuit: '11-11111111-1',
        companyName: 'test',
        companyType: CompanyType.SME,
      };
      companyCreatorMock.createCompany.mockResolvedValue('1');

      const result = await controller.createCompany(dto);

      expect(companyCreatorMock.createCompany).toHaveBeenCalledWith(dto);
      expect(result).toEqual('1');
    });
  });

  describe('listCompanies', () => {
    it('should call companyGetter.getCompanies if only startedAfter is provided', async () => {
      const query = { startedAfter: new Date() };

      const expected = [{ id: '1', companyName: 'test' }];
      companyGetterMock.getCompanies.mockResolvedValue(expected);

      const result = await controller.listCompanies(query);

      expect(companyGetterMock.getCompanies).toHaveBeenCalledWith({
        startedAfter: query.startedAfter,
        withTransfersAfter: undefined,
      });
      expect(result).toEqual(expected);
    });

    it('should call companyGetter.getCompanies if only withTransfersAfter is provided', async () => {
      const query = { withTransfersAfter: new Date() };

      const expected = [{ id: '1', companyName: 'test' }];
      companyGetterMock.getCompanies.mockResolvedValue(expected);

      const result = await controller.listCompanies(query);

      expect(companyGetterMock.getCompanies).toHaveBeenCalledWith({
        withTransfersAfter: query.withTransfersAfter,
        startedAfter: undefined,
      });
      expect(result).toEqual(expected);
    });

    it('should throw BadRequestException if both filters are provided', () => {
      const query = {
        startedAfter: new Date(),
        withTransfersAfter: new Date(),
      };

      expect(() => controller.listCompanies(query)).toThrow(
        BadRequestException,
      );
    });
  });
});

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CompanyCreator } from '../../../core/application/company-creator.usecase';
import { COMPANY_SERVICE } from '../../../core/core.module';
import { CompanyGetter } from '../../../core/application/company-getter.usecase';
import { CreateCompanyDTO } from '../../../core/shared/dto/CreateCompany.dto';
import { QueryCompanyDTO } from '../../../core/shared/dto/QueryCompany.dto';
import { CompaniesExceptionFilter } from '../exception-filters/companies.filter';

@Controller('/companies')
@UseFilters(CompaniesExceptionFilter)
export class CompaniesController {
  constructor(
    @Inject(COMPANY_SERVICE) private readonly companyCreator: CompanyCreator,
    @Inject(COMPANY_SERVICE) private readonly companyGetter: CompanyGetter,
  ) {}

  @Post()
  public createCompany(@Body() company: CreateCompanyDTO) {
    return this.companyCreator.createCompany(company);
  }

  @Get()
  public listCompanies(@Query() query: QueryCompanyDTO) {
    const { startedAfter, withTransfersAfter } = query;

    if (startedAfter && withTransfersAfter) {
      throw new BadRequestException(
        'Cannot filter by startedAfter and withTransfersAfter simultaneously',
      );
    } else {
      return this.companyGetter.getCompanies({
        startedAfter,
        withTransfersAfter,
      });
    }
  }
}

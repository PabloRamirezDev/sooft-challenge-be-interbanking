import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { CompanyCreator } from '../../../core/application/company-creator.usecase';
import { COMPANY_SERVICE } from '../../../core/core.module';
import { CompanyGetter } from 'src/core/application/company-getter.usecase';
import { CreateCompanyDTO } from 'src/core/shared/dto/CreateCompany.dto';
import { QueryCompanyDTO } from 'src/core/shared/dto/QueryCompany.dto';

@Controller('/companies')
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

import { IsEnum, IsString } from 'class-validator';
import { CompanyType } from '../enums/company-type.enum';

export class CreateCompanyDTO {
  @IsString()
  companyName: string;

  @IsString()
  cuit: string;

  @IsEnum(CompanyType)
  companyType: CompanyType;
}

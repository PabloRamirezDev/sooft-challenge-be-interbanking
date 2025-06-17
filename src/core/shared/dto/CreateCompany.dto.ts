import { IsString } from 'class-validator';

export class CreateCompanyDTO {
  @IsString()
  companyName: string;

  @IsString()
  cuit: string;
}

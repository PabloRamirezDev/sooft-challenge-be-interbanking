import { CompanyType } from '../../shared/enums/company-type.enum';

export class Company {
  public id: string;
  public cuit: string;
  public companyName: string;
  public startDate: Date;
  public companyType: CompanyType;

  static create(companyName: string, cuit: string, companyType: CompanyType) {
    const company = new Company();

    company.companyName = companyName;
    company.cuit = cuit;
    company.startDate = new Date();
    company.companyType = companyType;

    return company;
  }
}

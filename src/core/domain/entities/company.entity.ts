export class Company {
  public id: string;
  public cuit: string;
  public companyName: string;
  public startDate: Date;

  static create(companyName: string, cuit: string) {
    const company = new Company();

    company.companyName = companyName;
    company.cuit = cuit;
    company.startDate = new Date();

    return company;
  }
}

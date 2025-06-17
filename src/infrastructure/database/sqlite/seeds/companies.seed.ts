import { CompanyEntity } from '../entities/company.entity';

export const companies = [
  {
    id: '795eeb9c-f477-4e0a-9df7-9274f48a38f1',
    companyName: 'Google',
    cuit: '11-11111111-1',
    startDate: new Date(),
  },
  {
    id: '8f94b52b-850b-4032-bbc6-47bf6c29825f',
    companyName: 'Apple',
    cuit: '22-22222222-2',
    startDate: new Date(),
  },
  {
    id: 'fe3570d5-5a36-45d8-a647-b4dea844eaf1',
    companyName: 'Netflix',
    cuit: '33-33333333-3',
    startDate: new Date(),
  },
] as CompanyEntity[];

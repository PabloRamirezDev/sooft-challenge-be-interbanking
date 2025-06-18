import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { COMPANY_SERVICE } from '../src/core/core.module';
import { CompanyService } from '../src/core/application/services/Company.service';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  const companyApplicationMock = {
    createCompany: jest.fn(),
    getCompanies: jest.fn(),
  } as unknown as jest.Mocked<CompanyService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(COMPANY_SERVICE)
      .useValue(companyApplicationMock)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  test('GET /companies', () => {
    return request(app.getHttpServer()).get('/companies').expect(400);
  });

  test('GET /companies?startedAfter=[datestring]', () => {
    const companies = [
      {
        id: '1',
        cuit: '11-11111111-1',
        companyName: 'test 1',
        startDate: new Date(),
      },
    ];

    companyApplicationMock.getCompanies.mockResolvedValueOnce(companies);

    return request(app.getHttpServer())
      .get('/companies')
      .query({
        startedAfter: new Date(
          Date.now() - 30 * 24 * 3600 * 1000,
        ).toISOString(),
      })
      .expect(200)
      .expect(
        companies.map((company) => ({
          ...company,
          startDate: company.startDate.toISOString(),
        })),
      );
  });

  test('GET /companies?startedAfter=last-month', () => {
    const companies = [
      {
        id: '2',
        cuit: '22-22222222-2',
        companyName: 'test 2',
        startDate: new Date(),
      },
    ];

    companyApplicationMock.getCompanies.mockResolvedValueOnce(companies);

    return request(app.getHttpServer())
      .get('/companies')
      .query({ startedAfter: 'last-month' })
      .expect(200)
      .expect(
        companies.map((company) => ({
          ...company,
          startDate: company.startDate.toISOString(),
        })),
      );
  });

  test('GET /companies?withTransfersAfter=[datestring]', () => {
    const companies = [
      {
        id: '3',
        cuit: '33-33333333-3',
        companyName: 'test 3',
        startDate: new Date(),
      },
    ];

    companyApplicationMock.getCompanies.mockResolvedValueOnce(companies);

    return request(app.getHttpServer())
      .get('/companies')
      .query({
        withTransfersAfter: new Date(
          Date.now() - 30 * 24 * 3600 * 1000,
        ).toISOString(),
      })
      .expect(200)
      .expect(
        companies.map((company) => ({
          ...company,
          startDate: company.startDate.toISOString(),
        })),
      );
  });

  test('GET /companies?withTransfersAfter=last-month', () => {
    const companies = [
      {
        id: '4',
        cuit: '44-44444444-4',
        companyName: 'test 4',
        startDate: new Date(),
      },
    ];

    companyApplicationMock.getCompanies.mockResolvedValueOnce(companies);

    return request(app.getHttpServer())
      .get('/companies')
      .query({ withTransfersAfter: 'last-month' })
      .expect(200)
      .expect(
        companies.map((company) => ({
          ...company,
          startDate: company.startDate.toISOString(),
        })),
      );
  });

  test('GET /companies?startedAfter&withTransfersAfter', () => {
    return request(app.getHttpServer())
      .get('/companies')
      .query({ startedAfter: 'last-month', withTransfersAfter: 'last-month' })
      .expect(400);
  });

  test('POST /companies (empty body)', () => {
    return request(app.getHttpServer()).post('/companies').send({}).expect(400);
  });

  test('POST /companies (valid body)', () => {
    const newCompany = { companyName: 'test 1', cuit: '11-11111111-1' };

    companyApplicationMock.createCompany.mockResolvedValueOnce('aaa');

    return request(app.getHttpServer())
      .post('/companies')
      .send(newCompany)
      .expect(201)
      .expect('aaa')
      .expect(() => {
        expect(companyApplicationMock.createCompany).toHaveBeenCalledWith(
          newCompany,
        );
      });
  });
});

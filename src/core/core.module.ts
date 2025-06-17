import { DynamicModule, Module, Type } from '@nestjs/common';
import { CompanyDomainService } from './domain/services/company-domain.service';
import { CompanyService } from './application/services/Company.service';
import { CompanyRepositoryPort } from './domain/ports/outbound/company.repository.port';

export type CoreModuleOptions = {
  modules: Type[];
  adapters: {
    companyRepository: Type<CompanyRepositoryPort>;
  };
};

export const COMPANY_SERVICE = Symbol('COMPANY_SERVICE');
export const COMPANY_DOMAIN_SERVICE = Symbol('COMPANY_DOMAIN_SERVICE');

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    const { adapters, modules } = options;
    const { companyRepository } = adapters;

    const CompanyServiceProvider = {
      provide: COMPANY_SERVICE,
      useFactory(company: CompanyDomainService) {
        return new CompanyService(company);
      },
      inject: [COMPANY_DOMAIN_SERVICE],
    };

    const CompanyDomainServiceProvider = {
      provide: COMPANY_DOMAIN_SERVICE,
      useFactory(repository: CompanyRepositoryPort) {
        return new CompanyDomainService(repository);
      },
      inject: [companyRepository],
    };

    return {
      module: CoreModule,
      global: true,
      imports: [...modules],
      providers: [CompanyServiceProvider, CompanyDomainServiceProvider],
      exports: [COMPANY_SERVICE],
    };
  }
}

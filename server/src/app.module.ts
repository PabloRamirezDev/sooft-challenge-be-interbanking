import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CompanyRepositoryAdapter } from './infrastructure/adapters/company.repository.adapter';

@Module({
  imports: [
    InfrastructureModule,
    CoreModule.register({
      modules: [InfrastructureModule],
      adapters: {
        companyRepository: CompanyRepositoryAdapter,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

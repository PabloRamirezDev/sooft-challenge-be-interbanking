import { Module } from '@nestjs/common';
import { SQLiteDatabaseModule } from './database/sqlite/sqlite-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './database/sqlite/entities/company.entity';
import { CompanyRepositoryAdapter } from './adapters/company.repository.adapter';
import { HttpServerModule } from './http-server/http-server.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SQLiteDatabaseModule,
    HttpServerModule,
    TypeOrmModule.forFeature([CompanyEntity]),
    SharedModule,
  ],
  providers: [CompanyRepositoryAdapter],
  exports: [CompanyRepositoryAdapter],
})
export class InfrastructureModule {}

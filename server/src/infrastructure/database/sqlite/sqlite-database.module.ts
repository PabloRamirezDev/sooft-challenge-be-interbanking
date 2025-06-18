import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseOptions } from './database-options';
import { CompanyEntity } from './entities/Company.entity';
import { TransactionEntity } from './entities/Transaction.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseOptions,
      inject: [ConfigService],
    }),
  ],
  providers: [CompanyEntity, TransactionEntity],
  exports: [],
})
export class SQLiteDatabaseModule {}

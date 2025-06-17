import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { ConfigService } from '@nestjs/config';

export const getDatabaseOptions = (
  configService?: ConfigService,
): TypeOrmModuleOptions => {
  const get = (key: string) => configService?.get(key) || process.env[key];

  return {
    type: 'sqlite',
    database: './db/database.db',
    synchronize: get('NODE_ENV') === 'development',
    entities: [CompanyEntity, TransactionEntity],
  };
};

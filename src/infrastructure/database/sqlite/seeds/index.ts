import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { companies } from './companies.seed';
import { config } from 'dotenv';
import { getDatabaseOptions } from '../database-options';
import { CompanyEntity } from '../entities/company.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { transactions } from './transactions.seed';

config();

const AppDataSource = new DataSource(getDatabaseOptions() as DataSourceOptions);

async function seed() {
  console.log('Seeding Database...');

  await AppDataSource.initialize();

  await seedEntities(AppDataSource.getRepository(CompanyEntity), companies);
  await seedEntities(
    AppDataSource.getRepository(TransactionEntity),
    transactions,
  );
}

async function seedEntities<T>(repository: Repository<T>, entities: T[]) {
  for (const entityData of entities) {
    const entity = repository.create(entityData);

    await repository.save(entity);
  }

  console.log(`✅ Seeded ${repository.metadata.tableName}`);
}

seed()
  .then(async () => {
    console.log('Seeding Completed');
  })
  .catch(async (err) => {
    console.error('Seeding Failed', err);
  })
  .finally(async () => {
    await AppDataSource.destroy();
  });

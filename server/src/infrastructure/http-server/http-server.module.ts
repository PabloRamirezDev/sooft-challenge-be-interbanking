import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/Companies.controller';

@Module({
  controllers: [CompaniesController],
})
export class HttpServerModule {}

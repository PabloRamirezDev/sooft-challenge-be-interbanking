import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CompanyApplicationError } from '../../../core/shared/error/company-application.error';

@Catch(CompanyApplicationError)
export class CompaniesExceptionFilter implements ExceptionFilter {
  catch(exception: CompanyApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}

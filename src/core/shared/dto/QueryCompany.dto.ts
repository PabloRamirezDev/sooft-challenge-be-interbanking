import { IsDate, ValidateIf } from 'class-validator';
import { DatePreset } from '../enums/custom-date.enum';
import { Transform } from 'class-transformer';
import { parseDatePreset } from '../util';

export class QueryCompanyDTO {
  @ValidateIf((query) => !query.withTransfersAfter)
  @Transform(({ value }) => parseDatePreset(value))
  @IsDate({
    message: `startedAfter must be a valid date string or one of [${Object.values(DatePreset)}]`,
  })
  startedAfter?: Date;

  @ValidateIf((query) => !query.startedAfter)
  @Transform(({ value }) => parseDatePreset(value))
  @IsDate({
    message: `withTransfersAfter must be a valid date string or one of [${Object.values(DatePreset)}]`,
  })
  withTransfersAfter?: Date;
}

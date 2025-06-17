import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { DatePreset } from '../enums/custom-date.enum';

export function IsPresetOrCustomDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPresetOrCustomDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const enumValues = Object.values(DatePreset) as string[];
          const isEnum = enumValues.includes(value);
          const isDate = !isNaN(Date.parse(value));

          return isEnum || isDate;
        },
        defaultMessage(args: ValidationArguments) {
          const enumValues = Object.values(DatePreset).join(', ');
          return `${args.property} must be a valid date string or one of: [${enumValues}]`;
        },
      },
    });
  };
}

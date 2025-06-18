import { DatePreset } from './enums/custom-date.enum';

export function parseDatePreset(value: string): Date | undefined {
  if (!value) return undefined;

  const now = new Date();

  switch (value) {
    case DatePreset.LastMonth:
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    default:
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
  }
}

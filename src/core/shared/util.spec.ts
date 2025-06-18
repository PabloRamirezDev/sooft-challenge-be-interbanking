import { DatePreset } from './enums/custom-date.enum';
import { parseDatePreset } from './util';

describe('util', () => {
  describe('parseDatePreset', () => {
    it('should return undefined if input string is empty', () => {
      expect(parseDatePreset('')).toBeUndefined();
    });

    it('should return a Date representing the custom datestring parameter if passed', () => {
      const dateString = '2022-12-21T13:07:30Z';

      expect(parseDatePreset(dateString)).toStrictEqual(new Date(dateString));
    });

    it('should return a Date representing a month ago if passed the last-month value', () => {
      const now = new Date();

      const result = parseDatePreset(DatePreset.LastMonth);

      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeGreaterThanOrEqual(
        new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
          0,
        ).getTime(),
      );
      expect(result.getTime()).toBeLessThanOrEqual(
        new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
          1,
        ).getTime(),
      );
    });
  });
});

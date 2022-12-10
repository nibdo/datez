import { DateTime } from 'luxon';
import timezoneSoft from 'timezone-soft';

const getCorrectTimezone = (timezone: string) => {
  switch (timezone) {
    case 'Central Europe Standard Time':
      return 'Central European Standard Time';
    case 'Central Europe Time':
      return 'Central European Time';
    default:
      return timezone;
  }
};

const getSoftTimezone = (timezone: string) => {
  const result = timezoneSoft(getCorrectTimezone(timezone));

  return result?.[0]?.iana;
};

export default class Datez {
  public static fromFormat(
    baseDate: string,
    format: string,
    data: {
      zone: string;
    }
  ) {
    const { zone } = data;
    const date = DateTime.fromFormat(baseDate, format, {
      zone,
    });

    if (date.invalidReason === 'unsupported zone') {
      const softedTimezone = getSoftTimezone(zone);

      if (!softedTimezone) {
        return date;
      }

      return DateTime.fromFormat(baseDate, format, {
        zone: softedTimezone,
      });
    }

    return date;
  }

  public static fromDate(
    baseDate: Date,
    data: {
      zone: string;
    }
  ) {
    const { zone } = data;
    const date = DateTime.fromJSDate(baseDate, {
      zone,
    });

    if (date.invalidReason === 'unsupported zone') {
      const softedTimezone = getSoftTimezone(zone);

      if (!softedTimezone) {
        return date;
      }

      return DateTime.fromJSDate(baseDate, {
        zone: softedTimezone,
      });
    }

    return date;
  }

  public static fromISO(
    baseDate: string,
    data: {
      zone: string;
    }
  ) {
    const { zone } = data;
    const date = DateTime.fromISO(baseDate, {
      zone,
    });

    if (date.invalidReason === 'unsupported zone') {
      const softedTimezone = getSoftTimezone(zone);

      if (!softedTimezone) {
        return date;
      }

      return DateTime.fromISO(baseDate, {
        zone: softedTimezone,
      });
    }

    return date;
  }

  public static setZone(date: DateTime, zone: string) {
    const result = date.setZone(zone);

    if (result.invalidReason === 'unsupported zone') {
      const softedTimezone = getSoftTimezone(zone);

      if (!softedTimezone) {
        return date;
      }

      return date.setZone(softedTimezone);
    }

    return result;
  }
}

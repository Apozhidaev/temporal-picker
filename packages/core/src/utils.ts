import { DateTime, DateTimeUnit, DurationLikeObject, Duration } from "luxon";
import { PlainType } from "./types";

export type PlainUnits = {
  plain?: PlainType;
  same: DateTimeUnit;
  diff: DateTimeUnit;
  entry: DateTimeUnit;
  step: DurationLikeObject;
  unit: DurationLikeObject;
  duration: "months" | "days";
  getStep: (n: number) => DurationLikeObject;
};

const plainUnits = {
  month: {
    plain: "month",
    same: "month",
    diff: "month",
    entry: "year",
    step: { year: 1 },
    unit: { month: 1 },
    duration: "months",
    getStep: (n = 1) => ({ year: n }),
  } as PlainUnits,
  date: {
    plain: "date",
    same: "day",
    diff: "day",
    entry: "month",
    step: { month: 1 },
    unit: { day: 1 },
    duration: "days",
    getStep: (n = 1) => ({ month: n }),
  } as PlainUnits,
};

export function getPlainUnits(plain?: PlainType): PlainUnits {
  switch (plain) {
    case "month":
      return {
        plain,
        same: "month",
        diff: "month",
        entry: "year",
        step: { year: 1 },
        unit: { month: 1 },
        duration: "months",
        getStep: (n = 1) => ({ year: n }),
      };

    default:
      return {
        plain,
        same: "day",
        diff: "day",
        entry: "month",
        step: { month: 1 },
        unit: { day: 1 },
        duration: "days",
        getStep: (n = 1) => ({ month: n }),
      };
  }
}

export function toInstant(dt: DateTime, plain?: PlainType): string {
  switch (plain) {
    case "month":
      return dt.toFormat("yyyy-LL");

    default:
      return dt.toISODate()!;
  }
}

export function datesIsNotAvailable(
  min: DateTime | undefined,
  max: DateTime | undefined,
  ...dates: (DateTime | undefined)[]
): boolean {
  if (min) {
    if (dates.filter(Boolean).some((date) => date! < min)) {
      return true;
    }
  }
  if (max) {
    if (dates.filter(Boolean).some((date) => date! > max)) {
      return true;
    }
  }
  return false;
}

export function dt(plain: PlainType = "date") {
  const utils = plain === "month" ? plainUnits.month : plainUnits.date;
  return {
    sameDate: (date1: DateTime | undefined, date2: DateTime | undefined) => {
      if (!date1 && !date2) {
        return true;
      }
      if (date1 === date2) {
        return true;
      }
      if (!date1 || !date2) {
        return false;
      }
      return date1.hasSame(date2, utils.same);
    },
    toInstant: (date: DateTime) => {
      switch (plain) {
        case "month":
          return date.toFormat("yyyy-LL");

        default:
          return date.toISODate()!;
      }
    },
  };
}

export function t(plain: PlainType = "date") {
  const utils = plain === "month" ? plainUnits.month : plainUnits.date;
  return {
    entry: () => dt(plain).toInstant(DateTime.now().startOf(utils.entry)),
    instant: (instant: string) =>
      dt(plain).toInstant(DateTime.fromISO(instant)),
    startOf: (instant: string, shift = 0) =>
      dt(plain).toInstant(
        DateTime.fromISO(instant)
          .startOf(utils.entry)
          .minus(utils.getStep(shift))
      ),
    next: (entry: string) =>
      dt(plain).toInstant(DateTime.fromISO(entry).plus(utils.step)),
    previous: (entry: string) =>
      dt(plain).toInstant(DateTime.fromISO(entry).minus(utils.step)),
    nextUnit: (instant: string) =>
      dt(plain).toInstant(DateTime.fromISO(instant).plus(utils.unit)),
    diff: (start: string, end: string) =>
      DateTime.fromISO(end).diff(DateTime.fromISO(start), utils.diff)[
        utils.duration
      ] + 1,
    durationRecord: (obj?: {
      [key in typeof utils.duration]?: Record<string, string>;
    }) => obj?.[utils.duration],
  };
}

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
    sameRanges: (
      range1: (DateTime | undefined)[],
      range2: (DateTime | undefined)[]
    ) => {
      const r1 = range1.filter(Boolean).sort();
      const r2 = range2.filter(Boolean).sort();
      if (r1.length !== r2.length) {
        return false;
      }
      for (let i = 0; i < r1.length; i++) {
        const date1 = r1[i]!;
        const date2 = r2[i]!;
        if (!date1.hasSame(date2, utils.same)) {
          return false;
        }
      }
      return true;
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

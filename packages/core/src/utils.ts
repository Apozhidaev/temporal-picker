import { DateTime, DateTimeUnit, DurationLikeObject } from "luxon";
import { PlainType } from "./types";

type PlainUnits = {
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

export function t(plain: PlainType | undefined) {
  const utils = plain === "month" ? plainUnits.month : plainUnits.date;
  return {
    toInstant: (date: DateTime) => {
      switch (plain) {
        case "month":
          return date.toFormat("yyyy-LL");

        default:
          return date.toISODate()!;
      }
    },
    entry: () => t(plain).toInstant(DateTime.now().startOf(utils.entry)),
    instant: (instant: string) => t(plain).toInstant(DateTime.fromISO(instant)),
    startOf: (instant: string, shift = 0) =>
      t(plain).toInstant(
        DateTime.fromISO(instant).startOf(utils.entry).minus(utils.getStep(shift))
      ),
    next: (entry: string) => t(plain).toInstant(DateTime.fromISO(entry).plus(utils.step)),
    previous: (entry: string) => t(plain).toInstant(DateTime.fromISO(entry).minus(utils.step)),
    nextUnit: (instant: string) => t(plain).toInstant(DateTime.fromISO(instant).plus(utils.unit)),
    diff: (start: string, end: string, locale: string) =>
      DateTime.fromISO(end)
        .setLocale(locale)
        .diff(DateTime.fromISO(start), utils.diff)
        .plus(utils.unit)
        .toHuman(),
    toPicked: (values?: (string | undefined)[]): string[] => {
      if (!values) {
        return [];
      }
      const picked = (values.filter(Boolean) as string[]).map(t(plain).instant);
      picked.sort();
      return picked;
    },
    toPickedSlim: (values: (string | undefined)[]) => {
      const picked = values.filter(Boolean) as string[];
      picked.sort();
      return picked;
    },
    sameRanges: (range1: (DateTime | undefined)[], range2: (DateTime | undefined)[]) => {
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
    datesIsNotAvailable: (
      min: DateTime | undefined,
      max: DateTime | undefined,
      ...dates: (DateTime | undefined)[]
    ): boolean => {
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
    },
  };
}

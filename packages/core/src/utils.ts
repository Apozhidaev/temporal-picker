import { DateTime, DateTimeUnit, DurationLikeObject } from "luxon";
import { PlainType } from "./types";
import defaults from "./defaults";

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

export function toPickedSlim(values: (string | undefined)[], strict = true) {
  const picked = values.filter(Boolean) as string[]
  picked.sort();
  return picked;
}

export function dt(plain: PlainType = "date") {
  const utils = plain === "month" ? plainUnits.month : plainUnits.date;
  return {
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
    instant: (instant: string) => dt(plain).toInstant(DateTime.fromISO(instant)),
    startOf: (instant: string, shift = 0) =>
      dt(plain).toInstant(
        DateTime.fromISO(instant).startOf(utils.entry).minus(utils.getStep(shift))
      ),
    next: (entry: string) => dt(plain).toInstant(DateTime.fromISO(entry).plus(utils.step)),
    previous: (entry: string) => dt(plain).toInstant(DateTime.fromISO(entry).minus(utils.step)),
    nextUnit: (instant: string) => dt(plain).toInstant(DateTime.fromISO(instant).plus(utils.unit)),
    diff: (start: string, end: string, locale: string) =>
      DateTime.fromISO(end)
        .setLocale(locale)
        .diff(DateTime.fromISO(start), utils.diff)
        .plus(utils.unit)
        .toHuman(),
    toPicked: (values?: (string | undefined)[], strict = true): string[] => {
      if (!values) {
        return [];
      }
      if (strict) {
        const picked = (values.filter(Boolean) as string[]).map(t(plain).instant);
        picked.sort();
        return picked;
      }

      const picked = values.map((x) => (x ? t(plain).instant(x) : undefined));
      // remove last undefineds
      while (picked.length > 0 && picked.at(-1) === undefined) {
        picked.pop();
      }
      // sort with freeze undefined positions
      for (let i = 0, l = picked.length - 1; i < l; i++) {
        let min = picked[i];
        if (min === undefined) continue;
        for (let j = i + 1; j < picked.length; j++) {
          const current = picked[j];
          if (current === undefined) continue;
          if (current < min) {
            min = current;
          }
        }
        picked[i] = min;
      }
      return picked as string[];
    },
  };
}

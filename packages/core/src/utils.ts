import { DateTime, DateTimeUnit, DurationLikeObject, Duration } from "luxon";
import { PlainType } from "./types";

export type PlainUnits = {
  plain?: PlainType;
  same: DateTimeUnit;
  diff: DateTimeUnit;
  entry: DateTimeUnit;
  step: DurationLikeObject;
  duration: "months" | "days";
  getStep: (n: number) => DurationLikeObject;
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

/**
 * Checks availability date
 *
 * @param date
 * @param start
 * @returns Boolean
 */
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

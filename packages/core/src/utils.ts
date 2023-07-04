import { DateTime, DateTimeUnit, DurationLikeObject, Duration } from "luxon";
import { PlainType } from "./types";

export type PlainUnits = {
  plain?: PlainType;
  same: DateTimeUnit;
  diff: DateTimeUnit;
  entry: DateTimeUnit;
  step: DurationLikeObject;
  duration: 'months' | 'days';
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
        duration: 'months',
        getStep: (n = 1) => ({ year: n })
      };

    default:
      return {
        plain,
        same: "day",
        diff: "day",
        entry: "month",
        step: { month: 1 },
        duration: 'days',
        getStep: (n = 1) => ({ month: n })
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

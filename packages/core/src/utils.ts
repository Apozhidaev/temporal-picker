import { DateTime, DateTimeUnit, DurationLike } from "luxon";
import { PlainType } from "./types";

export type PlainUnits = {
  plain?: PlainType;
  same: DateTimeUnit;
  entry: DateTimeUnit;
  step: DurationLike;
};

export function getPlainUnits(plain?: PlainType): PlainUnits {
  switch (plain) {
    case "month":
      return {
        plain,
        same: "month",
        entry: "year",
        step: { year: 1 },
      };

    default:
      return {
        plain,
        same: "day",
        entry: "month",
        step: { month: 1 },
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

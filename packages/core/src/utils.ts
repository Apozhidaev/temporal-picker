import { DateTime, DateTimeUnit, DurationLike } from "luxon";
import { PlainType } from "./types";

export type PlainUnits = {
  plain?: PlainType;
  entry: DateTimeUnit;
  step: DurationLike;
};

export function getPlainUnits(plain?: PlainType): PlainUnits {
  switch (plain) {
    case "month":
      return {
        plain,
        entry: "year",
        step: { year: 1 },
      };

    default:
      return {
        plain,
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

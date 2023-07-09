import { DateTime, DateTimeUnit, DurationLikeObject } from "luxon";
import { PlainType } from "./types";


export function datesIsNotAvailable(
  min: DateTime | undefined,
  max: DateTime | undefined,
  ...dates: (DateTime | undefined)[]
) {
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

// ----------------------------------------

type PlainMeta = {
  unit: DateTimeUnit;
  entry: DateTimeUnit;
};

const plainMeta = {
  month: {
    unit: "month",
    entry: "year",
  } as PlainMeta,
  date: {
    unit: "day",
    entry: "month",
  } as PlainMeta,
};

type ThisType = ReturnType<typeof t>;

function ink(this: ThisType, n = 1): DurationLikeObject {
  return { [this.meta.unit]: n };
}

function page(this: ThisType, n = 1): DurationLikeObject {
  return { [this.meta.entry]: n };
}

function toInstant(this: ThisType, dt: DateTime) {
  switch (this.plain) {
    case "month":
      return dt.toFormat("yyyy-LL");

    default:
      return dt.toISODate()!;
  }
}

function instant(this: ThisType, value: string) {
  return this.toInstant(DateTime.fromISO(value));
}

function normalize(this: ThisType, value: string | undefined) {
  return value ? this.instant(value) : undefined;
}

function startOf(this: ThisType, instant: string, shift = 0) {
  return this.toInstant(DateTime.fromISO(instant).startOf(this.meta.entry).minus(this.page(shift)));
}

function next(this: ThisType, entry: string) {
  return this.toInstant(DateTime.fromISO(entry).plus(this.page()));
}

function previous(this: ThisType, entry: string) {
  return this.toInstant(DateTime.fromISO(entry).minus(this.page()));
}

function diff(this: ThisType, start: string, end: string, locale: string) {
  return DateTime.fromISO(end)
    .setLocale(locale)
    .diff(DateTime.fromISO(start), this.meta.unit)
    .plus(this.ink())
    .toHuman();
}

function sameRanges(
  this: ThisType,
  range1: (DateTime | undefined)[],
  range2: (DateTime | undefined)[]
) {
  const r1 = range1.filter(Boolean).sort();
  const r2 = range2.filter(Boolean).sort();
  if (r1.length !== r2.length) {
    return false;
  }
  for (let i = 0; i < r1.length; i++) {
    const date1 = r1[i]!;
    const date2 = r2[i]!;
    if (!date1.hasSame(date2, this.meta.unit)) {
      return false;
    }
  }
  return true;
}

export function t(plain?: PlainType) {
  const meta = plain === "month" ? plainMeta.month : plainMeta.date;
  return {
    meta,
    plain,
    ink,
    page,
    toInstant,
    instant,
    normalize,
    startOf,
    next,
    previous,
    diff,
    sameRanges,
  };
}

import { DateTime, DateTimeUnit, Duration, DurationLikeObject } from "luxon";
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
    case "datetime":
      return dt.toFormat(`yyyy-LL-dd'T'HH:mm`);
    case "time":
      return dt.toFormat("HH:mm");

    default:
      return dt.toFormat("yyyy-LL-dd");
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

function weekTitle(this: ThisType, locale: string) {
  return Duration.fromObject({ week: 1 }, { locale }).toHuman().replace("1", "").trim();
}

function sameDates(
  this: ThisType,
  date1: DateTime | undefined,
  date2: DateTime | undefined
) {
  if(!date1 && !date2){
    return true;
  }
  if(!date1 || !date2){
    return false;
  }
  return date1.hasSame(date2, this.meta.unit);
}

function sameRanges(
  this: ThisType,
  range1: (DateTime | undefined)[],
  range2: (DateTime | undefined)[]
) {
  if (range1.length !== range2.length) {
    return false;
  }
  for (let i = 0; i < range1.length; i++) {
    const date1 = range1[i];
    const date2 = range2[i];
    if (!this.sameDates(date1, date2)) {
      return false;
    }
  }
  return true;
}

function display(this: ThisType, value: string, locale: string) {
  const dt = DateTime.fromISO(value).setLocale(locale);
  if (this.plain === "month") {
    return dt.toFormat("LLLL yyyy");
  }
  return dt.toLocaleString();
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
    sameDates,
    sameRanges,
    display,
    weekTitle,
  };
}

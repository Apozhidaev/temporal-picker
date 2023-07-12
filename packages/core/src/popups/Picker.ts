import { DateTime } from "luxon";
import { PlainType } from "../types";
import { t } from "../utils";

function sortPicked(picked: (string | undefined)[]) {
  var n = picked.length;
  for (let i = 0, l = n - 1; i < l; i++) {
    let min = picked[i];
    if (min === undefined) continue;
    for (let j = i + 1; j < n; j++) {
      const current = picked[j];
      if (current === undefined) continue;
      if (current < min) {
        picked[j] = min;
        picked[i] = current;
        min = current;
      }
    }
  }
  return picked;
}

export class Picker {
  public entry!: string;
  private picked: (string | undefined)[];
  public index: number = 0;

  constructor(
    public plain: PlainType,
    public strict: boolean,
    public reselect: boolean,
    pickCount: 1 | 2,
    values?: (string | undefined)[],
    index = 0
  ) {
    this.picked = new Array(pickCount);

    if (values) {
      this.setValues(values, index);
    } else {
      this.setIndex(index);
    }
  }

  public scrollTo(value: string = DateTime.now().toISO()!, shift = 0) {
    this.entry = t(this.plain).startOf(value, shift);
  }

  public select(instant: string, initialIndex = 0) {
    if (this.picked.length > 1) {
      if (this.isFilled() && !this.reselect) {
        this.picked.fill(undefined);
      }
      if (this.isEmpty()) {
        this.index = initialIndex;
      }
    }
    this.picked[this.index] = instant;
    this.sort();
    this.index = this.nextIndex();
  }

  public setValues(values: (string | undefined)[], index = this.index) {
    for (let i = 0; i < this.picked.length; i++) {
      const value = values[i];
      this.picked[i] = value ? t(this.plain).instant(value) : undefined;
    }
    this.sort();
    this.setIndex(index);
  }

  public getValues(hover?: string) {
    if (hover && this.picked.length === 2) {
      const [start, end] = sortPicked([this.picked[this.nextIndex()], hover]);
      return [start, this.picked[this.index], end];
    }
    return this.picked.slice();
  }

  public reset() {
    this.index = 0; // todo
    this.picked.fill(undefined);
    this.autoScroll();
  }

  public next() {
    this.entry = t(this.plain).next(this.entry);
  }

  public previous() {
    this.entry = t(this.plain).previous(this.entry);
  }

  public getHoverDiff(hover: string, locale: string) {
    if (!this.reselect && this.isFilled()) {
      return;
    }
    const [start, , end] = this.getValues(hover);
    if (start && end) {
      return t(this.plain).diff(start, end, locale);
    }
    return undefined;
  }

  public isValid() {
    return this.strict ? this.picked.every(Boolean) : this.picked.some(Boolean);
  }

  private isFilled() {
    return this.picked.every(Boolean);
  }

  private isEmpty() {
    return !this.picked.some(Boolean);
  }

  private nextIndex() {
    const next = this.index + 1;
    if (next >= this.picked.length) {
      return 0;
    }
    return next;
  }

  private setIndex(index: number) {
    this.index = index;
    this.autoScroll();
  }

  private autoScroll() {
    const availableValue = this.picked[this.index] || this.picked.filter(Boolean).at(0);
    const shift = !availableValue || this.isFilled() ? this.index : this.picked.findIndex(Boolean);
    this.scrollTo(availableValue, shift);
  }

  private sort() {
    sortPicked(this.picked);
  }
}

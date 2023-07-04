import { Control } from "../../../../base/Control";
import { DayNames } from "./DayNames";
import { Days } from "./Days";
import { Months } from "./Months";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GridPopupContext } from "../../../types";

type Props = {
  index: number;
  entry: string;
  picked: string[];
  hover?: string;
};

export class Calendar extends Control<Props, GridPopupContext> {
  private header = new Header();
  private dayNames = new DayNames();
  private days = new Days();
  private months = new Months();
  private footer = new Footer();

  constructor() {
    super();
  }

  get type(): string {
    return "Calendar";
  }

  protected onRender(el: HTMLElement, { index, entry, picked, hover }: Props) {
    const { plainUnits } = this.getContext(el);

    el.className = "calendar";

    this.header.render(el, { index, entry }, entry);
    if (plainUnits.plain === "month") {
      this.months.render(el, { entry, picked, hover }, entry);
    } else {
      this.dayNames.render(el, {}, entry);
      this.days.render(el, { entry, picked, hover }, entry);
    }
    this.footer.render(el, {}, entry);
  }

  protected onUpdate(el: HTMLElement, { entry, picked, hover }: Props): void {
    const { plainUnits } = this.getContext(el);
    if (plainUnits.plain === "month") {
      this.months.update({ entry, picked, hover }, entry);
    } else {
      this.days.update({ entry, picked, hover }, entry);
    }
  }
}

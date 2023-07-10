import { Control } from "../../../../base/Control";
import { DayNames } from "./DayNames";
import { Days } from "./Days";
import { Months } from "./Months";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PopupContext } from "../../../types";

type Props = {
  index: number;
  entry: string;
  picked: (string | undefined)[];
  action?: string;
};

export class Calendar extends Control<Props, PopupContext> {
  private header;
  private dayNames;
  private days;
  private months;
  private footer;

  constructor(host: HTMLElement, context: PopupContext) {
    super(host, context);
    this.header = new Header(host, context);
    this.dayNames = new DayNames(host, context);
    this.days = new Days(host, context);
    this.months = new Months(host, context);
    this.footer = new Footer(host, context);
  }

  get type(): string {
    return "calendar";
  }

  protected onRender(el: HTMLElement, { index, entry, picked, action }: Props) {
    const { plain } = this.context;

    el.className = "calendar";

    this.header.render(el, { index, entry }, entry);
    if (plain === "month") {
      this.months.render(el, { entry, picked, action }, entry);
    } else {
      this.dayNames.render(el, {}, entry);
      this.days.render(el, { entry, picked }, entry);
    }
    this.footer.render(el, {}, entry);
  }

  protected onUpdate(el: HTMLElement, { entry, picked }: Props): void {
    const { plain } = this.context;
    if (plain === "month") {
      this.months.update({ entry, picked }, entry);
    } else {
      this.days.update({ entry, picked }, entry);
    }
  }
}

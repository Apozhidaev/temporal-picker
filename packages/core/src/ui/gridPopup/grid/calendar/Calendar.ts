import { Control } from "../../../base/Control";
import { DayNames } from "./DayNames";
import { Days } from "./Days";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  index: number;
  entry: string;
  picked: string[];
  hover?: string;
};

export class Calendar extends Control<Props> {
  private header = new Header();
  private dayNames = new DayNames();
  private days = new Days();
  private footer = new Footer();

  constructor() {
    super();
  }

  get type(): string {
    return "Calendar";
  }

  protected onRender(
    el: HTMLElement,
    { entry, picked, hover }: Props,
  ) {
    el.className = "calendar";

    this.header.render(el, { entry }, entry);
    this.dayNames.render(el, {}, entry);
    this.days.render(el, { entry, picked, hover }, entry);
    this.footer.render(el, {}, entry);
  }

  protected onUpdate(
    el: HTMLElement,
    { entry, picked, hover }: Props,
  ): void {
    this.days.update({ entry, picked, hover }, entry);
  }
}

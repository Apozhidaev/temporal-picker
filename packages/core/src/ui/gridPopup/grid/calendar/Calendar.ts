import { Control } from "../../../base/Control";
import { DayNames } from "./DayNames";
import { Days } from "./Days";
import { Header } from "./Header";

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

  constructor() {
    super();
  }

  get type(): string {
    return "Calendar";
  }

  protected render(
    el: HTMLElement,
    { entry, picked, hover }: Props,
    namespace: string
  ) {
    el.className = "calendar";

    this.header.memo(el, { entry }, namespace, entry);
    this.dayNames.memo(el, {}, namespace, entry);
    this.days.appendTo(el, { entry, picked, hover }, namespace, entry);
  }
}

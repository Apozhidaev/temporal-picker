import { DateTime } from "luxon";
import { Control } from "../../../base/Control";
import { GridPopupContext } from "../../types";

type Props = {
  entry: string;
};

export class Header extends Control<Props, GridPopupContext> {
  constructor() {
    super();
  }

  get type(): string {
    return "CalendarHeader";
  }

  protected onRender(el: HTMLElement, { entry }: Props) {
    const { locale, dictionary, plainUnits } = this.getContext(el);

    el.className = "header";
    el.style.display = "flex";

    const date = DateTime.fromISO(entry);

    if (plainUnits.plain === "month") {
      const monthName = document.createElement("div");
      monthName.className = "month-name";
      monthName.innerHTML = `<span></span><span>${date.toFormat(
        "yyyy"
      )}</span>`;
      el.appendChild(monthName);
    } else {
      const monthName = document.createElement("div");
      monthName.className = "month-name";
      monthName.innerHTML = `<span>${date.setLocale(locale).toLocaleString({
        month: "long",
      })}</span> ${date.toFormat("yyyy")}`;
      el.appendChild(monthName);
    }

    const prevMonth = document.createElement("button");
    prevMonth.className = "previous-button unit";
    prevMonth.innerHTML =
      dictionary?.previous ||
      '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>';
    el.appendChild(prevMonth);

    const nextMonth = document.createElement("button");
    nextMonth.className = "next-button unit";
    nextMonth.innerHTML =
      dictionary?.next ||
      '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>';
    el.appendChild(nextMonth);

    el.querySelectorAll("svg").forEach((x) => {
      x.style.pointerEvents = "none";
    });
  }
}

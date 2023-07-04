import { DateTime } from "luxon";
import { Control } from "../../../../base/Control";
import { GridPopupContext } from "../../../types";
import { toInstant } from "../../../../../utils";

type Props = {
  entry: string;
  index: number;
};

export class Header extends Control<Props, GridPopupContext> {
  constructor() {
    super();
  }

  get type(): string {
    return "CalendarHeader";
  }

  protected onRender(el: HTMLElement, { entry, index }: Props) {
    const {
      locale,
      dictionary,
      plainUnits,
      resetButton,
      extraSelect,
      actions,
    } = this.getContext(el);

    el.className = "header";
    el.style.display = "flex";

    const date = DateTime.fromISO(entry);

    if (extraSelect) {
      const monthNameWrapper = document.createElement("div");
      monthNameWrapper.className = "month-name";

      if (plainUnits.plain === "month") {
        monthNameWrapper.innerHTML = `<span></span>`;
      } else {
        const selectMonths = document.createElement("select");
        selectMonths.className = "month-name--select month-name--dropdown unit";

        for (let x = 0; x < 12; x += 1) {
          const option = document.createElement("option");
          const optionMonth = DateTime.fromJSDate(
            new Date(date.year, x, 1, 0, 0, 0)
          );

          option.value = String(x);
          option.text = optionMonth.setLocale(locale).toLocaleString({
            month: "long",
          });

          option.selected = optionMonth.month === date.month;

          selectMonths.appendChild(option);
        }

        selectMonths.addEventListener("change", (e) => {
          const target = e.target as HTMLSelectElement;

          actions?.gotoInstant(
            toInstant(
              DateTime.fromISO(entry).set({ month: Number(target.value) }),
              plainUnits.plain
            ),
            index
          );
        });

        monthNameWrapper.prepend(selectMonths);
      }

      const selectYears = document.createElement("select");
      selectYears.className = "month-name--select unit";

      const minYear = DateTime.now().year - 100;
      const maxYear = minYear + 101;

      if (date.year > maxYear) {
        const option = document.createElement("option");
        option.value = String(date.year);
        option.text = String(date.year);
        option.selected = true;
        option.disabled = true;

        selectYears.appendChild(option);
      }

      for (let x = maxYear; x >= minYear; x -= 1) {
        const option = document.createElement("option");
        option.value = String(x);
        option.text = String(x);

        option.selected = date.year === x;

        selectYears.appendChild(option);
      }

      if (date.year < minYear) {
        const option = document.createElement("option");
        option.value = String(date.year);
        option.text = String(date.year);
        option.selected = true;
        option.disabled = true;

        selectYears.appendChild(option);
      }

      selectYears.addEventListener("change", (e) => {
        const target = e.target as HTMLSelectElement;

        actions?.gotoInstant(
          toInstant(
            DateTime.fromISO(entry).set({ year: Number(target.value) }),
            plainUnits.plain
          ),
          index
        );
      });

      monthNameWrapper.appendChild(selectYears);

      el.appendChild(monthNameWrapper);
    } else {
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

    if (resetButton) {
      const button = document.createElement("button");
      button.className = "reset-button unit";
      button.innerHTML =
        dictionary?.reset ||
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24" style="fill:none;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>`;
      button.title = "Clear";

      el.appendChild(button);
    }

    el.querySelectorAll("svg").forEach((x) => {
      x.style.pointerEvents = "none";
    });
  }
}

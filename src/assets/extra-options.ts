export const extraOptionsCss: string = /* css */ `
:host {
  --month-name-font-weight: var(--tp-month-name-font-weight, 700);
  --focus-color: var(--tp-focus-color, #94a3b8);
  --select-outline-color: var(--tp-select-outline-color, #e5e7eb);
}
.container.extra-options-plugin .calendars .calendar > .header .month-name {
  align-items: center;
  -moz-column-gap: 5px;
  column-gap: 5px;
  display: flex;
  justify-content: center;
}
.container.extra-options-plugin .calendars .calendar > .header .month-name select {
  border: none;
  font-size: 14px;
  padding: 3px;
  border-radius: var(--border-radius);
}
.container.extra-options-plugin
  .calendars
  .calendar
  > .header
  .month-name
  select.month-name--dropdown {
  font-weight: var(--month-name-font-weight);
}
.container.extra-options-plugin .calendars .calendar > .header .reset-button {
  order: 4;
}
.container.extra-options-plugin
  .calendars.calendars:not(.grid-1)
  .calendar
  > .header
  .reset-button {
  visibility: hidden;
}
.container.extra-options-plugin
  .calendars.calendars:not(.grid-1)
  .calendar:last-child
  > .header
  .reset-button {
  visibility: visible;
}
.container.extra-options-plugin.week-numbers .calendar > .daynames-row,
.container.extra-options-plugin.week-numbers .calendar > .days-grid {
  grid-template-columns: 30px repeat(7, 1fr);
}
.container.extra-options-plugin.week-numbers .calendar > .daynames-row .wnum-header,
.container.extra-options-plugin.week-numbers .calendar > .daynames-row .wnum-item,
.container.extra-options-plugin.week-numbers .calendar > .days-grid .wnum-header,
.container.extra-options-plugin.week-numbers .calendar > .days-grid .wnum-item {
  align-items: center;
  color: var(--color-fg-muted);
  display: flex;
  font-size: 12px;
  justify-content: center;
}
.unit:focus-visible {
  outline-width: 1px;
  outline-style: dashed;
  outline-color: var(--focus-color);
  z-index: 1;
  outline-offset: 1px;
}
select.unit {
  outline-width: 1px;
  outline-style: solid;
  outline-color: var(--select-outline-color);
  outline-offset: 1px;
}
select.unit:focus-visible {
  outline-color: var(--focus-color);
  outline-style: solid;
}
`;
export const coreCss: string = /* css */ `
:host {
  --color-bg-default: var(--temporal-picker-color-bg-default, #fff);
  --color-bg-secondary: var(--temporal-picker-color-bg-secondary, #f2f5f8);
  --color-fg-default: var(--temporal-picker-color-fg-default, #1e293b);
  --color-fg-primary: var(--temporal-picker-color-fg-primary, #2e6fda);
  --color-fg-secondary: var(--temporal-picker-color-fg-secondary, #64748b);
  --color-fg-selected: var(--temporal-picker-color-fg-selected, #fff);
  --color-fg-muted: var(--temporal-picker-color-fg-muted, #64748b);
  --color-fg-accent: var(--temporal-picker-color-fg-accent, #e63757);
  --color-btn-primary-bg: var(--temporal-picker-color-btn-primary-bg, #2e6fda);
  --color-btn-primary-fg: var(--temporal-picker-color-btn-primary-fg, #fff);
  --color-btn-primary-border: var(--temporal-picker-color-btn-primary-border, #2e6fda);
  --color-btn-primary-hover-bg: var(--temporal-picker-color-btn-primary-hover-bg, #2c67cd);
  --color-btn-primary-hover-fg: var(--temporal-picker-color-btn-primary-hover-fg, #fff);
  --color-btn-primary-hover-border: var(--temporal-picker-color-btn-primary-hover-border, #2c67cd);
  --color-btn-primary-disabled-bg: var(--temporal-picker-color-btn-primary-disabled-bg, #80aff8);
  --color-btn-primary-disabled-fg: var(--temporal-picker-color-btn-primary-disabled-fg, #fff);
  --color-btn-primary-disabled-border: var(--temporal-picker-color-btn-primary-disabled-border, #80aff8);
  --color-btn-secondary-bg: var(--temporal-picker-color-btn-secondary-bg, #fff);
  --color-btn-secondary-fg: var(--temporal-picker-color-btn-secondary-fg, #475569);
  --color-btn-secondary-border: var(--temporal-picker-color-btn-secondary-border, #cbd5e1);
  --color-btn-secondary-hover-bg: var(--temporal-picker-color-btn-secondary-hover-bg, #f8fafc);
  --color-btn-secondary-hover-fg: var(--temporal-picker-color-btn-secondary-hover-fg, #475569);
  --color-btn-secondary-hover-border: var(--temporal-picker-color-btn-secondary-hover-border, #cbd5e1);
  --color-btn-secondary-disabled-bg: var(--temporal-picker-color-btn-secondary-disabled-bg, #cbd5e1);
  --color-btn-secondary-disabled-fg: var(--temporal-picker-color-btn-secondary-disabled-fg, #fff);
  --color-btn-secondary-disabled-border: var(--temporal-picker-color-btn-secondary-disabled-border, #cbd5e1);
  --color-border-default: var(--temporal-picker-color-border-default, #cbd5e1);
  --color-border-locked: var(--temporal-picker-color-border-locked, #f9f9f9);
  --day-width: var(--temporal-picker-day-width, 43px);
  --day-height: var(--temporal-picker-day-height, 37px);
  --z-index: var(--temporal-picker-z-index, 40);
  --border-radius: var(--temporal-picker-border-radius, 2px);
  --primary-color: var(--temporal-picker-primary-color, #2e6fda);
  --secondary-color: var(--temporal-picker-secondary-color, #64748b);
  --font-family: var(--temporal-picker-font-family, inherit);
  --box-shadow: var(--temporal-picker-box-shadow, 0 4px 28px 0 rgb(0 0 0 / 12%));
}
* {
  box-sizing: border-box;
}
.container {
  border-radius: 4px;
  color: var(--color-fg-default);
  cursor: default;
  font-family: var(--font-family);
  font-size: 0.8em;
  height: 0;
  overflow: hidden;
  pointer-events: all;
  position: absolute;
  transform: scale(0);
  transform-origin: top left;
  transition: transform 0.3s tp-out;
  z-index: var(--z-index);
  display: none;
}
.container.show {
  box-shadow: var(--box-shadow);
  height: auto;
  transform: scale(1);
  display: inline-block;
}
.container > main {
  background-color: var(--color-bg-default);
}
.container > footer,
.container > header {
  background-color: var(--color-bg-secondary);
  padding: 10px;
}
.container > footer .footer-buttons {
  -moz-column-gap: 5px;
  column-gap: 5px;
  display: flex;
  justify-content: flex-end;
}
.container > footer .footer-buttons > button {
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  cursor: pointer;
  padding: 6px 12px;
}
.container > footer .footer-buttons > button.apply-button {
  background-color: var(--color-btn-primary-bg);
  border-color: var(--color-btn-primary-border);
  color: var(--color-btn-primary-fg);
}
.container > footer .footer-buttons > button.apply-button:hover {
  background-color: var(--color-btn-primary-hover-bg);
  border-color: var(--color-btn-primary-hover-border);
  color: var(--color-btn-primary-hover-fg);
}
.container > footer .footer-buttons > button.apply-button:disabled {
  background-color: var(--color-btn-primary-disabled-bg);
  border-color: var(--color-btn-primary-disabled-border);
  color: var(--color-btn-primary-disabled-fg);
  cursor: default;
}
.container > footer .footer-buttons > button.cancel-button {
  background-color: var(--color-btn-secondary-bg);
  border-color: var(--color-btn-secondary-border);
  color: var(--color-btn-secondary-fg);
}
.container > footer .footer-buttons > button.cancel-button:hover {
  background-color: var(--color-btn-secondary-hover-bg);
  border-color: var(--color-btn-secondary-hover-border);
  color: var(--color-btn-secondary-hover-fg);
}
.container > footer .footer-buttons > button.cancel-button:disabled {
  background-color: var(--color-btn-secondary-disabled-bg);
  border-color: var(--color-btn-secondary-disabled-border);
  color: var(--color-btn-secondary-disabled-fg);
  cursor: default;
}
.grid-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}
.grid-6 {
  grid-template-columns: repeat(6, 1fr);
}
.grid-7 {
  grid-template-columns: repeat(7, 1fr);
}
.grid-8 {
  grid-template-columns: repeat(8, 1fr);
}
.grid-9 {
  grid-template-columns: repeat(9, 1fr);
}
.grid-10 {
  grid-template-columns: repeat(10, 1fr);
}
.grid-11 {
  grid-template-columns: repeat(11, 1fr);
}
.grid-12 {
  grid-template-columns: repeat(12, 1fr);
}
.calendars {
  display: grid;
}
.calendars:not(.grid-1) .calendar > .header .month-name {
  order: 2;
  text-align: center;
}
.calendars:not(.grid-1) .calendar > .header .previous-button {
  order: 1;
  visibility: hidden;
}
.calendars:not(.grid-1) .calendar > .header .next-button {
  order: 3;
  visibility: hidden;
}
.calendars:not(.grid-1) .calendar:first-child > .header .previous-button,
.calendars:not(.grid-1) .calendar:last-child > .header .next-button {
  visibility: visible;
}
.calendar {
  padding: 10px;
}
.calendar > .header {
  align-items: center;
  -moz-column-gap: 5px;
  column-gap: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.calendar > .header .month-name {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
}
.calendar > .header .month-name > span {
  font-weight: 700;
}
.calendar > .header button {
  align-items: center;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  color: var(--color-btn-secondary-fg);
  fill: var(--color-btn-secondary-fg);
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 4px 7px;
}
.calendar > .header button:hover {
  background-color: var(--color-bg-secondary);
}
.calendar > .header button:hover > img,
.calendar > .header button:hover > svg {
  color: var(--color-fg-primary);
}
.calendar > .header button > img,
.calendar > .header button > svg {
  color: var(--color-btn-secondary-fg);
  pointer-events: none;
  transform: scale(0.7);
}
.calendar > .daynames-row,
.calendar > .days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 2px;
}
.calendar > .daynames-row > .day,
.calendar > .daynames-row > .dayname,
.calendar > .days-grid > .day,
.calendar > .days-grid > .dayname {
  align-items: center;
  cursor: default;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  justify-content: center;
}
.calendar > .daynames-row > .dayname {
  color: var(--color-fg-muted);
  font-size: 12px;
  padding: 5px 0;
}
.calendar > .days-grid > .day {
  border: 1px solid transparent;
  border-radius: 2px;
  height: var(--day-height);
  max-height: var(--day-height);
  max-width: var(--day-width);
  min-height: var(--day-height);
  min-width: var(--day-width);
  padding: 10px 0;
  width: var(--day-width);
}
.calendar > .days-grid > .day:hover {
  border: 1px solid var(--color-fg-primary);
  color: var(--color-fg-primary);
}
.calendar > .days-grid > .day.today {
  color: var(--color-fg-accent);
}
.calendar > .days-grid > .day.selected {
  background-color: var(--color-fg-primary);
  color: var(--color-fg-selected);
}
@media (max-width: 480px) {
  .container {
    transform: scaleY(0) !important;
    transform-origin: bottom center !important;
  }
  .container.show {
    bottom: 0 !important;
    left: 0 !important;
    position: fixed !important;
    right: 0 !important;
    top: auto !important;
    transform: scaleY(1) !important;
  }
  .container {
    width: 100%;
  }
  .calendars {
    grid-template-columns: repeat(1, 1fr);
  }
  .calendars .calendar {
    box-sizing: border-box;
    width: 100%;
  }
  .calendars .calendar:nth-child(n + 2) {
    display: none;
  }
  .calendars .calendar > .days-grid > .day {
    height: auto;
    max-height: unset;
    max-width: unset;
    min-height: unset;
    min-width: unset;
    width: auto;
  }
  .calendars .calendar > .header:not(.no-next-month) .next-button {
    visibility: visible;
  }
}
`;
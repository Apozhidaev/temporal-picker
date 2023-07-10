# @temporal-picker/react

The DatePicker (RangePicker) component base on [temporal-picker](https://www.npmjs.com/package/temporal-picker).

## How to Use

Step 1.
```bash
npm i @temporal-picker/react
```

Step 2.
```jsx
import { DatePicker, RangePicker } from "@temporal-picker/react";

function Demo() {
  return (
    <>
       <DatePicker
          value="2022-01-01"
          onValueChange={(date) => {
            console.log(date);
          }}
        />
       <RangePicker
          start="2022-01-01"
          end="2022-01-16"
          onRangeChange={(start, end) => {
            console.log(start, end);
          }}
          placement="bottom-end"
          autoApply
          resetButton
          extraSelect
          presets={[
            { label: "Preset 1", start: "2023-01-01", end: "2023-02-15" },
            { label: "Preset 2", start: "2023-01-01" },
          ]}
       />
    </>
  );
}

export default Demo;

```
 
### Props

```typescript
export type PickerProps = {
  className?: string;
  plain?: "date" | "time" | "datetime" | "month";
  disabled?: boolean;
  readonly?: boolean;
  max?: string;
  min?: string;
  native?: boolean;
  placement?: "bottom-start" | "bottom-end";
  autoApply?: boolean;
  resetButton?: boolean;
  extraSelect?: boolean;
  customLayout?: boolean;
  firstDay?: number;
  locale?: string;
  localeApply?: string;
  localeCancel?: string;
  localeClear?: string;
  rowHeader?: boolean;
  testId?: string;
  onViewChange?: (event: CustomEvent<ViewDetail>) => void;
};

export type PlainPickerProps = PickerProps & {
  value?: string;
  onValueChange?: (value?: string) => void;
};

export type RangePickerProps = PickerProps & {
  start?: string;
  end?: string;
  onRangeChange?: (start?: string, end?: string) => void;
  presets?: {
    label: string;
    start?: string;
    end?: string;
  }[];
  presetPosition?: "bottom" | "left" | "right" | "top";
  tooltip?: boolean;
  strict?: boolean;
  reselect?: boolean;
};
```

## Customize
```css
:root {
  --t-popup-color-bg-default: #fff;
  --t-popup-color-bg-secondary: #f2f5f8;
  --t-popup-color-fg-default: #1e293b;
  --t-popup-color-fg-primary: #2e6fda;
  --t-popup-color-fg-secondary: #64748b;
  --t-popup-color-fg-selected: #fff;
  --t-popup-color-fg-muted: #64748b;
  --t-popup-color-fg-accent: #e63757;
  --t-popup-color-fg-locked: #9e9e9e;
  --t-popup-color-bg-locked: #ffab91;
  --t-popup-color-bg-unavailable: #f9f9f9;
  --t-popup-color-bg-inrange: #e6effe;
  --t-popup-color-bg-tooltip: #fff;
  --t-popup-color-fg-tooltip: #1e293b;
  --t-popup-color-btn-primary-bg: #2e6fda;
  --t-popup-color-btn-primary-fg: #fff;
  --t-popup-color-btn-primary-border: #2e6fda;
  --t-popup-color-btn-primary-hover-bg: #2c67cd;
  --t-popup-color-btn-primary-hover-fg: #fff;
  --t-popup-color-btn-primary-hover-border: #2c67cd;
  --t-popup-color-btn-primary-disabled-bg: #80aff8;
  --t-popup-color-btn-primary-disabled-fg: #fff;
  --t-popup-color-btn-primary-disabled-border: #80aff8;
  --t-popup-color-btn-secondary-bg: #fff;
  --t-popup-color-btn-secondary-fg: #475569;
  --t-popup-color-btn-secondary-border: #cbd5e1;
  --t-popup-color-btn-secondary-hover-bg: #f8fafc;
  --t-popup-color-btn-secondary-hover-fg: #475569;
  --t-popup-color-btn-secondary-hover-border: #cbd5e1;
  --t-popup-color-btn-secondary-disabled-bg: #cbd5e1;
  --t-popup-color-btn-secondary-disabled-fg: #fff;
  --t-popup-color-btn-secondary-disabled-border: #cbd5e1;
  --t-popup-color-border-default: #cbd5e1;
  --t-popup-color-border-locked: #f9f9f9;
  --t-popup-day-width: 43px;
  --t-popup-day-height: 37px;
  --t-popup-month-width: 75px;
  --t-popup-month-height: 37px;
  --t-popup-z-index: 40;
  --t-popup-border-radius: 2px;
  --t-popup-primary-color: #2e6fda;
  --t-popup-secondary-color: #64748b;
  --t-popup-font-family: inherit;
  --t-popup-box-shadow: 0 4px 28px 0 rgb(0 0 0 / 12%);
  --t-popup-month-name-font-weight: 700;
  --t-popup-focus-color: #94a3b8;
  --t-popup-select-outline-color: #e5e7eb;

  --t-input-invalid-color: #be123c;
  --t-input-border: 1px solid #e5e7eb;
  --t-input-color: inherit;
  --t-input-font: inherit;
  --t-input-separator-icon-size: 1em;
  --t-input-button-icon-size: 1.25em;
  --t-input-range-items-gap: 0.5em;
  --t-input-px: 0.375em;
  --t-input-py: 0.25em;

  --t-input-focus-outline: 2px solid #3b82f6;

  --t-input-disabled-bg-color: #f5f5f5;
  --t-input-disabled-color: #44403c;
}
```

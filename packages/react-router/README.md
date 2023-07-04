# @temporal-picker/react

The DatePicker (RangePicker) component base on React-Router and [temporal-picker](https://www.npmjs.com/package/temporal-picker).

## How to Use

Step 1.
```bash
npm i @temporal-picker/react-router
```

Step 2.
```jsx
import { DatePicker, RangePicker } from "@temporal-picker/react-router";

function Demo() {
  return (
    <>
       <DatePicker
          param="date"
          defaultValue="2023-01-01"
          resetButton
          aria-selected="false"
        />
       <RangePicker
          startParam="start"
          endParam="end"
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
  testId?: string;
};

export type PlainPickerProps = PickerProps & {
  param: string; // search param name
  defaultValue?: string;
};

export type RangePickerProps = PickerProps & {
  startParam: string; // search param name
  endParam: string; // search param name
  defaultStart?: string;
  defaultEnd?: string;
  presets?: {
    label: string;
    start?: string;
    end?: string;
  }[];
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
  --t-popup-z-index: 40;
  --t-popup-border-radius: 2px;
  --t-popup-primary-color: #2e6fda;
  --t-popup-secondary-color: #64748b;
  --t-popup-font-family: inherit;
  --t-popup-box-shadow: 0 4px 28px 0 rgb(0 0 0 / 12%);
  --t-popup-month-name-font-weight: 700;
  --t-popup-focus-color: #94a3b8;
  --t-popup-select-outline-color: #e5e7eb;

  --t-input-color-bg-default: #ffffff;
  --t-input-color-fg-default: #111827;
  --t-input-color-bg-disabled: #f5f5f5;
  --t-input-color-fg-disabled: #57534e;
  --t-input-color-fg-invalid: #e11d48;
  --t-input-border-radius: 0.375rem;
  --t-input-font-size: 1rem;
  --t-input-height: 2.25rem;
  --t-input-padding: 0.375rem 0.75rem;

  --t-input-focus-shadow:
    rgb(255, 255, 255) 0 0 0 0 inset,
    #3b82f6 0 0 0 2px inset,
    rgba(0, 0, 0, 0.05) 0 1px 2px 0;

  --t-input-border-shadow:
    rgb(255, 255, 255) 0 0 0 0 inset,
    #d1d5db 0 0 0 1px inset,
    rgba(0, 0, 0, 0.05) 0 1px 2px 0;
}
```

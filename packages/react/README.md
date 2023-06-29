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
          onChange={(start, end) => {
            console.log(start, end);
          }}
          placement="bottom-end"
          autoApply
          resetButton
          monthSelect
          yearSelect
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
  monthSelect?: boolean;
  yearSelect?: boolean;
  testId?: string;
};

export type PlainPickerProps = PickerProps & {
  value?: string;
  onChange?: (value?: string) => void;
};

export type RangePickerProps = PickerProps & {
  start?: string;
  end?: string;
  onChange?: (start?: string, end?: string) => void;
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
  --tp-popup-color-bg-default: #fff;
  --tp-popup-color-bg-secondary: #f2f5f8;
  --tp-popup-color-fg-default: #1e293b;
  --tp-popup-color-fg-primary: #2e6fda;
  --tp-popup-color-fg-secondary: #64748b;
  --tp-popup-color-fg-selected: #fff;
  --tp-popup-color-fg-muted: #64748b;
  --tp-popup-color-fg-accent: #e63757;
  --tp-popup-color-fg-locked: #9e9e9e;
  --tp-popup-color-bg-locked: #ffab91;
  --tp-popup-color-bg-unavailable: #f9f9f9;
  --tp-popup-color-bg-inrange: #e6effe;
  --tp-popup-color-bg-tooltip: #fff;
  --tp-popup-color-fg-tooltip: #1e293b;
  --tp-popup-color-btn-primary-bg: #2e6fda;
  --tp-popup-color-btn-primary-fg: #fff;
  --tp-popup-color-btn-primary-border: #2e6fda;
  --tp-popup-color-btn-primary-hover-bg: #2c67cd;
  --tp-popup-color-btn-primary-hover-fg: #fff;
  --tp-popup-color-btn-primary-hover-border: #2c67cd;
  --tp-popup-color-btn-primary-disabled-bg: #80aff8;
  --tp-popup-color-btn-primary-disabled-fg: #fff;
  --tp-popup-color-btn-primary-disabled-border: #80aff8;
  --tp-popup-color-btn-secondary-bg: #fff;
  --tp-popup-color-btn-secondary-fg: #475569;
  --tp-popup-color-btn-secondary-border: #cbd5e1;
  --tp-popup-color-btn-secondary-hover-bg: #f8fafc;
  --tp-popup-color-btn-secondary-hover-fg: #475569;
  --tp-popup-color-btn-secondary-hover-border: #cbd5e1;
  --tp-popup-color-btn-secondary-disabled-bg: #cbd5e1;
  --tp-popup-color-btn-secondary-disabled-fg: #fff;
  --tp-popup-color-btn-secondary-disabled-border: #cbd5e1;
  --tp-popup-color-border-default: #cbd5e1;
  --tp-popup-color-border-locked: #f9f9f9;
  --tp-popup-day-width: 43px;
  --tp-popup-day-height: 37px;
  --tp-popup-z-index: 40;
  --tp-popup-border-radius: 2px;
  --tp-popup-primary-color: #2e6fda;
  --tp-popup-secondary-color: #64748b;
  --tp-popup-font-family: inherit;
  --tp-popup-box-shadow: 0 4px 28px 0 rgb(0 0 0 / 12%);
  --tp-popup-month-name-font-weight: 700;
  --tp-popup-focus-color: #94a3b8;
  --tp-popup-select-outline-color: #e5e7eb;

  --tp-input-color-bg-default: #ffffff;
  --tp-input-color-fg-default: #111827;
  --tp-input-color-bg-disabled: #f5f5f5;
  --tp-input-color-fg-disabled: #57534e;
  --tp-input-color-fg-invalid: #e11d48;
  --tp-input-border-radius: 0.375rem;
  --tp-input-font-size: 1rem;
  --tp-input-height: 2.25rem;
  --tp-input-padding: 0.375rem 0.75rem;

  --tp-input-focus-shadow:
    rgb(255, 255, 255) 0 0 0 0 inset,
    #3b82f6 0 0 0 2px inset,
    rgba(0, 0, 0, 0.05) 0 1px 2px 0;

  --tp-input-border-shadow:
    rgb(255, 255, 255) 0 0 0 0 inset,
    #d1d5db 0 0 0 1px inset,
    rgba(0, 0, 0, 0.05) 0 1px 2px 0;
}
```

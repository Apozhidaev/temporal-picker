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
  placement?: "bottom-start" | "bottom-end" | "bottom";
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
  pickLabel?: boolean;
  testId?: string;
  onViewChange?: (event: CustomEvent<ViewDetail>) => void;
};

export type PlainPickerProps = PickerProps & {
  value?: string;
  onValueChange?: (value: string) => void;
};

export type RangePickerProps = PickerProps & {
  start?: string;
  end?: string;
  onRangeChange?: (start: string, end: string) => void;
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

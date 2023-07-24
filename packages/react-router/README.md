# @temporal-picker/react-router

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
      <DatePicker param="date" defaultValue="2023-01-01" resetButton aria-selected="false" />
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
  presetPosition?: "bottom" | "left" | "right" | "top";
  tooltip?: boolean;
  strict?: boolean;
  reselect?: boolean;
};
```

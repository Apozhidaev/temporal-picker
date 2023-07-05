# @temporal-picker/custom-elements


### How to Use

Step 1.
```bash
npm i @temporal-picker/custom-elements
```

Step 2.
```javascript
import { defineCustomElements } from '@temporal-picker/custom-elements';

defineCustomElements();
```

Step 3.
```html
<style>
  temporal-picker::part(start-input) {
    color: red;
  }
  temporal-picker::part(end-input) {
    color: blue;
  }
</style>

<temporal-picker id="picker"></temporal-picker>

<temporal-picker
  id="range-picker"
  type="range"
  extra-select="true"
  reset-button="true"
>
  <temporal-preset label="Preset 1" start="2023-01-01" end="2023-02-15"></temporal-preset>
  <temporal-preset label="Preset 2" start="2023-04-01" end="2023-06-01"></temporal-preset>
</temporal-picker>

<script>
  const picker = document.getElementById('picker');
  picker.addEventListener('t-value-change', e => console.log(e));

  const rangePicker = document.getElementById('range-picker');
  rangePicker.addEventListener('t-range-change', e => console.log(e));
</script>
```


## Properties

| Property         | Attribute         | Description                   | Type                                                 | Default          |
| ---------------- | ----------------- | ----------------------------- | ---------------------------------------------------- | ---------------- |
| `autoApply`      | `auto-apply`      |                               | `boolean`                                            | `undefined`      |
| `disabled`       | `disabled`        |                               | `boolean`                                            | `undefined`      |
| `end`            | `end`             | The end value of date range   | `string`                                             | `undefined`      |
| `extraSelect`    | `extra-select`    |                               | `boolean`                                            | `undefined`      |
| `max`            | `max`             | The max value                 | `string`                                             | `undefined`      |
| `min`            | `min`             | The min value                 | `string`                                             | `undefined`      |
| `native`         | `native`          | The native value              | `boolean`                                            | `undefined`      |
| `placement`      | `placement`       |                               | `"bottom-end" \| "bottom-start"`                     | `'bottom-start'` |
| `plain`          | `plain`           | The type of picker            | `"date" \| "datetime" \| "day" \| "month" \| "time"` | `'date'`         |
| `presetPosition` | `preset-position` |                               | `"bottom" \| "left" \| "right" \| "top"`             | `undefined`      |
| `readonly`       | `readonly`        |                               | `boolean`                                            | `undefined`      |
| `resetButton`    | `reset-button`    |                               | `boolean`                                            | `undefined`      |
| `start`          | `start`           | The start value of date range | `string`                                             | `undefined`      |
| `tooltip`        | `tooltip`         |                               | `boolean`                                            | `undefined`      |
| `type`           | `type`            | The type of picker            | `"plain" \| "range"`                                 | `'plain'`        |
| `value`          | `value`           | The value of date             | `string`                                             | `undefined`      |


## Events

| Event            | Description            | Type                                           |
| ---------------- | ---------------------- | ---------------------------------------------- |
| `t-range-change` | The range change event | `CustomEvent<{ start: string; end: string; }>` |
| `t-value-change` | The value change event | `CustomEvent<{ value: string; }>`              |



## Shadow Parts

| Part                     | Description |
| ------------------------ | ----------- |
| `"input"`                |             |
| `"start-input"`          |             |
| `"end-input"`            |             |
| `"delimiter"`            |             |
| `"range-inputs-wrapper"` |             |


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

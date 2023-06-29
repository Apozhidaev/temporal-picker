# temporal-picker


### How to Use

Step 1.
```bash
npm i temporal-picker
```

Step 2.
```javascript
import { defineCustomElements } from 'temporal-picker';

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
  month-select="true"
  year-select="true"
  reset-button="true"
>
  <temporal-preset label="Preset 1" start="2023-01-01" end="2023-02-15"></temporal-preset>
  <temporal-preset label="Preset 2" start="2023-04-01" end="2023-06-01"></temporal-preset>
</temporal-picker>

<script>
  const picker = document.getElementById('picker');
  picker.addEventListener('valueChange', e => console.log(e));

  const rangePicker = document.getElementById('range-picker');
  rangePicker.addEventListener('rangeChange', e => console.log(e));
</script>
```


## Properties

| Property         | Attribute         | Description                   | Type                                                 | Default          |
| ---------------- | ----------------- | ----------------------------- | ---------------------------------------------------- | ---------------- |
| `autoApply`      | `auto-apply`      |                               | `boolean`                                            | `undefined`      |
| `disabled`       | `disabled`        |                               | `boolean`                                            | `undefined`      |
| `end`            | `end`             | The end value of date range   | `string`                                             | `undefined`      |
| `max`            | `max`             | The max value                 | `string`                                             | `undefined`      |
| `min`            | `min`             | The min value                 | `string`                                             | `undefined`      |
| `monthSelect`    | `month-select`    |                               | `boolean`                                            | `undefined`      |
| `native`         | `native`          | The native value              | `boolean`                                            | `undefined`      |
| `placement`      | `placement`       |                               | `"bottom-end" \| "bottom-start"`                     | `'bottom-start'` |
| `plain`          | `plain`           | The type of picker            | `"date" \| "datetime" \| "day" \| "month" \| "time"` | `'date'`         |
| `presetPosition` | `preset-position` |                               | `"bottom" \| "left" \| "right" \| "top"`             | `undefined`      |
| `readonly`       | `readonly`        |                               | `boolean`                                            | `undefined`      |
| `resetButton`    | `reset-button`    |                               | `boolean`                                            | `undefined`      |
| `start`          | `start`           | The start value of date range | `string`                                             | `undefined`      |
| `type`           | `type`            | The type of picker            | `"plain" \| "range"`                                 | `'plain'`        |
| `value`          | `value`           | The value of date             | `string`                                             | `undefined`      |
| `yearSelect`     | `year-select`     |                               | `boolean`                                            | `undefined`      |


## Events

| Event         | Description            | Type                                           |
| ------------- | ---------------------- | ---------------------------------------------- |
| `rangeChange` | The range change event | `CustomEvent<{ start: string; end: string; }>` |
| `valueChange` | The value change event | `CustomEvent<{ value: string; }>`              |


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
  --tp-popup-color-bg-default: #fff;
  --tp-popup-color-bg-secondary: #f2f5f8;
  --tp-popup-color-fg-default: #1e293b;
  --tp-popup-color-fg-primary: #2e6fda;
  --tp-popup-color-fg-secondary: #64748b;
  --tp-popup-color-fg-selected: #fff;
  --tp-popup-color-fg-muted: #64748b;
  --tp-popup-color-fg-accent: #e63757;
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
  --tp-popup-color-fg-locked: #9e9e9e;
  --tp-popup-color-bg-locked: #ffab91;
  --tp-popup-color-bg-unavailable: #f9f9f9;
  --tp-popup-color-bg-inrange: #e6effe;
  --tp-popup-color-bg-tooltip: #fff;
  --tp-popup-color-fg-tooltip: #1e293b;

  --tp-input-bg-color: #ffffff;
  --tp-input-color: #111827;
  --tp-input-disabled-bg-color: #f5f5f5;
  --tp-input-disabled-color: #57534e;
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

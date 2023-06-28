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

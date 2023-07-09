# temporal-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                   | Type                                                 | Default     |
| ---------------- | ----------------- | ----------------------------- | ---------------------------------------------------- | ----------- |
| `autoApply`      | `auto-apply`      |                               | `boolean`                                            | `undefined` |
| `customLayout`   | `custom-layout`   |                               | `boolean`                                            | `undefined` |
| `disabled`       | `disabled`        |                               | `boolean`                                            | `undefined` |
| `end`            | `end`             | The end value of date range   | `string`                                             | `undefined` |
| `extraSelect`    | `extra-select`    |                               | `boolean`                                            | `undefined` |
| `firstDay`       | `first-day`       |                               | `number`                                             | `undefined` |
| `locale`         | `locale`          |                               | `string`                                             | `undefined` |
| `localeApply`    | `locale-apply`    |                               | `string`                                             | `undefined` |
| `localeCancel`   | `locale-cancel`   |                               | `string`                                             | `undefined` |
| `localeClear`    | `locale-clear`    |                               | `string`                                             | `undefined` |
| `max`            | `max`             | The max value                 | `string`                                             | `undefined` |
| `min`            | `min`             | The min value                 | `string`                                             | `undefined` |
| `native`         | `native`          | The native value              | `boolean`                                            | `undefined` |
| `picker`         | `picker`          | The type of picker            | `"button" \| "input"`                                | `'input'`   |
| `placement`      | `placement`       |                               | `"bottom" \| "bottom-end" \| "bottom-start"`         | `'bottom'`  |
| `plain`          | `plain`           | The type of picker            | `"date" \| "datetime" \| "day" \| "month" \| "time"` | `'date'`    |
| `presetPosition` | `preset-position` |                               | `"bottom" \| "left" \| "right" \| "top"`             | `undefined` |
| `readonly`       | `readonly`        |                               | `boolean`                                            | `undefined` |
| `reselect`       | `reselect`        |                               | `boolean`                                            | `undefined` |
| `resetButton`    | `reset-button`    |                               | `boolean`                                            | `undefined` |
| `start`          | `start`           | The start value of date range | `string`                                             | `undefined` |
| `strict`         | `strict`          |                               | `boolean`                                            | `undefined` |
| `tooltip`        | `tooltip`         |                               | `boolean`                                            | `undefined` |
| `type`           | `type`            | The type of picker            | `"plain" \| "range"`                                 | `'plain'`   |
| `value`          | `value`           | The value of date             | `string`                                             | `undefined` |


## Events

| Event            | Description            | Type                                           |
| ---------------- | ---------------------- | ---------------------------------------------- |
| `t-range-change` | The range change event | `CustomEvent<{ start: string; end: string; }>` |
| `t-value-change` | The value change event | `CustomEvent<{ value: string; }>`              |


## Dependencies

### Depends on

- [temporal-input](../temporal-input)
- [temporal-popup](../temporal-popup)

### Graph
```mermaid
graph TD;
  temporal-picker --> temporal-input
  temporal-picker --> temporal-popup
  style temporal-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

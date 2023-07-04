# temporal-popup



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                   | Type                                                 | Default     |
| ---------------- | ----------------- | ----------------------------- | ---------------------------------------------------- | ----------- |
| `autoApply`      | `auto-apply`      |                               | `boolean`                                            | `undefined` |
| `end`            | `end`             | The end value of date range   | `string`                                             | `undefined` |
| `extraSelect`    | `extra-select`    |                               | `boolean`                                            | `undefined` |
| `max`            | `max`             | The max value                 | `string`                                             | `undefined` |
| `min`            | `min`             | The min value                 | `string`                                             | `undefined` |
| `parent`         | --                |                               | `HTMLElement`                                        | `undefined` |
| `plain`          | `plain`           | The type of picker            | `"date" \| "datetime" \| "day" \| "month" \| "time"` | `'date'`    |
| `presetPosition` | `preset-position` |                               | `"bottom" \| "left" \| "right" \| "top"`             | `undefined` |
| `resetButton`    | `reset-button`    |                               | `boolean`                                            | `undefined` |
| `start`          | `start`           | The start value of date range | `string`                                             | `undefined` |
| `type`           | `type`            | The type of picker            | `"plain" \| "range"`                                 | `'plain'`   |
| `value`          | `value`           | The start value of date range | `string`                                             | `undefined` |


## Events

| Event            | Description            | Type                                           |
| ---------------- | ---------------------- | ---------------------------------------------- |
| `t-close-popup`  | The close popup event  | `CustomEvent<void>`                            |
| `t-range-change` | The range change event | `CustomEvent<{ start: string; end: string; }>` |
| `t-value-change` | The value change event | `CustomEvent<{ value: string; }>`              |


## Methods

### `gotoDate() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `gotoEnd() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `gotoStart() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [temporal-picker](https://www.npmjs.com/package/temporal-picker)

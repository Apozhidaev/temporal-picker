# temporal-input

### Used by

 - [temporal-picker](https://www.npmjs.com/package/temporal-picker)

## Properties

| Property       | Attribute      | Description                   | Type                                                 | Default     |
| -------------- | -------------- | ----------------------------- | ---------------------------------------------------- | ----------- |
| `disabled`     | `disabled`     |                               | `boolean`                                            | `undefined` |
| `end`          | `end`          | The end value of date range   | `string`                                             | `undefined` |
| `locale`       | `locale`       |                               | `string`                                             | `undefined` |
| `max`          | `max`          | The max value                 | `string`                                             | `undefined` |
| `min`          | `min`          | The min value                 | `string`                                             | `undefined` |
| `native`       | `native`       | The native value              | `boolean`                                            | `undefined` |
| `open`         | `open`         |                               | `boolean`                                            | `undefined` |
| `plain`        | `plain`        | The plain of type             | `"date" \| "datetime" \| "day" \| "month" \| "time"` | `'date'`    |
| `presentation` | `presentation` | The type of picker            | `"button" \| "input"`                                | `'input'`   |
| `readonly`     | `readonly`     |                               | `boolean`                                            | `undefined` |
| `start`        | `start`        | The start value of date range | `string`                                             | `undefined` |
| `type`         | `type`         | The type of picker            | `"plain" \| "range"`                                 | `'plain'`   |
| `value`        | `value`        | The value of date             | `string`                                             | `undefined` |


## Events

| Event            | Description                               | Type                              |
| ---------------- | ----------------------------------------- | --------------------------------- |
| `t-close-popup`  | The close popup event                     | `CustomEvent<void>`               |
| `t-end-change`   | The end value change event (range type)   | `CustomEvent<{ value: string; }>` |
| `t-open-popup`   | The close popup event                     | `CustomEvent<{ index: number; }>` |
| `t-start-change` | The start value change event (range type) | `CustomEvent<{ value: string; }>` |
| `t-value-change` | The value change event                    | `CustomEvent<{ value: string; }>` |


## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"button"`       |             |
| `"end-input"`    |             |
| `"input"`        |             |
| `"range-wrapper"`|             |
| `"separator"`    |             |
| `"start-input"`  |             |

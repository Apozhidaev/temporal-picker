import { PlainType } from '@temporal-picker/core';
type InputType = 'date' | 'time' | 'datetime-local' | 'month' | 'text';

export function toInputType(type: PlainType): InputType {
  switch (type) {
    case 'date':
      return 'date';
    case 'time':
      return 'time';
    case 'datetime':
      return 'datetime-local';
    case 'month':
      return 'month';
    case 'day':
      console.log('day type is not supported yet');
      return 'text';

    default:
      console.log(`unknown type: ${type}`);
      return 'text';
  }
}

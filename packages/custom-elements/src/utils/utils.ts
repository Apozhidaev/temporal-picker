export type PlainType = 'date' | 'time' | 'datetime' | 'month' | 'day';
type InputType = 'date' | 'time' | 'datetime-local' | 'month';

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
      throw new Error('day type is not supported yet');

    default:
      throw new Error(`unknown type: ${type}`);
  }
}

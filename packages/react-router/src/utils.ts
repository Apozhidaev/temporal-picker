export function sameValues(value1?: string | null, value2?: string | null) {
  if (!value1 && !value2) {
    return true;
  }
  return value1 === value2;
}

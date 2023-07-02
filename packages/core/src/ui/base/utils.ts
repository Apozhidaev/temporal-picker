export function shallowEqual(propsA: any, propsB: any) {
  if (Object.is(propsA, propsB)) {
    return true;
  }

  if (
    typeof propsA !== "object" ||
    !propsA ||
    typeof propsB !== "object" ||
    !propsB
  ) {
    return false;
  }

  const keysA = Object.keys(propsA);
  const keysB = Object.keys(propsB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(propsB);

  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    const valueA = propsA[key];
    const valueB = propsB[key];

    if (!Object.is(valueA, valueB)) {
      return false;
    }
  }

  return true;
}
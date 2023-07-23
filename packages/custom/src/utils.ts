const CAMEL_REGEX = /[A-Z]/g;
const KEBAB_REGEX = /-[a-z]/g;

type KebabCase<T> = T extends `${infer F}${infer R}`
  ? Uppercase<F> extends F
    ? `-${Lowercase<F>}${KebabCase<R>}`
    : `${F}${KebabCase<R>}`
  : T;

type CamelCase<S> = S extends `${infer H}-${infer T}`
  ? T extends Capitalize<T>
    ? `${H}-${CamelCase<T>}`
    : `${H}${CamelCase<Capitalize<T>>}`
  : S;

export function kebabCase<T extends string = string>(str: T) {
  return str.replace(CAMEL_REGEX, (match) => {
    return "-" + match.toLowerCase();
  }) as KebabCase<T>;
}

export function camelCase<T extends string = string>(str: T) {
  return str.replace(KEBAB_REGEX, (match) => {
    return match.charAt(1).toUpperCase();
  }) as CamelCase<T>;
}

export function toKebabCase<T extends Record<string, unknown> = Record<string, unknown>>(obj: T) {
  const res: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    res[kebabCase(key)] = obj[key];
  });
  return res;
}

interface TemporalElementConstructor extends CustomElementConstructor {
  elementName: string;
}

export const defineCustomElements = (
  constructors: TemporalElementConstructor[],
  opts?: ElementDefinitionOptions | undefined
) => {
  if (typeof customElements !== "undefined") {
    constructors.forEach((ctor) => {
      if (!customElements.get(ctor.elementName)) {
        customElements.define(ctor.elementName, ctor, opts);
      }
    });
  }
};

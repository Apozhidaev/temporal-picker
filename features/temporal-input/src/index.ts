import { TemporalInput } from "@temporal-picker/custom";

const defineCustomElement = (opts?: ElementDefinitionOptions | undefined) => {
  if (typeof customElements !== "undefined") {
    [TemporalInput].forEach((cmp) => {
      if (!customElements.get(cmp.elementName)) {
        customElements.define(cmp.elementName, cmp, opts);
      }
    });
  }
};

export { defineCustomElement, TemporalInput };

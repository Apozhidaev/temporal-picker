import { TemporalPreset } from "@temporal-picker/custom";

const defineCustomElement = (opts?: ElementDefinitionOptions | undefined) => {
  if (typeof customElements !== "undefined") {
    [TemporalPreset].forEach((cmp) => {
      if (!customElements.get(cmp.elementName)) {
        customElements.define(cmp.elementName, cmp, opts);
      }
    });
  }
};

export { defineCustomElement, TemporalPreset };

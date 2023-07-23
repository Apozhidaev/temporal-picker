import { TemporalPopup, TemporalPreset } from "@temporal-picker/custom";

const defineCustomElement = (opts?: ElementDefinitionOptions | undefined) => {
  if (typeof customElements !== "undefined") {
    [TemporalPopup, TemporalPreset].forEach((cmp) => {
      if (!customElements.get(cmp.elementName)) {
        customElements.define(cmp.elementName, cmp, opts);
      }
    });
  }
};

export { defineCustomElement, TemporalPopup, TemporalPreset };

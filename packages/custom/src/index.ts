import { TemporalPreset } from "./elements/temporal-preset";
import { TemporalPopup } from "./elements/temporal-popup";
import { TemporalInput } from "./elements/temporal-input";
import { TemporalPicker } from "./elements/temporal-picker";

export { t } from "@temporal-picker/core";
export { kebabCase, camelCase, toKebabCase } from "./utils";

const defineCustomElements = (opts?: ElementDefinitionOptions | undefined) => {
  if (typeof customElements !== "undefined") {
    [TemporalPreset, TemporalInput, TemporalPopup, TemporalPicker].forEach((cmp) => {
      if (!customElements.get(cmp.elementName)) {
        customElements.define(cmp.elementName, cmp, opts);
      }
    });
  }
};

export { defineCustomElements, TemporalPreset, TemporalInput, TemporalPopup, TemporalPicker };

import { TemporalPreset } from "./elements/temporal-preset";
import { TemporalPopup } from "./elements/temporal-popup";
import { TemporalInput } from "./elements/temporal-input";
import { TemporalPicker } from "./elements/temporal-picker";

const defineCustomElements = (options?: ElementDefinitionOptions | undefined) => {
  if (typeof customElements !== "undefined") {
    if (!customElements.get("temporal-preset")) {
      customElements.define("temporal-preset", TemporalPreset, options);
    }
    if (!customElements.get("temporal-popup")) {
      customElements.define("temporal-popup", TemporalPopup, options);
    }
    if (!customElements.get("temporal-input")) {
      customElements.define("temporal-input", TemporalInput, options);
    }
    if (!customElements.get("temporal-picker")) {
      customElements.define("temporal-picker", TemporalPicker, options);
    }
  }
};

export { defineCustomElements };

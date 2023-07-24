import { TemporalPopup, TemporalPreset, defineCustomElements } from "@temporal-picker/custom";

export const define = defineCustomElements.bind(null, [TemporalPopup, TemporalPreset]);

export { TemporalPopup, TemporalPreset };

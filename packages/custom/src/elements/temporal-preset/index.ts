import { CustomElement } from "../base/CustomElement";

export class TemporalPreset extends CustomElement {
  static elementName = "temporal-preset";
  static get observedAttributes() {
    return ["type", "label", "start", "end", "value"];
  }

  constructor() {
    super();
  }

  get type() {
    return this.getAttribute("type");
  }

  get label() {
    return this.getAttribute("label");
  }

  get start() {
    return this.getAttribute("start");
  }

  get end() {
    return this.getAttribute("end");
  }

  get value() {
    return this.getAttribute("value");
  }
}

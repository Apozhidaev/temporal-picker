import { PresetPosition } from "@temporal-picker/core";
import { TemporalElement } from "./TemporalElement";

export class PopupElement extends TemporalElement {
  constructor() {
    super();
  }

  get autoApply() {
    return this.getBooleanAttribute("auto-apply");
  }
  set autoApply(value: boolean | null) {
    if (value) {
      this.setAttribute("auto-apply", "");
    } else {
      this.removeAttribute("auto-apply");
    }
  }

  get resetButton() {
    return this.getBooleanAttribute("reset-button");
  }
  set resetButton(value: boolean | null) {
    if (value) {
      this.setAttribute("reset-button", "");
    } else {
      this.removeAttribute("reset-button");
    }
  }

  get extraSelect() {
    return this.getBooleanAttribute("extra-select");
  }
  set extraSelect(value: boolean | null) {
    if (value) {
      this.setAttribute("extra-select", "");
    } else {
      this.removeAttribute("extra-select");
    }
  }

  get presetPosition(): PresetPosition | null {
    return this.getAttribute("preset-position") as PresetPosition | null;
  }
  set presetPosition(value: PresetPosition | null) {
    if (value) {
      this.setAttribute("preset-position", "");
    } else {
      this.removeAttribute("preset-position");
    }
  }

  get tooltip() {
    return this.getBooleanAttribute("tooltip");
  }
  set tooltip(value: boolean | null) {
    if (value) {
      this.setAttribute("tooltip", "");
    } else {
      this.removeAttribute("tooltip");
    }
  }

  get customLayout() {
    return this.getBooleanAttribute("custom-layout");
  }
  set customLayout(value: boolean | null) {
    if (value) {
      this.setAttribute("custom-layout", "");
    } else {
      this.removeAttribute("custom-layout");
    }
  }

  get localeApply() {
    return this.getAttribute("locale-apply");
  }
  set localeApply(value: string | null) {
    if (value) {
      this.setAttribute("locale-apply", "");
    } else {
      this.removeAttribute("locale-apply");
    }
  }

  get localeCancel() {
    return this.getAttribute("locale-cancel");
  }
  set localeCancel(value: string | null) {
    if (value) {
      this.setAttribute("locale-cancel", "");
    } else {
      this.removeAttribute("locale-cancel");
    }
  }

  get localeClear() {
    return this.getAttribute("locale-clear");
  }
  set localeClear(value: string | null) {
    if (value) {
      this.setAttribute("locale-clear", "");
    } else {
      this.removeAttribute("locale-clear");
    }
  }

  get firstDay() {
    return this.getNumberAttribute("first-day");
  }
  set firstDay(value: number | null) {
    if (value) {
      this.setAttribute("first-day", "");
    } else {
      this.removeAttribute("first-day");
    }
  }

  get strict() {
    return this.getBooleanAttribute("strict");
  }
  set strict(value: boolean | null) {
    if (value) {
      this.setAttribute("strict", "");
    } else {
      this.removeAttribute("strict");
    }
  }

  get reselect() {
    return this.getBooleanAttribute("reselect");
  }
  set reselect(value: boolean | null) {
    if (value) {
      this.setAttribute("reselect", "");
    } else {
      this.removeAttribute("reselect");
    }
  }

  get rowHeader() {
    return this.getBooleanAttribute("row-header");
  }
  set rowHeader(value: boolean | null) {
    if (value) {
      this.setAttribute("row-header", "");
    } else {
      this.removeAttribute("row-header");
    }
  }

  get pickHover() {
    return this.getBooleanAttribute("pick-hover");
  }
  set pickHover(value: boolean | null) {
    if (value) {
      this.setAttribute("pick-hover", "");
    } else {
      this.removeAttribute("pick-hover");
    }
  }
}

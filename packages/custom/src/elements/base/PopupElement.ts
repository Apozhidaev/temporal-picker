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
    switch (value) {
      case true:
        this.setAttribute("auto-apply", "");
        break;
      case false:
        this.setAttribute("auto-apply", "false");
        break;
      default:
        this.removeAttribute("auto-apply");
        break;
    }
  }

  get resetButton() {
    return this.getBooleanAttribute("reset-button");
  }
  set resetButton(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("reset-button", "");
        break;
      case false:
        this.setAttribute("reset-button", "false");
        break;
      default:
        this.removeAttribute("reset-button");
        break;
    }
  }

  get extraSelect() {
    return this.getBooleanAttribute("extra-select");
  }
  set extraSelect(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("extra-select", "");
        break;
      case false:
        this.setAttribute("extra-select", "false");
        break;
      default:
        this.removeAttribute("extra-select");
        break;
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
    switch (value) {
      case true:
        this.setAttribute("tooltip", "");
        break;
      case false:
        this.setAttribute("tooltip", "false");
        break;
      default:
        this.removeAttribute("tooltip");
        break;
    }
  }

  get customLayout() {
    return this.getBooleanAttribute("custom-layout");
  }
  set customLayout(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("custom-layout", "");
        break;
      case false:
        this.setAttribute("custom-layout", "false");
        break;
      default:
        this.removeAttribute("custom-layout");
        break;
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
    switch (value) {
      case true:
        this.setAttribute("strict", "");
        break;
      case false:
        this.setAttribute("strict", "false");
        break;
      default:
        this.removeAttribute("strict");
        break;
    }
  }

  get reselect() {
    return this.getBooleanAttribute("reselect");
  }
  set reselect(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("reselect", "");
        break;
      case false:
        this.setAttribute("reselect", "false");
        break;
      default:
        this.removeAttribute("reselect");
        break;
    }
  }

  get rowHeader() {
    return this.getBooleanAttribute("row-header");
  }
  set rowHeader(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("row-header", "");
        break;
      case false:
        this.setAttribute("row-header", "false");
        break;
      default:
        this.removeAttribute("row-header");
        break;
    }
  }

  get pickLabel() {
    return this.getBooleanAttribute("pick-label");
  }
  set pickLabel(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("pick-label", "");
        break;
      case false:
        this.setAttribute("pick-label", "false");
        break;
      default:
        this.removeAttribute("pick-label");
        break;
    }
  }

  get pickHover() {
    return this.getBooleanAttribute("pick-hover");
  }
  set pickHover(value: boolean | null) {
    switch (value) {
      case true:
        this.setAttribute("pick-hover", "");
        break;
      case false:
        this.setAttribute("pick-hover", "false");
        break;
      default:
        this.removeAttribute("pick-hover");
        break;
    }
  }
}

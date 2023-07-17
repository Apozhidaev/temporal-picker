import { createPopper, Instance } from "@popperjs/core";
import { PickerElement } from "../base/PickerElement";
import { TemporalInput } from "../temporal-input";
import { TemporalPopup } from "../temporal-popup";
import { styles } from "./styles";
import { PlainInstant, RangeInstant } from "../../types";

export class TemporalPicker extends PickerElement {
  static elementName = "temporal-picker";
  static formAssociated = true;
  static get observedAttributes() {
    return [
      "name",
      "picker",
      "type",
      "plain",
      "start",
      "end",
      "value",
      "min",
      "max",
      "native",
      "disabled",
      "readonly",
      "auto-apply",
      "reset-button",
      "extra-select",
      "preset-position",
      "tooltip",
      "custom-layout",
      "locale",
      "locale-apply",
      "locale-cancel",
      "locale-clear",
      "first-day",
      "strict",
      "reselect",
      "row-header",
      "pick-hover",
    ];
  }

  private input!: TemporalInput;
  private popup!: TemporalPopup;
  private popper!: Instance;
  private _open: boolean = false;
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
    const shadow = this.attachShadow({ mode: "open", delegatesFocus: true });

    const style = document.createElement("style");
    style.textContent = styles;
    shadow.appendChild(style);
  }

  get form() {
    return this._internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }

  get open() {
    return this._open;
  }
  set open(value: boolean) {
    if (this._open === value) {
      return;
    }
    this._open = value;
    if (value) {
      document.addEventListener("click", this.documentClickHandler, true);
      document.body.appendChild(this.popup);
      this.popper.forceUpdate();
      this.input.open = true;
    } else {
      document.removeEventListener("click", this.documentClickHandler, true);
      document.body.removeChild(this.popup);
      this.input.open = false;
    }
  }

  private closePopupHandler = () => {
    this.open = false;
  };

  private documentClickHandler = (e: any) => {
    if (!this.contains(e.target) && !this.popup?.contains(e.target)) {
      const labels = Array.from(this._internals.labels);
      if (!labels.some((label) => label.contains(e.target))) {
        this.closePopupHandler();
      }
    }
  };

  private valueChangeHandler() {
    this.dispatchValueChange({ value: this.value });
  }

  private rangeChangeHandler() {
    this.dispatchRangeChange({ start: this.start, end: this.end });
  }

  protected componentDidLoad() {
    this.input = this.getInput();
    this.popup = this.getPopup();

    document.body.appendChild(this.popup);
    this.popper = createPopper(this, this.popup, {
      placement: this.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 2],
          },
        },
      ],
    });
    document.body.removeChild(this.popup);

    this.focus = (...args: any[]) => {
      this.input.focus(...args);
    };
    this.blur = () => {
      this.input.blur();
    };

    this.shadowRoot?.append(this.input);
  }

  private getInput() {
    const input = new TemporalInput();
    input.className = "temporal-input";
    input.setAttribute("exportparts", "button,input,range-wrapper,start-input,separator,end-input");
    input.presentation = this.picker;
    input.type = this.type;
    input.plain = this.plain;
    input.value = this.value;
    input.start = this.start;
    input.end = this.end;
    input.min = this.min;
    input.max = this.max;
    input.disabled = this.disabled;
    input.readonly = this.readonly;
    input.locale = this.locale;
    input.native =
      this.native || this.plain === "datetime" || this.plain === "time" || this.plain === "day";

    input.addEventListener("t-value-change", (e: any) => {
      this.value = e.detail.value;
      this.popup.value = e.detail.value;
      this.valueChangeHandler();
    });
    input.addEventListener("t-start-change", (e: any) => {
      this.start = e.detail.value;
      this.popup.start = e.detail.value;
      this.rangeChangeHandler();
    });
    input.addEventListener("t-end-change", (e: any) => {
      this.end = e.detail.value;
      this.popup.end = e.detail.value;
      this.rangeChangeHandler();
    });
    input.addEventListener("t-open-popup", (e: any) => {
      this.open = true;
      this.popup.scrollToIndex(e.detail.index);
    });
    input.addEventListener("t-close-popup", (e: any) => {
      this.open = false;
    });
    return input;
  }

  private getPopup() {
    const popup = new TemporalPopup();
    popup.type = this.type;
    popup.plain = this.plain;
    popup.value = this.value;
    popup.start = this.start;
    popup.end = this.end;
    popup.min = this.min;
    popup.max = this.max;
    popup.autoApply = this.autoApply;
    popup.resetButton = this.resetButton;
    popup.extraSelect = this.extraSelect;
    popup.presetPosition = this.presetPosition;
    popup.tooltip = this.tooltip;
    popup.customLayout = this.customLayout;
    popup.locale = this.locale;
    popup.localeApply = this.localeApply;
    popup.localeCancel = this.localeCancel;
    popup.localeClear = this.localeClear;
    popup.firstDay = this.firstDay;
    popup.strict = this.strict;
    popup.reselect = this.reselect;
    popup.rowHeader = this.rowHeader;
    popup.pickHover = this.pickHover;

    popup.addEventListener("t-value-change", (e: any) => {
      this.value = e.detail.value;
      this.input.value = e.detail.value;
      this.valueChangeHandler();
    });
    popup.addEventListener("t-range-change", (e: any) => {
      this.start = e.detail.start;
      this.end = e.detail.end;
      this.input.start = e.detail.start;
      this.input.end = e.detail.end;
      this.rangeChangeHandler();
    });
    popup.addEventListener("t-close-popup", (e: any) => {
      this.closePopupHandler();
    });
    return popup;
  }

  protected componentDidUpdate(name: string) {
    switch (name) {
      case "picker":
        this.input.presentation = this.picker;
        break;
      case "plain":
        this.input.plain = this.plain;
        this.popup.plain = this.plain;
        this.input.native =
          this.native || this.plain === "datetime" || this.plain === "time" || this.plain === "day";
        break;
      case "min":
      case "max":
      case "locale":
        this.input[name] = this[name];
        this.popup[name] = this[name];
        break;
      case "disabled":
      case "readonly":
        this.input[name] = this[name];
        break;
      case "native":
        this.input.native =
          this.native || this.plain === "datetime" || this.plain === "time" || this.plain === "day";
        break;
      case "autoApply":
      case "resetButton":
      case "extraSelect":
      case "tooltip":
      case "customLayout":
      case "strict":
      case "reselect":
      case "rowHeader":
      case "pickHover":
        this.popup[name] = this[name];
        break;
      case "firstDay":
        this.popup[name] = this[name];
        break;
      case "localeClear":
      case "localeApply":
      case "localeCancel":
        this.popup[name] = this[name];
        break;
      case "presetPosition":
        this.popup[name] = this[name];
        break;
      case "value":
        this.input[name] = this[name];
        this.popup[name] = this[name];
        this._internals.setFormValue(this.value ? this.value : null);
      case "start":
      case "end": {
        this.input[name] = this[name];
        this.popup[name] = this[name];
        if (this.start || this.end) {
          const n = this.name;
          const entries = new FormData();
          entries.append(n + "-start", this.start);
          entries.append(n + "-end", this.end);
          this._internals.setFormValue(entries);
        } else {
          this._internals.setFormValue(null);
        }
        break;
      }

      default:
        break;
    }
  }

  private dispatchValueChange(detail: PlainInstant) {
    this.dispatchEvent(new CustomEvent<PlainInstant>("t-value-change", { detail }));
  }

  private dispatchRangeChange(detail: RangeInstant) {
    this.dispatchEvent(new CustomEvent<RangeInstant>("t-range-change", { detail }));
  }
}

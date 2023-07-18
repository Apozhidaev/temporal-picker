import { DatePopup, RangePopup } from "@temporal-picker/core";
import { TemporalPreset } from "../temporal-preset";
import { PopupElement } from "../base/PopupElement";
import { styles } from "./styles";
import { PlainInstant, RangeInstant } from "../../types";
import { camelCase } from "../../utils";

export class TemporalPopup extends PopupElement {
  static elementName = "temporal-popup";
  static get observedAttributes() {
    return [
      "type",
      "plain",
      "start",
      "end",
      "value",
      "min",
      "max",
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
      "pick-label",
      "pick-hover",
    ];
  }

  public picker?: HTMLElement;
  private container: HTMLElement;
  private datePopup?: DatePopup;
  private rangePopup?: RangePopup;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = styles;
    shadow.appendChild(style);

    this.container = document.createElement("div");
    shadow.appendChild(this.container);
  }

  async scrollToIndex(index: number) {
    this.datePopup?.select([this.value]);
    this.rangePopup?.select([this.start, this.end], index);
  }

  async select(values: string[], scrollToIndex = 0) {
    this.datePopup?.select(values);
    this.rangePopup?.select(values, scrollToIndex);
  }

  protected componentDidLoad() {
    const host = this.picker || this;
    const container = this.container;
    container.addEventListener("t-close", () => {
      this.dispatchClose();
    });
    switch (this.type) {
      case "range": {
        const presets = Array.from(host.querySelectorAll<TemporalPreset>("temporal-preset"));
        this.rangePopup = new RangePopup(
          {
            plain: this.plain,
            autoApply: this.autoApply,
            resetButton: this.resetButton,
            extraSelect: this.extraSelect,
            min: this.min,
            max: this.max,
            presets: presets.map((x) => ({
              start: x.start,
              end: x.end,
              label: x.label!,
            })),
            presetPosition: this.presetPosition,
            tooltip: this.tooltip,
            customLayout: this.customLayout,
            locale: this.locale,
            localeApply: this.localeApply,
            localeCancel: this.localeCancel,
            localeClear: this.localeClear,
            firstDay: this.firstDay,
            strict: this.strict,
            reselect: this.reselect,
            rowHeader: this.rowHeader,
            pickLabel: this.pickLabel,
            pickHover: this.pickHover,
            values: [this.start, this.end],
          },
          container,
          host
        );
        container.addEventListener("t-select", (e: any) => {
          this.start = e.detail.values[0] || "";
          this.end = e.detail.values[1] || "";
          this.dispatchRangeChange({
            start: this.start,
            end: this.end,
          });
          this.dispatchClose();
        });
        container.addEventListener("t-reset", () => {
          this.start = "";
          this.end = "";
          this.dispatchRangeChange({ start: "", end: "" });
          this.dispatchClose();
        });
        break;
      }

      default: {
        this.datePopup = new DatePopup(
          {
            plain: this.plain,
            autoApply: this.autoApply,
            resetButton: this.resetButton,
            extraSelect: this.extraSelect,
            min: this.min,
            max: this.max,
            customLayout: this.customLayout,
            locale: this.locale,
            localeApply: this.localeApply,
            localeCancel: this.localeCancel,
            localeClear: this.localeClear,
            firstDay: this.firstDay,
            rowHeader: this.rowHeader,
            pickLabel: this.pickLabel,
            values: [this.value],
          },
          container,
          host
        );
        container.addEventListener("t-select", (e: any) => {
          this.value = e.detail.values[0] || "";
          this.dispatchValueChange({ value: this.value });
          this.dispatchClose();
        });
        container.addEventListener("t-reset", () => {
          this.value = "";
          this.dispatchValueChange({ value: "" });
          this.dispatchClose();
        });
        break;
      }
    }
  }

  protected componentDidUpdate(name: string) {
    switch (name) {
      case "plain":
      case "min":
      case "max":
      case "auto-apply":
      case "reset-button":
      case "extra-select":
      case "preset-position":
      case "tooltip":
      case "custom-layout":
      case "first-day":
      case "strict":
      case "reselect":
      case "locale":
      case "locale-clear":
      case "locale-apply":
      case "locale-cancel":
      case "row-header":
      case "pick-label":
      case "pick-hover": {
        const propName = camelCase(name);
        if (this.type === "range") {
          this.rangePopup?.setOptions({ [propName]: this[propName] });
        } else {
          this.datePopup?.setOptions({ [propName]: this[propName] });
        }
        break;
      }

      case "value":
        if (this.datePopup) {
          const [value] = this.datePopup.getValues();
          if (this.value !== value) {
            this.datePopup.select([this.value]);
          }
        }
        break;

      case "start":
        if (this.rangePopup) {
          const [start] = this.rangePopup.getValues();
          if (this.start !== start) {
            this.rangePopup.select([this.start, this.end]);
          }
        }

        break;

      case "end":
        if (this.rangePopup) {
          const [, end] = this.rangePopup.getValues();
          if (this.end !== end) {
            this.rangePopup.select([this.start, this.end], 1);
          }
        }

        break;

      default:
        break;
    }
  }

  private dispatchClose() {
    this.dispatchEvent(new CustomEvent("t-close-popup"));
  }

  private dispatchValueChange(detail: PlainInstant) {
    this.dispatchEvent(new CustomEvent<PlainInstant>("t-value-change", { detail }));
  }

  private dispatchRangeChange(detail: RangeInstant) {
    this.dispatchEvent(new CustomEvent<RangeInstant>("t-range-change", { detail }));
  }
}

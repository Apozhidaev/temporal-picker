import { PlainType, t } from "@temporal-picker/core";
import { InputElement } from "../base/InputElement";
import { styles } from "./styles";

type InputType = "date" | "time" | "datetime-local" | "month" | "text";
type ChangeType = "t-value-change" | "t-start-change" | "t-end-change";

function toInputType(type: PlainType): InputType {
  switch (type) {
    case "date":
      return "date";
    case "time":
      return "time";
    case "datetime":
      return "datetime-local";
    case "month":
      return "month";
    case "day":
      console.log("day type is not supported yet");
      return "text";

    default:
      console.log(`unknown type: ${type}`);
      return "text";
  }
}

function clearInput(input: HTMLInputElement) {
  if (!input.max) {
    input.removeAttribute("max");
  }
  if (!input.min) {
    input.removeAttribute("min");
  }
}

function clearButton(button: HTMLButtonElement) {
  if (!button.title) {
    button.removeAttribute("title");
  }
}

export type TemporalInputValue = { value: string };
export type TemporalInputIndex = { index: number };

const maxYear = 9000;

export class TemporalInput extends InputElement {
  static elementName = "temporal-input";
  static get observedAttributes() {
    return [
      "presentation",
      "type",
      "plain",
      "start",
      "end",
      "value",
      "min",
      "max",
      "locale",
      "native",
      "open",
      "disabled",
      "readonly",
    ];
  }

  private focusElement?: HTMLElement;
  private button!: HTMLButtonElement;
  private input!: HTMLInputElement;
  private startInput!: HTMLInputElement;
  private endInput!: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open", delegatesFocus: true });

    const style = document.createElement("style");
    style.textContent = styles;
    shadow.appendChild(style);
  }

  private valueChangeHandler(event: TemporalInputValue) {
    if (t.invalid(event.value)) {
      return;
    }
    this.dispatchChange("t-value-change", event);
  }

  private startChangeHandler(event: TemporalInputValue) {
    if (t.invalid(event.value)) {
      return;
    }
    if (t.valid(this.end)) {
      if (event.value > this.end) {
        this.dispatchChange("t-end-change", { value: "" });
        return;
      }
    }
    this.dispatchChange("t-start-change", event);
  }

  private blurHandler(type: ChangeType, input: HTMLInputElement, maxValue = maxYear) {
    const inputValue = input.value;
    const date = new Date(inputValue);
    if (date.getFullYear() > maxValue) {
      date.setFullYear(maxValue);
      this.dispatchChange(type, { value: t(this.plain).fromJSDate(date) });
      return;
    }
    if (t.invalid(inputValue)) {
      if (inputValue) {
        this.dispatchChange(type, { value: "" });
      }
      return;
    }
  }

  private endChangeHandler(event: TemporalInputValue) {
    if (t.invalid(event.value)) {
      return;
    }
    if (t.valid(this.start)) {
      if (event.value < this.start) {
        this.dispatchChange("t-start-change", { value: "" });
        return;
      }
    }
    this.dispatchChange("t-end-change", event);
  }

  private openPopupHandler(event: TemporalInputIndex) {
    if (!this.native) {
      this.dispatchOpen(event);
    }
  }

  private closePopupHandler() {
    if (!this.native) {
      this.dispatchClose();
    }
  }

  private getTitle() {
    if (this.type === "range") {
      if (this.start && this.end) {
        return `${t(this.plain).display(this.start, this.locale)} — ${t(this.plain).display(
          this.end,
          this.locale
        )}`;
      }
      if (this.start) {
        return `≥ ${t(this.plain).display(this.start, this.locale)}`;
      }
      if (this.end) {
        return `≤ ${t(this.plain).display(this.end, this.locale)}`;
      }
    }
    if (this.value) {
      return t(this.plain).display(this.value, this.locale);
    }
    return "";
  }

  private handleKeyDown(e: KeyboardEvent, index: number) {
    if (e.code === "Space") {
      if (!this.native) {
        e.preventDefault();
      }
      this.openPopupHandler({ index });
    }
    if (e.code === "Enter") {
      if (!this.native) {
        e.preventDefault();
      }
      this.closePopupHandler();
    }
  }

  private handleInputClick(e: MouseEvent, index: number) {
    if (!this.native) {
      e.preventDefault();
    }
    this.openPopupHandler({ index });
  }

  protected componentDidLoad() {
    this.focus = (...args: any[]) => {
      this.focusElement?.focus(...args);
    };
    this.blur = () => {
      this.focusElement?.blur();
    };

    this.shadowRoot?.append(this.getPresentation());
  }

  protected componentDidUpdate(name: string) {
    if (this.presentation === "button") {
      this.updateButton(name);
    } else if (this.type === "range") {
      this.updateRange(name);
    } else {
      this.updateInput(name);
    }
  }

  private getPresentation() {
    if (this.presentation === "button") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button";
      button.setAttribute("part", "button");
      button.title = this.getTitle();
      button.disabled = this.disabled;
      button.onclick = () => {
        if (this.open) {
          this.closePopupHandler();
        } else {
          this.openPopupHandler({ index: 0 });
        }
      };
      button.onkeydown = (e) => {
        this.handleKeyDown(e, 0);
      };
      button.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="button-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
      `;
      this.focusElement = button;
      this.button = button;
      clearButton(button);
      return button;
    }
    switch (this.type) {
      case "range": {
        const rangeWrapper = document.createElement("div");
        rangeWrapper.className = "range-wrapper";
        rangeWrapper.setAttribute("part", "range-wrapper");
        rangeWrapper.onmousedown = (e: MouseEvent) => {
          if (!(e.target as HTMLElement).closest(".input")) {
            e.preventDefault();
          }
        };

        // -----------------------------
        const startInput = document.createElement("input");
        startInput.className = `input start-input ${this.native ? "native" : ""}`;
        startInput.setAttribute("part", "start-input");
        startInput.type = toInputType(this.plain);
        startInput.min = this.min;
        startInput.max = this.end || this.max;
        startInput.disabled = this.disabled;
        startInput.readOnly = this.readonly;
        startInput.value = t(this.plain).normalize(this.start) || "";
        startInput.onchange = (e: any) => {
          this.startChangeHandler({ value: e.target.value });
          this.dispatchClose();
        };
        startInput.onclick = (e) => {
          this.handleInputClick(e, 0);
        };
        startInput.onkeydown = (e) => {
          this.handleKeyDown(e, 0);
        };
        startInput.onblur = () => this.blurHandler("t-start-change", startInput, maxYear - 1);
        this.focusElement = startInput;
        this.startInput = startInput;
        clearInput(startInput);
        rangeWrapper.appendChild(startInput);

        // -----------------------
        const separator = document.createElement("div");
        separator.className = "separator";
        separator.setAttribute("part", "separator");
        separator.innerHTML = `
              <svg
                class="separator-icon"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
              </svg>
          `;
        rangeWrapper.appendChild(separator);

        // -----------------------------
        const endInput = document.createElement("input");
        endInput.className = `input end-input ${this.native ? "native" : ""}`;
        endInput.setAttribute("part", "end-input");
        endInput.type = toInputType(this.plain);
        endInput.min = this.start || this.min;
        endInput.max = this.max;
        endInput.disabled = this.disabled;
        endInput.readOnly = this.readonly;
        endInput.value = t(this.plain).normalize(this.end) || "";
        endInput.onchange = (e: any) => {
          this.endChangeHandler({ value: e.target.value });
          this.dispatchClose();
        };
        endInput.onclick = (e) => {
          this.handleInputClick(e, 1);
        };
        endInput.onkeydown = (e) => {
          this.handleKeyDown(e, 1);
        };
        endInput.onblur = () => this.blurHandler("t-end-change", endInput);
        this.endInput = endInput;
        clearInput(endInput);
        rangeWrapper.appendChild(endInput);

        return rangeWrapper;
      }

      default: {
        const input = document.createElement("input");
        input.className = "input";
        input.setAttribute("part", "input");
        input.type = toInputType(this.plain);
        input.min = this.min;
        input.max = this.max;
        input.disabled = this.disabled;
        input.readOnly = this.readonly;
        input.value = t(this.plain).normalize(this.value) || "";
        input.onchange = (e: any) => {
          this.valueChangeHandler({ value: e.target.value });
          this.dispatchClose();
        };
        input.onclick = (e) => {
          this.handleInputClick(e, 0);
        };
        input.onkeydown = (e) => {
          this.handleKeyDown(e, 0);
        };
        input.onblur = () => this.blurHandler("t-value-change", input);
        this.focusElement = input;
        this.input = input;
        clearInput(input);
        return input;
      }
    }
  }

  private dispatchOpen(detail: TemporalInputIndex) {
    this.dispatchEvent(new CustomEvent("t-open-popup", { detail }));
  }

  private dispatchClose() {
    this.dispatchEvent(new CustomEvent("t-close-popup"));
  }

  private dispatchChange(type: ChangeType, detail: TemporalInputValue) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }

  private updateButton(name: string) {
    switch (name) {
      case "end":
      case "start":
      case "value":
        this.button.title = this.getTitle();
        break;
      case "disabled":
        this.button.disabled = this.disabled;
        break;
      default:
        break;
    }

    clearButton(this.button);
  }

  private updateRange(name: string) {
    switch (name) {
      case "start":
        this.startInput.value = this.start;
        this.endInput.min = this.start || this.min;
        break;
      case "end":
        this.endInput.value = this.end;
        this.startInput.max = this.end || this.max;
        break;
      case "min":
        this.startInput.min = this.min;
        this.endInput.min = this.start || this.min;
        break;
      case "max":
        this.startInput.max = this.end || this.max;
        this.endInput.max = this.max;
        break;
      case "disabled":
        this.startInput.disabled = this.disabled;
        this.endInput.disabled = this.disabled;
        break;
      case "readonly":
        this.startInput.readOnly = this.readonly;
        this.endInput.readOnly = this.readonly;
        break;
      case "native":
        this.startInput.className = `input start-input ${this.native ? "native" : ""}`;
        this.endInput.className = `input end-input ${this.native ? "native" : ""}`;
        break;
      default:
        break;
    }

    clearInput(this.startInput);
    clearInput(this.endInput);
  }

  private updateInput(name: string) {
    switch (name) {
      case "value":
        this.input.value = this.value;
        break;
      case "min":
        this.input.min = this.min;
        break;
      case "max":
        this.input.max = this.max;
        break;
      case "disabled":
        this.input.disabled = this.disabled;
        break;
      case "readonly":
        this.input.readOnly = this.readonly;
        break;
      default:
        break;
    }

    clearInput(this.input);
  }
}

/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PickerType, PlainType, Presentation } from "@temporal-picker/core";
import { TemporalInputValue } from "./components/temporal-input/temporal-input";
import { PlainInstant, RangeInstant } from "./components/temporal-picker/temporal-picker";
import { PlainInstant as PlainInstant1, RangeInstant as RangeInstant1 } from "./components/temporal-picker/temporal-picker";
export { PickerType, PlainType, Presentation } from "@temporal-picker/core";
export { TemporalInputValue } from "./components/temporal-input/temporal-input";
export { PlainInstant, RangeInstant } from "./components/temporal-picker/temporal-picker";
export { PlainInstant as PlainInstant1, RangeInstant as RangeInstant1 } from "./components/temporal-picker/temporal-picker";
export namespace Components {
    interface TemporalInput {
        "disabled": boolean;
        /**
          * The max value
         */
        "max": string;
        /**
          * The min value
         */
        "min": string;
        /**
          * The native value
         */
        "native": boolean;
        /**
          * The plain of type
         */
        "plain": PlainType;
        "readonly": boolean;
        /**
          * The value of date
         */
        "value": string;
    }
    interface TemporalPicker {
        "autoApply": boolean;
        "customLayout": boolean;
        "disabled": boolean;
        /**
          * The end value of date range
         */
        "end": string;
        "extraSelect": boolean;
        "firstDay": number;
        "locale": string;
        "localeApply": string;
        "localeCancel": string;
        "localeClear": string;
        /**
          * The max value
         */
        "max": string;
        /**
          * The min value
         */
        "min": string;
        /**
          * The native value
         */
        "native": boolean;
        /**
          * The type of picker
         */
        "picker": Presentation;
        "placement": 'bottom' | 'bottom-start' | 'bottom-end';
        /**
          * The type of picker
         */
        "plain": PlainType;
        "presetPosition": 'left' | 'right' | 'top' | 'bottom';
        "readonly": boolean;
        "resetButton": boolean;
        /**
          * The start value of date range
         */
        "start": string;
        "strict": boolean;
        "tooltip": boolean;
        /**
          * The type of picker
         */
        "type": PickerType;
        /**
          * The value of date
         */
        "value": string;
    }
    interface TemporalPopup {
        "autoApply": boolean;
        "customLayout": boolean;
        /**
          * The end value of date range
         */
        "end": string;
        "extraSelect": boolean;
        "firstDay": number;
        "locale": string;
        "localeApply": string;
        "localeCancel": string;
        "localeClear": string;
        /**
          * The max value
         */
        "max": string;
        /**
          * The min value
         */
        "min": string;
        "picker": HTMLElement;
        /**
          * The type of picker
         */
        "plain": PlainType;
        "presetPosition": 'left' | 'right' | 'top' | 'bottom';
        "resetButton": boolean;
        "scrollToEnd": () => Promise<void>;
        "scrollToStart": () => Promise<void>;
        "scrollToValue": () => Promise<void>;
        "select": (values: string[], scrollToIndex?: number, shift?: number) => Promise<void>;
        /**
          * The start value of date range
         */
        "start": string;
        "strict": boolean;
        "tooltip": boolean;
        /**
          * The type of picker
         */
        "type": PickerType;
        /**
          * The start value of date range
         */
        "value": string;
    }
    interface TemporalPreset {
        /**
          * The end value of date range
         */
        "end": string;
        /**
          * The label
         */
        "label": string;
        /**
          * The start value of date range
         */
        "start": string;
        /**
          * The type of preset
         */
        "type": 'range';
    }
}
export interface TemporalInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTemporalInputElement;
}
export interface TemporalPickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTemporalPickerElement;
}
export interface TemporalPopupCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTemporalPopupElement;
}
declare global {
    interface HTMLTemporalInputElement extends Components.TemporalInput, HTMLStencilElement {
    }
    var HTMLTemporalInputElement: {
        prototype: HTMLTemporalInputElement;
        new (): HTMLTemporalInputElement;
    };
    interface HTMLTemporalPickerElement extends Components.TemporalPicker, HTMLStencilElement {
    }
    var HTMLTemporalPickerElement: {
        prototype: HTMLTemporalPickerElement;
        new (): HTMLTemporalPickerElement;
    };
    interface HTMLTemporalPopupElement extends Components.TemporalPopup, HTMLStencilElement {
    }
    var HTMLTemporalPopupElement: {
        prototype: HTMLTemporalPopupElement;
        new (): HTMLTemporalPopupElement;
    };
    interface HTMLTemporalPresetElement extends Components.TemporalPreset, HTMLStencilElement {
    }
    var HTMLTemporalPresetElement: {
        prototype: HTMLTemporalPresetElement;
        new (): HTMLTemporalPresetElement;
    };
    interface HTMLElementTagNameMap {
        "temporal-input": HTMLTemporalInputElement;
        "temporal-picker": HTMLTemporalPickerElement;
        "temporal-popup": HTMLTemporalPopupElement;
        "temporal-preset": HTMLTemporalPresetElement;
    }
}
declare namespace LocalJSX {
    interface TemporalInput {
        "disabled"?: boolean;
        /**
          * The max value
         */
        "max"?: string;
        /**
          * The min value
         */
        "min"?: string;
        /**
          * The native value
         */
        "native"?: boolean;
        /**
          * The close popup event
         */
        "onT-close-popup"?: (event: TemporalInputCustomEvent<void>) => void;
        /**
          * The close popup event
         */
        "onT-open-popup"?: (event: TemporalInputCustomEvent<void>) => void;
        /**
          * The value change event
         */
        "onT-value-change"?: (event: TemporalInputCustomEvent<TemporalInputValue>) => void;
        /**
          * The plain of type
         */
        "plain"?: PlainType;
        "readonly"?: boolean;
        /**
          * The value of date
         */
        "value"?: string;
    }
    interface TemporalPicker {
        "autoApply"?: boolean;
        "customLayout"?: boolean;
        "disabled"?: boolean;
        /**
          * The end value of date range
         */
        "end"?: string;
        "extraSelect"?: boolean;
        "firstDay"?: number;
        "locale"?: string;
        "localeApply"?: string;
        "localeCancel"?: string;
        "localeClear"?: string;
        /**
          * The max value
         */
        "max"?: string;
        /**
          * The min value
         */
        "min"?: string;
        /**
          * The native value
         */
        "native"?: boolean;
        /**
          * The range change event
         */
        "onT-range-change"?: (event: TemporalPickerCustomEvent<RangeInstant>) => void;
        /**
          * The value change event
         */
        "onT-value-change"?: (event: TemporalPickerCustomEvent<PlainInstant>) => void;
        /**
          * The type of picker
         */
        "picker"?: Presentation;
        "placement"?: 'bottom' | 'bottom-start' | 'bottom-end';
        /**
          * The type of picker
         */
        "plain"?: PlainType;
        "presetPosition"?: 'left' | 'right' | 'top' | 'bottom';
        "readonly"?: boolean;
        "resetButton"?: boolean;
        /**
          * The start value of date range
         */
        "start"?: string;
        "strict"?: boolean;
        "tooltip"?: boolean;
        /**
          * The type of picker
         */
        "type"?: PickerType;
        /**
          * The value of date
         */
        "value"?: string;
    }
    interface TemporalPopup {
        "autoApply"?: boolean;
        "customLayout"?: boolean;
        /**
          * The end value of date range
         */
        "end"?: string;
        "extraSelect"?: boolean;
        "firstDay"?: number;
        "locale"?: string;
        "localeApply"?: string;
        "localeCancel"?: string;
        "localeClear"?: string;
        /**
          * The max value
         */
        "max"?: string;
        /**
          * The min value
         */
        "min"?: string;
        /**
          * The close popup event
         */
        "onT-close-popup"?: (event: TemporalPopupCustomEvent<void>) => void;
        /**
          * The range change event
         */
        "onT-range-change"?: (event: TemporalPopupCustomEvent<RangeInstant1>) => void;
        /**
          * The value change event
         */
        "onT-value-change"?: (event: TemporalPopupCustomEvent<PlainInstant1>) => void;
        "picker"?: HTMLElement;
        /**
          * The type of picker
         */
        "plain"?: PlainType;
        "presetPosition"?: 'left' | 'right' | 'top' | 'bottom';
        "resetButton"?: boolean;
        /**
          * The start value of date range
         */
        "start"?: string;
        "strict"?: boolean;
        "tooltip"?: boolean;
        /**
          * The type of picker
         */
        "type"?: PickerType;
        /**
          * The start value of date range
         */
        "value"?: string;
    }
    interface TemporalPreset {
        /**
          * The end value of date range
         */
        "end"?: string;
        /**
          * The label
         */
        "label"?: string;
        /**
          * The start value of date range
         */
        "start"?: string;
        /**
          * The type of preset
         */
        "type"?: 'range';
    }
    interface IntrinsicElements {
        "temporal-input": TemporalInput;
        "temporal-picker": TemporalPicker;
        "temporal-popup": TemporalPopup;
        "temporal-preset": TemporalPreset;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "temporal-input": LocalJSX.TemporalInput & JSXBase.HTMLAttributes<HTMLTemporalInputElement>;
            "temporal-picker": LocalJSX.TemporalPicker & JSXBase.HTMLAttributes<HTMLTemporalPickerElement>;
            "temporal-popup": LocalJSX.TemporalPopup & JSXBase.HTMLAttributes<HTMLTemporalPopupElement>;
            "temporal-preset": LocalJSX.TemporalPreset & JSXBase.HTMLAttributes<HTMLTemporalPresetElement>;
        }
    }
}

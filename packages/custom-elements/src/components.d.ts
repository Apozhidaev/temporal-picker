/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PlainType } from "@temporal-picker/core";
import { TemporalInputValue } from "./components/temporal-input/temporal-input";
import { PickerType, PlainInstant, RangeInstant } from "./components/temporal-picker/temporal-picker";
import { PickerType as PickerType1, PlainInstant as PlainInstant1, RangeInstant as RangeInstant1 } from "./components/temporal-picker/temporal-picker";
export { PlainType } from "@temporal-picker/core";
export { TemporalInputValue } from "./components/temporal-input/temporal-input";
export { PickerType, PlainInstant, RangeInstant } from "./components/temporal-picker/temporal-picker";
export { PickerType as PickerType1, PlainInstant as PlainInstant1, RangeInstant as RangeInstant1 } from "./components/temporal-picker/temporal-picker";
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
        "disabled": boolean;
        /**
          * The end value of date range
         */
        "end": string;
        /**
          * The max value
         */
        "max": string;
        /**
          * The min value
         */
        "min": string;
        "monthSelect": boolean;
        /**
          * The native value
         */
        "native": boolean;
        "placement": 'bottom-start' | 'bottom-end';
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
        /**
          * The type of picker
         */
        "type": PickerType;
        /**
          * The value of date
         */
        "value": string;
        "yearSelect": boolean;
    }
    interface TemporalPopup {
        "autoApply": boolean;
        /**
          * The end value of date range
         */
        "end": string;
        "gotoDate": () => Promise<void>;
        "gotoEnd": () => Promise<void>;
        "gotoStart": () => Promise<void>;
        /**
          * The max value
         */
        "max": string;
        /**
          * The min value
         */
        "min": string;
        "monthSelect": boolean;
        "parent": HTMLElement;
        /**
          * The type of picker
         */
        "plain": PlainType;
        "presetPosition": 'left' | 'right' | 'top' | 'bottom';
        "resetButton": boolean;
        /**
          * The start value of date range
         */
        "start": string;
        /**
          * The type of picker
         */
        "type": PickerType1;
        /**
          * The start value of date range
         */
        "value": string;
        "yearSelect": boolean;
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
        "onClosePopup"?: (event: TemporalInputCustomEvent<void>) => void;
        /**
          * The close popup event
         */
        "onOpenPopup"?: (event: TemporalInputCustomEvent<void>) => void;
        /**
          * The value change event
         */
        "onValueChange"?: (event: TemporalInputCustomEvent<TemporalInputValue>) => void;
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
        "disabled"?: boolean;
        /**
          * The end value of date range
         */
        "end"?: string;
        /**
          * The max value
         */
        "max"?: string;
        /**
          * The min value
         */
        "min"?: string;
        "monthSelect"?: boolean;
        /**
          * The native value
         */
        "native"?: boolean;
        /**
          * The range change event
         */
        "onRangeChange"?: (event: TemporalPickerCustomEvent<RangeInstant>) => void;
        /**
          * The value change event
         */
        "onValueChange"?: (event: TemporalPickerCustomEvent<PlainInstant>) => void;
        "placement"?: 'bottom-start' | 'bottom-end';
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
        /**
          * The type of picker
         */
        "type"?: PickerType;
        /**
          * The value of date
         */
        "value"?: string;
        "yearSelect"?: boolean;
    }
    interface TemporalPopup {
        "autoApply"?: boolean;
        /**
          * The end value of date range
         */
        "end"?: string;
        /**
          * The max value
         */
        "max"?: string;
        /**
          * The min value
         */
        "min"?: string;
        "monthSelect"?: boolean;
        /**
          * The close popup event
         */
        "onClosePopup"?: (event: TemporalPopupCustomEvent<void>) => void;
        /**
          * The range change event
         */
        "onRangeChange"?: (event: TemporalPopupCustomEvent<RangeInstant1>) => void;
        /**
          * The value change event
         */
        "onValueChange"?: (event: TemporalPopupCustomEvent<PlainInstant1>) => void;
        "parent"?: HTMLElement;
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
        /**
          * The type of picker
         */
        "type"?: PickerType1;
        /**
          * The start value of date range
         */
        "value"?: string;
        "yearSelect"?: boolean;
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

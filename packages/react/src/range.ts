import {
  memo,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  createElement,
} from "react";
import useEvent from "react-use-event-hook";
import { TemporalPickerProps, HTMLTemporalPickerElement } from "./types";

export type Preset = {
  label: string;
  start?: string;
  end?: string;
};

export type RangePickerProps = Omit<TemporalPickerProps, "type" | "value"> & {
  presets?: Preset[];
  onRangeChange?: (start?: string, end?: string) => void;
};

export const RangePicker = memo(
  forwardRef(function TemporalPicker(
    props: RangePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const {
      presets,
      autoApply,
      resetButton,
      extraSelect,
      testId,
      onRangeChange,
      ...pickerProps
    } = props;

    const handleRangeChange = useEvent((event) => {
      const { start, end } = event.detail;
      onRangeChange?.(start, end);
    });

    useEffect(() => {
      const element = inputRef.current;
      if (!element) {
        return;
      }
      element.addEventListener("t-range-change", handleRangeChange);
      return () => {
        element.removeEventListener("t-range-change", handleRangeChange);
      };
    }, []);

    return createElement(
      "temporal-picker",
      {
        ...pickerProps,
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "extra-select": extraSelect,
        "data-testid": testId,
        type: "range",
        ref: inputRef,
      },
      ...(presets || []).map((preset) =>
        createElement("temporal-preset", { ...preset, key: preset.label })
      )
    );
  })
);

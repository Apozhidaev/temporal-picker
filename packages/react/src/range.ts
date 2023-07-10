import { memo, useRef, forwardRef, useEffect, useImperativeHandle, createElement } from "react";
import useEvent from "react-use-event-hook";
import { TemporalPickerProps, HTMLTemporalPickerElement } from "./types";

export type RangePreset = {
  label: string;
  start?: string;
  end?: string;
};

export type RangePickerProps = Omit<TemporalPickerProps, "type" | "value"> & {
  presets?: RangePreset[];
  onRangeChange?: (start?: string, end?: string) => void;
};

export const RangePicker = memo(
  forwardRef(function TemporalPicker(
    props: RangePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const pickerRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => pickerRef.current!);

    const {
      presets,
      autoApply,
      resetButton,
      extraSelect,
      presetPosition,
      firstDay,
      customLayout,
      localeApply,
      localeCancel,
      localeClear,
      rowHeader,
      testId,
      className,
      onRangeChange,
      onViewChange,
      ...pickerProps
    } = props;

    const handleRangeChange = useEvent((event) => {
      const { start, end } = event.detail;
      onRangeChange?.(start, end);
    });

    useEffect(() => {
      const element = pickerRef.current;
      if (!element) {
        return;
      }
      element.addEventListener("t-range-change", handleRangeChange);
      return () => {
        element.removeEventListener("t-range-change", handleRangeChange);
      };
    }, []);

    const handleViewChange = useEvent((event) => {
      onViewChange?.(event);
    });

    useEffect(() => {
      const element = pickerRef.current;
      if (!element) {
        return;
      }
      element.addEventListener("t-layout", handleViewChange);
      if (customLayout) {
        element.addEventListener("t-render", handleViewChange);
        element.addEventListener("t-mount", handleViewChange);
        element.addEventListener("t-update", handleViewChange);
      }
      return () => {
        element.removeEventListener("t-layout", handleViewChange);
        if (customLayout) {
          element.removeEventListener("t-render", handleViewChange);
          element.removeEventListener("t-mount", handleViewChange);
          element.removeEventListener("t-update", handleViewChange);
        }
      };
    }, [customLayout]);

    return createElement(
      "temporal-picker",
      {
        ...pickerProps,
        class: className,
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "extra-select": extraSelect,
        "preset-position": presetPosition,
        "first-day": firstDay,
        "custom-layout": customLayout,
        "locale-apply": localeApply,
        "locale-cancel": localeCancel,
        "locale-clear": localeClear,
        "row-header": rowHeader,
        "data-testid": testId,
        type: "range",
        ref: pickerRef,
      },
      ...(presets || []).map((preset) =>
        createElement("temporal-preset", { ...preset, key: preset.label })
      )
    );
  })
);

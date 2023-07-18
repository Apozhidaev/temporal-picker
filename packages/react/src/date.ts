import { memo, useRef, forwardRef, useEffect, useImperativeHandle, createElement } from "react";
import { toKebabCase } from "@temporal-picker/custom";
import { TemporalPickerProps, HTMLTemporalPickerElement } from "./types";
import { useEvent } from "./hooks";

export type DatePickerProps = Omit<
  TemporalPickerProps,
  "type" | "start" | "end" | "presetPosition" | "strict"
> & {
  onValueChange?: (value: string) => void;
};

export const DatePicker = memo(
  forwardRef(function TemporalPicker(
    props: DatePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const pickerRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => pickerRef.current!);

    const {
      disabled,
      customLayout,
      testId,
      className,
      onValueChange,
      onViewChange,
      ...pickerProps
    } = props;

    const handleValueChange = useEvent((event) => {
      onValueChange?.(event.detail.value);
    });

    useEffect(() => {
      const element = pickerRef.current;
      if (!element) {
        return;
      }
      element.addEventListener("t-value-change", handleValueChange);
      return () => {
        element.removeEventListener("t-value-change", handleValueChange);
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

    return createElement("temporal-picker", {
      ...toKebabCase(pickerProps),
      ...(disabled ? { disabled: "" } : {}),
      class: className,
      "custom-layout": customLayout,
      "data-testid": testId,
      ref: pickerRef,
    });
  })
);

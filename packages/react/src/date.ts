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

export type DatePickerProps = Omit<TemporalPickerProps, 'type' | 'start' | 'end'> & {
    onValueChange?: (value?: string) => void;
  };

export const DatePicker = memo(
  forwardRef(function TemporalPicker(
    props: DatePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const pickerRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => pickerRef.current!);

    const {
      autoApply,
      resetButton,
      extraSelect,
      presetPosition,
      testId,
      className,
      onValueChange,
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

    return createElement(
      "temporal-picker",
      {
        ...pickerProps,
        "class": className,
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "extra-select": extraSelect,
        "preset-position": presetPosition,
        "data-testid": testId,
        ref: pickerRef,
      });
  })
);

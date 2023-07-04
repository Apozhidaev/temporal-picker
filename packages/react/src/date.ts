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
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const {
      autoApply,
      resetButton,
      extraSelect,
      testId,
      onValueChange,
      ...pickerProps
    } = props;

    const handleValueChange = useEvent((event) => {
      onValueChange?.(event.detail.value);
    });

    useEffect(() => {
      const element = inputRef.current;
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
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "extra-select": extraSelect,
        "data-testid": testId,
        ref: inputRef,
      });
  })
);

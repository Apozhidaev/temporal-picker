import {
  memo,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  createElement,
} from "react";
import useEvent from "react-use-event-hook";
import { TemporalPickerProps } from "./types";

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
      monthSelect,
      resetButton,
      yearSelect,
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
      element.addEventListener("valueChange", handleValueChange);
      return () => {
        element.removeEventListener("valueChange", handleValueChange);
      };
    }, []);

    return createElement(
      "temporal-picker",
      {
        ...pickerProps,
        "auto-apply": autoApply,
        "reset-button": resetButton,
        "month-select": monthSelect,
        "year-select": yearSelect,
        "data-testid": testId,
        ref: inputRef,
      });
  })
);

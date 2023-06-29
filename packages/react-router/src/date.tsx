import { memo, useRef, forwardRef, useImperativeHandle } from "react";
import useEvent from "react-use-event-hook";
import { useSearchParams } from "react-router-dom";
import {
  DatePicker as TemporalPicker,
  DatePickerProps as TemporalPickerProps,
  HTMLTemporalPickerElement,
} from "@temporal-picker/react";
import { sameValues } from "./utils";

export type DatePickerProps = Omit<
  TemporalPickerProps,
  "value" | "onValueChange"
> & {
  param: string;
  defaultValue?: string;
};

export const DatePicker = memo(
  forwardRef(function DatePicker(
    props: DatePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);
    const [searchParams, setSearchParams] = useSearchParams();
    const { param, defaultValue, ...pickerProps } = props;

    const paramValue = searchParams.has(param)
      ? searchParams.get(param)
      : defaultValue;

    const handleValueChange = useEvent((value) => {
      searchParams.delete(param);

      if (!sameValues(value, defaultValue)) {
        searchParams.set(param, value);
      }

      setSearchParams(searchParams, { replace: true });
    });

    return (
      <TemporalPicker
        {...pickerProps}
        ref={inputRef}
        value={paramValue || undefined}
        onValueChange={handleValueChange}
        aria-selected={
          "aria-selected" in pickerProps
            ? pickerProps["aria-selected"]
            : searchParams.has(param)
        }
      />
    );
  })
);

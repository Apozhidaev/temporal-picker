import { memo, useRef, forwardRef, useImperativeHandle } from "react";
import { useSearchParams } from "react-router-dom";
import {
  t,
  useEvent,
  DatePicker as Picker,
  DatePickerProps as PickerProps,
  HTMLTemporalPickerElement,
} from "@temporal-picker/react";
import { sameValues } from "./utils";

export type DatePickerProps = Omit<PickerProps, "value" | "onValueChange"> & {
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

    const defaultPlainValue = t(props.plain).normalize(defaultValue);
    const paramValue = searchParams.has(param) ? searchParams.get(param) : defaultPlainValue;

    const handleValueChange = useEvent((value) => {
      searchParams.delete(param);

      if (!sameValues(value, defaultPlainValue)) {
        searchParams.set(param, value || "");
      }

      setSearchParams(searchParams, { replace: true });
    });

    return (
      <Picker
        {...pickerProps}
        ref={inputRef}
        value={paramValue || ""}
        onValueChange={handleValueChange}
        aria-selected={
          "aria-selected" in pickerProps ? pickerProps["aria-selected"] : searchParams.has(param)
        }
      />
    );
  })
);

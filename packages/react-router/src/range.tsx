import { memo, useRef, forwardRef, useImperativeHandle } from "react";
import { useSearchParams } from "react-router-dom";
import {
  t,
  useEvent,
  RangePicker as TemporalPicker,
  RangePickerProps as TemporalPickerProps,
  HTMLTemporalPickerElement,
} from "@temporal-picker/react";
import { sameValues } from "./utils";

export type RangePickerProps = Omit<TemporalPickerProps, "start" | "end" | "onRangeChange"> & {
  startParam: string;
  endParam: string;
  defaultStart?: string;
  defaultEnd?: string;
};

export const RangePicker = memo(
  forwardRef(function RangePicker(
    props: RangePickerProps,
    ref: React.ForwardedRef<HTMLTemporalPickerElement>
  ) {
    const inputRef = useRef<HTMLTemporalPickerElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);
    const [searchParams, setSearchParams] = useSearchParams();
    const { startParam, endParam, defaultStart, defaultEnd, ...pickerProps } = props;

    const defaultPlainStart = t(props.plain).normalize(defaultStart);
    const defaultPlainEnd = t(props.plain).normalize(defaultEnd);

    const startValue = searchParams.has(startParam)
      ? searchParams.get(startParam)
      : defaultPlainStart;
    const endValue = searchParams.has(endParam) ? searchParams.get(endParam) : defaultPlainEnd;

    const handleRangeChange = useEvent((start, end) => {
      searchParams.delete(startParam);
      searchParams.delete(endParam);

      if (!sameValues(start, defaultPlainStart)) {
        searchParams.set(startParam, start || "");
      }
      if (!sameValues(end, defaultPlainEnd)) {
        searchParams.set(endParam, end || "");
      }

      setSearchParams(searchParams, { replace: true });
    });

    return (
      <TemporalPicker
        {...pickerProps}
        ref={inputRef}
        start={startValue || ""}
        end={endValue || ""}
        onRangeChange={handleRangeChange}
        aria-selected={
          "aria-selected" in pickerProps
            ? pickerProps["aria-selected"]
            : searchParams.has(startParam) || searchParams.has(endParam)
        }
      />
    );
  })
);

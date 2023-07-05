import { memo, useRef, forwardRef, useImperativeHandle } from "react";
import useEvent from "react-use-event-hook";
import { useSearchParams } from "react-router-dom";
import {
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

    const startValue = searchParams.has(startParam) ? searchParams.get(startParam) : defaultStart;

    const endValue = searchParams.has(endParam) ? searchParams.get(endParam) : defaultEnd;

    const handleRangeChange = useEvent((start, end) => {
      searchParams.delete(startParam);
      searchParams.delete(endParam);

      if (!sameValues(start, defaultStart)) {
        searchParams.set(startParam, start || "");
      }
      if (!sameValues(end, defaultEnd)) {
        searchParams.set(endParam, end || "");
      }

      setSearchParams(searchParams, { replace: true });
    });

    return (
      <TemporalPicker
        {...pickerProps}
        ref={inputRef}
        start={startValue || undefined}
        end={endValue || undefined}
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

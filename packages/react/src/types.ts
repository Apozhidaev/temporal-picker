import { Components } from "temporal-picker/dist/types";
import { HTMLAttributes } from "react";

export type TemporalPickerElement = Partial<Components.TemporalPicker>;
export type HTMLTemporalPickerElement = TemporalPickerElement & HTMLElement;

export type TemporalPickerProps = TemporalPickerElement &
  HTMLAttributes<HTMLElement> & {
    testId?: string;
  };

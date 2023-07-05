import { Components } from "@temporal-picker/custom-elements/dist/types";
import { HTMLAttributes } from "react";

type ViewDetail = {
  type: string;
  key: string;
  props: any;
  el: HTMLElement;
};

export type TemporalPickerElement = Partial<Components.TemporalPicker>;
export type HTMLTemporalPickerElement = TemporalPickerElement & HTMLElement;

export type TemporalPickerProps = TemporalPickerElement &
  HTMLAttributes<HTMLElement> & {
    testId?: string;
    onViewChange?: (event: CustomEvent<ViewDetail>) => void;
  };

import { DateTime } from 'luxon';
import {
  Component,
  Host,
  h,
  Element,
  Event,
  EventEmitter,
  Prop,
  Watch,
  Method,
} from '@stencil/core';
import {
  ExtraOptions,
  LockOptions,
  PresetOptions,
  RangePicker,
  DatePicker,
} from '../../utils';
import { PickerType, PlainInstant, RangeInstant } from '../temporal-picker/temporal-picker';
import { PlainType } from '../../utils/utils';

@Component({
  tag: 'temporal-popup',
  styleUrl: 'temporal-popup.css',
  shadow: true,
})
export class TemporalPopup {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLElement;

  /**
   * The type of picker
   */
  @Prop() type: PickerType = 'plain';
  
   /**
   * The type of picker
   */
   @Prop() plain: PlainType = 'date';

  /**
   * The start value of date range
   */
  @Prop() value: string;

  /**
   * The start value of date range
   */
  @Prop() start: string;

  /**
   * The end value of date range
   */
  @Prop() end: string;

  /**
   * The min value
   */
  @Prop() min: string;

  /**
   * The max value
   */
  @Prop() max: string;

  @Prop() autoApply: boolean;
  @Prop() resetButton: boolean;
  @Prop() monthSelect: boolean;
  @Prop() yearSelect: boolean;
  @Prop() presetPosition: 'left' | 'right' | 'top' | 'bottom';

  @Watch('value')
  watchValueStateHandler(newValue: string) {
    this.datePicker?.setDate(newValue);
  }

  @Method()
  async gotoDate() {
    if (this.value) {
      this.datePicker?.gotoDate(this.value);
    } else {
      this.datePicker?.gotoDate(DateTime.now().toISODate());
    }
  }

  @Watch('start')
  watchStartStateHandler(newValue: string) {
    this.rangePicker?.setStartDate(newValue);
  }

  @Watch('end')
  watchEndStateHandler(newValue: string) {
    this.rangePicker?.setEndDate(newValue);
  }

  @Method()
  async gotoStart() {
    this.rangePicker?.gotoStart();
  }

  @Method()
  async gotoEnd() {
    this.rangePicker?.gotoEnd();
  }

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false }) valueChange: EventEmitter<PlainInstant>;

  /**
   * The range change event
   */
  @Event({ bubbles: false, composed: false }) rangeChange: EventEmitter<RangeInstant>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false }) closePopup: EventEmitter<void>;

  private datePicker: DatePicker;
  private rangePicker: RangePicker;

  componentDidLoad() {
    let extraOptions: ExtraOptions;
    if (this.resetButton || this.monthSelect || this.yearSelect) {
      extraOptions = {
        resetButton: this.resetButton,
        dropdown: {
          years: this.yearSelect,
          months: this.monthSelect,
        },
      };
    }
    let lockOptions: LockOptions;
    if (this.min || this.max) {
      lockOptions = {
        minDate: this.min,
        maxDate: this.max,
      };
    }

    switch (this.type) {
      case 'range': {
        let presetOptions: PresetOptions;
        const presets = Array.from(
          (this.parent || this.el).querySelectorAll<HTMLTemporalPresetElement>('temporal-preset'),
        );
        if (presets.length > 0) {
          presetOptions = {
            presets: presets.map(x => ({
              start: x.start,
              end: x.end,
              label: x.label,
            })),
            position: this.presetPosition || 'bottom',
          };
        }

        this.rangePicker = new RangePicker({
          plain: this.plain,
          popup: this.el,
          autoApply: this.autoApply,
          extraOptions,
          lockOptions,
          presetOptions,
        });
        this.rangePicker.on('select', e => {
          this.rangeChange.emit(e.detail);
        });
        this.rangePicker.on('clear', () => {
          this.rangeChange.emit({ start: '', end: '' });
        });
        this.rangePicker.on('close', () => {
          this.closePopup.emit();
        });
        this.rangePicker.setDateRange(this.start, this.end);
        break;
      }

      default: {
        this.datePicker = new DatePicker({
          plain: this.plain,
          popup: this.el,
          autoApply: this.autoApply,
          extraOptions,
          lockOptions,
        });
        this.datePicker.on('select', e => {
          this.valueChange.emit({ value: e.detail.date });
        });
        this.datePicker.on('clear', () => {
          this.valueChange.emit({ value: '' });
        });
        this.datePicker.on('close', () => {
          this.closePopup.emit();
        });
        this.datePicker.setDate(this.value);
        break;
      }
    }
  }

  render() {
    return <Host></Host>;
  }
}

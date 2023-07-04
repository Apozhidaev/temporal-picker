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
import { PlainType, DatePopup, RangePopup } from '@temporal-picker/core';
import { PickerType, PlainInstant, RangeInstant } from '../temporal-picker/temporal-picker';

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
  @Prop() extraSelect: boolean;
  @Prop() presetPosition: 'left' | 'right' | 'top' | 'bottom';

  @Watch('value')
  watchValueStateHandler(newValue: string) {
    this.datePicker?.select([newValue]);
  }

  @Method()
  async gotoDate() {
    this.datePicker?.select([this.value]);
  }

  @Watch('start')
  watchStartStateHandler(newValue: string) {
    this.rangePicker?.select([newValue, this.end]);
  }

  @Watch('end')
  watchEndStateHandler(newValue: string) {
    this.rangePicker?.select([this.start, newValue], 1);
  }

  @Method()
  async gotoStart() {
    this.rangePicker?.select([this.start, this.end]);
  }

  @Method()
  async gotoEnd() {
    this.rangePicker?.select([this.start, this.end], 1);
  }

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-value-change' }) valueChange: EventEmitter<PlainInstant>;

  /**
   * The range change event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-range-change' }) rangeChange: EventEmitter<RangeInstant>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-close-popup' }) closePopup: EventEmitter<void>;

  private datePicker: DatePopup;
  private rangePicker: RangePopup;

  componentDidLoad() {
    switch (this.type) {
      case 'range': {
        const presets = Array.from(
          (this.parent || this.el).querySelectorAll<HTMLTemporalPresetElement>('temporal-preset'),
        );
        const element = this.el.shadowRoot.getElementById('container');
        this.rangePicker = new RangePopup({
          element,
          plain: this.plain,
          autoApply: this.autoApply,
          resetButton: this.resetButton,
          extraSelect: this.extraSelect,
          min: this.min,
          max: this.max,
          presets: presets.map(x => ({
            start: x.start,
            end: x.end,
            label: x.label,
          })),
          presetPosition: this.presetPosition,
        });
        element.addEventListener('t-select', (e: CustomEvent) => {
          this.rangeChange.emit({ start: e.detail.values[0], end: e.detail.values[1] });
          this.closePopup.emit();
        });
        element.addEventListener('t-reset', () => {
          this.rangeChange.emit({ start: undefined, end: undefined });
          this.closePopup.emit();
        });
        element.addEventListener('t-close', () => {
          this.closePopup.emit();
        });
        this.rangePicker.select([this.start, this.end]);
        break;
      }

      default: {
        const element = this.el.shadowRoot.getElementById('container');
        this.datePicker = new DatePopup({
          element,
          plain: this.plain,
          autoApply: this.autoApply,
          resetButton: this.resetButton,
          extraSelect: this.extraSelect,
          min: this.min,
          max: this.max,
        });
        element.addEventListener('t-select', (e: CustomEvent) => {
          this.valueChange.emit({ value: e.detail.values[0] });
          this.closePopup.emit();
        });
        element.addEventListener('t-reset', () => {
          this.valueChange.emit({ value: undefined });
          this.closePopup.emit();
        });
        element.addEventListener('t-close', () => {
          this.closePopup.emit();
        });
        this.datePicker.select([this.value]);
        break;
      }
    }
  }

  render() {
    return (
      <Host>
        <div id="container"></div>
      </Host>
    );
  }
}

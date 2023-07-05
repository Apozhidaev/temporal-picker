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
import { PickerType, PlainType, DatePopup, RangePopup } from '@temporal-picker/core';
import { PlainInstant, RangeInstant } from '../temporal-picker/temporal-picker';

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
  @Prop() tooltip: boolean;

  @Watch('type')
  @Watch('plain')
  @Watch('min')
  @Watch('max')
  @Watch('autoApply')
  @Watch('resetButton')
  @Watch('extraSelect')
  @Watch('presetPosition')
  @Watch('tooltip')
  watchOptions(newValue: string, _: string, name: string) {
    if (this.type === 'range') {
      this.rangePopup?.setOptions({ [name]: newValue });
    } else {
      this.datePopup?.setOptions({ [name]: newValue });
    }
  }

  @Watch('value')
  watchValue(newValue: string) {
    this.datePopup?.select([newValue]);
  }

  @Watch('start')
  watchStart(newValue: string) {
    this.rangePopup?.select([newValue, this.end]);
  }

  @Watch('end')
  watchEnd(newValue: string) {
    this.rangePopup?.select([this.start, newValue], 1);
  }

  @Method()
  async scrollToValue() {
    this.datePopup?.select([this.value]);
  }

  @Method()
  async scrollToStart() {
    this.rangePopup?.select([this.start, this.end]);
  }

  @Method()
  async scrollToEnd() {
    this.rangePopup?.select([this.start, this.end], 1);
  }

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-value-change' })
  valueChange: EventEmitter<PlainInstant>;

  /**
   * The range change event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-range-change' })
  rangeChange: EventEmitter<RangeInstant>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-close-popup' })
  closePopup: EventEmitter<void>;

  private datePopup: DatePopup;
  private rangePopup: RangePopup;

  componentDidLoad() {
    switch (this.type) {
      case 'range': {
        const presets = Array.from(
          (this.parent || this.el).querySelectorAll<HTMLTemporalPresetElement>('temporal-preset'),
        );
        const element = this.el.shadowRoot.getElementById('container');
        this.rangePopup = new RangePopup(element, {
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
          tooltip: this.tooltip,
          values: [this.start, this.end],
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
        break;
      }

      default: {
        const element = this.el.shadowRoot.getElementById('container');
        this.datePopup = new DatePopup(element, {
          plain: this.plain,
          autoApply: this.autoApply,
          resetButton: this.resetButton,
          extraSelect: this.extraSelect,
          min: this.min,
          max: this.max,
          values: [this.value],
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

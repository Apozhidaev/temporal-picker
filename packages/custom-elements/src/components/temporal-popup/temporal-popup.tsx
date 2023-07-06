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
  @Prop() picker: HTMLElement;

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
  @Prop() customLayout: boolean;
  @Prop() locale: string;
  @Prop() firstDay: number;
  @Prop() strict: boolean;

  @Watch('type')
  @Watch('plain')
  @Watch('min')
  @Watch('max')
  @Watch('autoApply')
  @Watch('resetButton')
  @Watch('extraSelect')
  @Watch('presetPosition')
  @Watch('tooltip')
  @Watch('customLayout')
  @Watch('locale')
  @Watch('firstDay')
  @Watch('strict')
  watchOptions(newValue: string, _: string, name: string) {
    if (this.type === 'range') {
      this.rangePopup?.setOptions({ [name]: newValue });
    } else {
      this.datePopup?.setOptions({ [name]: newValue });
    }
  }

  @Watch('value')
  watchValue(newValue: string) {
    if (!this.picker) {
      this.datePopup?.select([newValue]);
    }
  }

  @Watch('start')
  watchStart(newValue: string) {
    if (!this.picker) {
      this.rangePopup?.select([newValue, this.end]);
    }
  }

  @Watch('end')
  watchEnd(newValue: string) {
    if (!this.picker) {
      this.rangePopup?.select([this.start, newValue], 1);
    }
  }

  @Method()
  async scrollToValue() {
    this.datePopup?.select([this.value]);
  }

  @Method()
  async scrollToStart() {
    this.focusIndex = 0;
    this.rangePopup?.select([this.start, this.end]);
  }

  @Method()
  async scrollToEnd() {
    this.focusIndex = 1;
    this.rangePopup?.select([this.start, this.end], 1);
  }

  @Method()
  async select(values: string[], scrollToIndex = 0, shift = scrollToIndex) {
    this.rangePopup?.select(values, scrollToIndex, shift);
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
  private focusIndex = 0;

  componentDidLoad() {
    const element = this.el.shadowRoot.getElementById('container');
    element.addEventListener('t-close', () => {
      this.closePopup.emit();
    });
    const host = this.picker || this.el;
    switch (this.type) {
      case 'range': {
        const presets = Array.from(
          host.querySelectorAll<HTMLTemporalPresetElement>('temporal-preset'),
        );
        this.rangePopup = new RangePopup(
          {
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
            customLayout: this.customLayout,
            locale: this.locale,
            firstDay: this.firstDay,
            strict: this.strict,
            values: [this.start, this.end],
          },
          element,
          host,
        );
        element.addEventListener('t-select', (e: CustomEvent) => {
          if (e.detail.values.length < 2 && this.focusIndex === 1) {
            this.rangeChange.emit({
              start: undefined,
              end: e.detail.values[0],
            });
          } else {
            this.rangeChange.emit({ start: e.detail.values[0], end: e.detail.values[1] });
          }
          this.closePopup.emit();
        });
        element.addEventListener('t-reset', () => {
          this.rangeChange.emit({ start: undefined, end: undefined });
          this.closePopup.emit();
        });
        break;
      }

      default: {
        this.datePopup = new DatePopup(
          {
            plain: this.plain,
            autoApply: this.autoApply,
            resetButton: this.resetButton,
            extraSelect: this.extraSelect,
            min: this.min,
            max: this.max,
            customLayout: this.customLayout,
            locale: this.locale,
            firstDay: this.firstDay,
            values: [this.value],
          },
          element,
          host,
        );
        element.addEventListener('t-select', (e: CustomEvent) => {
          this.valueChange.emit({ value: e.detail.values[0] });
          this.closePopup.emit();
        });
        element.addEventListener('t-reset', () => {
          this.valueChange.emit({ value: undefined });
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

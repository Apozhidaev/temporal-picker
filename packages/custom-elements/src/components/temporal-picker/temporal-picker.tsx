import { createPopper, Instance } from '@popperjs/core';
import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
  Host,
  State,
  Watch,
} from '@stencil/core';
import { PickerType, PlainType } from '@temporal-picker/core';

export type PlainInstant = { value: string };
export type RangeInstant = { start: string; end: string };

@Component({
  tag: 'temporal-picker',
  styleUrl: 'temporal-picker.css',
  shadow: true,
})
export class TemporalPicker {
  @Element() el: HTMLElement;
  /**
   * The type of picker
   */
  @Prop() type: PickerType = 'plain';

  /**
   * The type of picker
   */
  @Prop() plain: PlainType = 'date';

  /**
   * The min value
   */
  @Prop() min: string;

  /**
   * The max value
   */
  @Prop() max: string;

  /**
   * The value of date
   */
  @Prop({ mutable: true }) value: string;

  /**
   * The start value of date range
   */
  @Prop({ mutable: true }) start: string;

  /**
   * The end value of date range
   */
  @Prop({ mutable: true }) end: string;

  /**
   * The native value
   */
  @Prop() native: boolean;

  @Prop() placement: 'bottom-start' | 'bottom-end' = 'bottom-start';
  @Prop() autoApply: boolean;
  @Prop() resetButton: boolean;
  @Prop() readonly: boolean;
  @Prop() disabled: boolean;
  @Prop() extraSelect: boolean;
  @Prop() presetPosition: 'left' | 'right' | 'top' | 'bottom';
  @Prop() tooltip: boolean;
  @Prop() customLayout: boolean;
  @Prop() locale: string;
  @Prop() firstDay: number;
  @Prop() strict: boolean;

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

  valueChangeHandler() {
    this.valueChange.emit({ value: this.value });
  }

  rangeChangeHandler() {
    this.rangeChange.emit({ start: this.start, end: this.end });
  }

  @State() isOpen: boolean = false;

  @Watch('isOpen')
  watchOpenState(newValue: boolean) {
    if (newValue) {
      document.addEventListener('click', this.documentClickHandler, true);
      document.body.appendChild(this.popup);
      this.popper.forceUpdate();
    } else {
      document.removeEventListener('click', this.documentClickHandler, true);
      document.body.removeChild(this.popup);
    }
  }

  private popper: Instance;

  private closePopupHandler = () => {
    this.isOpen = false;
  };

  private documentClickHandler = (e: any) => {
    if (!this.el.contains(e.target) && !this.popup.contains(e.target)) {
      this.closePopupHandler();
    }
  };

  private popup: HTMLTemporalPopupElement;

  componentDidLoad() {
    this.popup = this.el.shadowRoot.getElementById('temporal-popup') as HTMLTemporalPopupElement;
    document.body.appendChild(this.popup);
    this.popper = createPopper(this.el, this.popup, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 2],
          },
        },
      ],
    });
    document.body.removeChild(this.popup);
  }

  render() {
    return (
      <Host>
        {this.type === 'range' ? (
          <div
            part="range-inputs-wrapper"
            class="range-inputs-wrapper"
            aria-disabled={this.disabled}
            aria-readonly={this.readonly}
          >
            <temporal-input
              disabled={this.disabled}
              readonly={this.readonly}
              class="start-input"
              exportparts="input: start-input"
              plain={this.plain}
              min={this.min}
              max={this.end}
              value={this.start}
              native={this.native}
              onT-value-change={e => {
                this.start = e.detail.value;
                this.popup.start = e.detail.value;
                this.rangeChangeHandler();
              }}
              onT-open-popup={() => {
                this.isOpen = true;
                this.popup.scrollToStart();
              }}
              onT-close-popup={() => {
                this.isOpen = false;
              }}
            />
            <div class="delimiter-wrapper">
              <div part="delimiter" class="delimiter">
                &mdash;
              </div>
            </div>
            <temporal-input
              disabled={this.disabled}
              readonly={this.readonly}
              exportparts="input: end-input"
              class="end-input"
              plain={this.plain}
              min={this.start}
              max={this.max}
              value={this.end}
              native={this.native}
              onT-value-change={e => {
                this.end = e.detail.value;
                this.popup.end = e.detail.value;
                this.rangeChangeHandler();
              }}
              onT-open-popup={() => {
                this.isOpen = true;
                this.popup.scrollToEnd();
              }}
              onT-close-popup={() => {
                this.isOpen = false;
              }}
            />
          </div>
        ) : (
          <temporal-input
            disabled={this.disabled}
            readonly={this.readonly}
            class="input"
            exportparts="input"
            plain={this.plain}
            min={this.min}
            max={this.max}
            value={this.value}
            native={this.native}
            onT-value-change={e => {
              this.value = e.detail.value;
              this.popup.value = e.detail.value;
              this.valueChangeHandler();
            }}
            onT-open-popup={() => {
              this.isOpen = true;
              this.popup.scrollToValue();
            }}
            onT-close-popup={() => {
              this.isOpen = false;
            }}
          />
        )}
        <template>
          <temporal-popup
            id="temporal-popup"
            type={this.type}
            plain={this.plain}
            picker={this.el}
            min={this.min}
            max={this.max}
            value={this.value}
            start={this.start}
            end={this.end}
            autoApply={this.autoApply}
            resetButton={this.resetButton}
            extraSelect={this.extraSelect}
            tooltip={this.tooltip}
            customLayout={this.customLayout}
            locale={this.locale}
            firstDay={this.firstDay}
            strict={this.strict}
            onT-value-change={(e: any) => {
              this.value = e.detail.value;
              this.valueChangeHandler();
            }}
            onT-range-change={(e: any) => {
              this.start = e.detail.start;
              this.end = e.detail.end;
              this.rangeChangeHandler();
            }}
            onT-close-popup={this.closePopupHandler}
          />
        </template>
      </Host>
    );
  }
}

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
import { PlainType } from '@temporal-picker/core';

export type PlainInstant = { value: string };
export type RangeInstant = { start: string; end: string };
export type PickerType = 'plain' | 'range';

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
  @Prop() monthSelect: boolean;
  @Prop() yearSelect: boolean;
  @Prop() presetPosition: 'left' | 'right' | 'top' | 'bottom';

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false }) valueChange: EventEmitter<PlainInstant>;

  /**
   * The range change event
   */
  @Event({ bubbles: false, composed: false }) rangeChange: EventEmitter<RangeInstant>;

  valueChangeHandler() {
    this.valueChange.emit({ value: this.value });
  }

  rangeChangeHandler() {
    this.rangeChange.emit({ start: this.start, end: this.end });
  }

  @State() isOpen: boolean = false;

  @Watch('isOpen')
  watchOpenStateHandler(newValue: boolean) {
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
              onValueChange={e => {
                this.start = e.detail.value;
                this.popup.start = e.detail.value;
                this.rangeChangeHandler();
              }}
              onOpenPopup={() => {
                this.isOpen = true;
                this.popup.gotoStart();
              }}
              onClosePopup={() => {
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
              onValueChange={e => {
                this.end = e.detail.value;
                this.popup.end = e.detail.value;
                this.rangeChangeHandler();
              }}
              onOpenPopup={() => {
                this.isOpen = true;
                this.popup.gotoEnd();
              }}
              onClosePopup={() => {
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
            onValueChange={e => {
              this.value = e.detail.value;
              this.popup.value = e.detail.value;
              this.valueChangeHandler();
            }}
            onOpenPopup={() => {
              this.isOpen = true;
              this.popup.gotoDate();
            }}
            onClosePopup={() => {
              this.isOpen = false;
            }}
          />
        )}
        <template>
          <temporal-popup
            id="temporal-popup"
            type={this.type}
            plain={this.plain}
            parent={this.el}
            min={this.min}
            max={this.max}
            value={this.value}
            start={this.start}
            end={this.end}
            autoApply={this.autoApply}
            resetButton={this.resetButton}
            monthSelect={this.monthSelect}
            yearSelect={this.yearSelect}
            onValueChange={(e: any) => {
              this.value = e.detail.value;
              this.valueChangeHandler();
            }}
            onRangeChange={(e: any) => {
              this.start = e.detail.start;
              this.end = e.detail.end;
              this.rangeChangeHandler();
            }}
            onClosePopup={this.closePopupHandler}
          />
        </template>
      </Host>
    );
  }
}

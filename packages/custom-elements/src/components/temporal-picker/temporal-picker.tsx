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
import { PickerType, PlainType, Presentation } from '@temporal-picker/core';

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
  @Prop() picker: Presentation = 'input';
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

  @Prop() placement: 'bottom' | 'bottom-start' | 'bottom-end' = 'bottom';
  @Prop() autoApply: boolean;
  @Prop() resetButton: boolean;
  @Prop() readonly: boolean;
  @Prop() disabled: boolean;
  @Prop() extraSelect: boolean;
  @Prop() presetPosition: 'left' | 'right' | 'top' | 'bottom';
  @Prop() tooltip: boolean;
  @Prop() customLayout: boolean;
  @Prop() firstDay: number;
  @Prop() strict: boolean;
  @Prop() locale: string;
  @Prop() localeCancel: string;
  @Prop() localeApply: string;
  @Prop() localeClear: string;

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
    this.popup.removeAttribute('id');
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

    this.el.focus = (...args: any[]) => {
      if (this.type === 'range') {
        this.el.shadowRoot.getElementById('start-input').focus(...args);
      } else {
        this.el.shadowRoot.getElementById('input').focus(...args);
      }
    };
  }

  private getPresentation() {
    if (this.picker === 'icon') {
      return (
        <button
          class="icon-picker"
          disabled={this.disabled}
          onClick={() => {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
              if (this.type === 'range') {
                if (!this.start && this.end) {
                  this.popup.scrollToEnd();
                } else {
                  this.popup.scrollToStart();
                }
              } else {
                this.popup.scrollToValue();
              }
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        </button>
      );
    }
    return this.type === 'range' ? (
      <div
        part="range-inputs-wrapper"
        class="range-inputs-wrapper"
        aria-disabled={this.disabled}
        aria-readonly={this.readonly}
      >
        <temporal-input
          id="start-input"
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
        <div class="delimiter-wrapper" part="delimiter-wrapper">
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
        id="input"
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
    );
  }

  render() {
    return (
      <Host>
        {this.getPresentation()}
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
            localeApply={this.localeApply}
            localeCancel={this.localeCancel}
            localeClear={this.localeClear}
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

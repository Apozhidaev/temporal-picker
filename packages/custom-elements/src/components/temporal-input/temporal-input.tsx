import { DateTime } from 'luxon';
import { Component, Prop, h, Event, EventEmitter, Element, Host } from '@stencil/core';
import { PlainType, InputPresentation, PickerType, t } from '@temporal-picker/core';
import { toInputType } from '../../utils';

export type TemporalInputValue = { value: string };
export type TemporalInputIndex = { index: number };

const maxYear = 9000;

@Component({
  tag: 'temporal-input',
  styleUrl: 'temporal-input.css',
  shadow: true,
})
export class TemporalInput {
  @Element() el: HTMLElement;
  /**
   * The type of picker
   */
  @Prop() presentation?: InputPresentation = 'input';
  /**
   * The type of picker
   */
  @Prop() type?: PickerType = 'plain';
  /**
   * The plain of type
   */
  @Prop() plain?: PlainType = 'date';

  /**
   * The min value
   */
  @Prop() min?: string;

  /**
   * The max value
   */
  @Prop() max?: string;

  /**
   * The value of date
   */
  @Prop() value?: string;

  /**
   * The start value of date range
   */
  @Prop() start?: string;

  /**
   * The end value of date range
   */
  @Prop() end?: string;

  /**
   * The native value
   */
  @Prop() native?: boolean;
  @Prop() locale?: string;
  @Prop() open?: boolean;

  @Prop({ reflect: true }) readonly: boolean;
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-value-change' })
  valueChange: EventEmitter<TemporalInputValue>;
  /**
   * The start value change event (range type)
   */
  @Event({ bubbles: false, composed: false, eventName: 't-start-change' })
  startChange: EventEmitter<TemporalInputValue>;
  /**
   * The end value change event (range type)
   */
  @Event({ bubbles: false, composed: false, eventName: 't-end-change' })
  endChange: EventEmitter<TemporalInputValue>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-open-popup' })
  openPopup: EventEmitter<TemporalInputIndex>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false, eventName: 't-close-popup' })
  closePopup: EventEmitter<void>;

  private valueChangeHandler(event: TemporalInputValue) {
    const value = DateTime.fromISO(event.value);
    if (!value.isValid) {
      return;
    }
    this.valueChange.emit(event);
  }

  private startChangeHandler(event: TemporalInputValue) {
    const value = DateTime.fromISO(event.value);
    if (!value.isValid) {
      return;
    }
    const end = DateTime.fromISO(this.end);
    if (end.isValid) {
      if (value > end) {
        this.endChange.emit({ value: undefined });
        return;
      }
    }
    this.startChange.emit(event);
  }

  private blurHandler(
    id: string,
    valueChange: EventEmitter<TemporalInputValue>,
    maxValue = maxYear,
  ) {
    const inputValue = (this.el.shadowRoot.getElementById(id) as HTMLInputElement).value;
    const date = new Date(inputValue);
    if (date.getFullYear() > maxValue) {
      date.setFullYear(maxValue);
      valueChange.emit({ value: t(this.plain).toInstant(DateTime.fromJSDate(date)) });
      return;
    }
    const value = DateTime.fromISO(inputValue);
    if (!value.isValid) {
      if (inputValue) {
        valueChange.emit({ value: undefined });
      }
      return;
    }
    // const min = DateTime.fromISO(this.min);
    // if (min.isValid && value < min) {
    //   valueChange.emit({ value: t(this.plain).toInstant(min) });
    //   return;
    // }
    // const max = DateTime.fromISO(this.max);
    // if (max.isValid && value > max) {
    //   valueChange.emit({ value: t(this.plain).toInstant(max) });
    // }
  }

  private endChangeHandler(event: TemporalInputValue) {
    const value = DateTime.fromISO(event.value);
    if (!value.isValid) {
      return;
    }
    const start = DateTime.fromISO(this.start);
    if (start.isValid) {
      if (value < start) {
        this.startChange.emit({ value: undefined });
        return;
      }
    }
    this.endChange.emit(event);
  }

  private openPopupHandler(event: TemporalInputIndex) {
    if (!this.native) {
      this.openPopup.emit(event);
    }
  }

  private closePopupHandler() {
    if (!this.native) {
      this.closePopup.emit();
    }
  }

  private getTitle() {
    if (this.type === 'range') {
      if (this.start && this.end) {
        return `${t(this.plain).display(this.start, this.locale)} — ${t(this.plain).display(
          this.end,
          this.locale,
        )}`;
      }
      if (this.start) {
        return `≥ ${t(this.plain).display(this.start, this.locale)}`;
      }
      if (this.end) {
        return `≤ ${t(this.plain).display(this.end, this.locale)}`;
      }
    }
    if (this.value) {
      return t(this.plain).display(this.value, this.locale);
    }
    return undefined;
  }

  private handleKeyDown(e: KeyboardEvent, index: number) {
    if (e.code === 'Space') {
      if (!this.native) {
        e.preventDefault();
      }
      this.openPopupHandler({ index });
    }
    if (e.code === 'Enter') {
      if (!this.native) {
        e.preventDefault();
      }
      this.closePopupHandler();
    }
  }

  private handleInputClick(e: MouseEvent, index: number) {
    if (!this.native) {
      e.preventDefault();
    }
    this.openPopupHandler({ index });
  }

  componentDidLoad() {
    this.el.focus = (...args: any[]) => {
      if (this.presentation === 'button') {
        this.el.shadowRoot.getElementById('button').focus(...args);
      }
      switch (this.type) {
        case 'range':
          this.el.shadowRoot.getElementById('start-input').focus(...args);
          break;
        default:
          this.el.shadowRoot.getElementById('input').focus(...args);
          break;
      }
    };
    this.el.blur = () => {
      if (this.presentation === 'button') {
        this.el.shadowRoot.getElementById('button').blur();
      }
      switch (this.type) {
        case 'range':
          this.el.shadowRoot.getElementById('start-input').blur();
          break;
        default:
          this.el.shadowRoot.getElementById('input').blur();
          break;
      }
    };
  }

  private getPresentation() {
    if (this.presentation === 'button') {
      return (
        <button
          id="button"
          class="button"
          part="button"
          type="button"
          title={this.getTitle()}
          disabled={this.disabled}
          onClick={() => {
            if (this.open) {
              this.closePopupHandler();
            } else {
              this.openPopupHandler({ index: 0 });
            }
          }}
          onKeyDown={e => {
            this.handleKeyDown(e, 0);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="button-icon"
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
    switch (this.type) {
      case 'range':
        return (
          <div
            part="range-wrapper"
            class="range-wrapper"
            aria-disabled={this.disabled}
            aria-readonly={this.readonly}
            onMouseDown={(e: MouseEvent) => {
              if (!(e.target as HTMLElement).closest('.input')) {
                e.preventDefault();
              }
            }}
          >
            <input
              id="start-input"
              class={`input start-input ${this.native ? 'native' : ''}`}
              part="start-input"
              disabled={this.disabled}
              readonly={this.readonly}
              type={toInputType(this.plain)}
              min={this.min}
              max={this.end}
              value={t(this.plain).normalize(this.start)}
              onChange={(e: any) => {
                this.startChangeHandler({ value: e.target.value });
                this.closePopup.emit();
              }}
              onClick={e => {
                this.handleInputClick(e, 0);
              }}
              onKeyDown={e => {
                this.handleKeyDown(e, 0);
              }}
              onBlur={() => this.blurHandler('start-input', this.startChange, maxYear - 1)}
            />
            <div part="separator" class="separator">
              <svg
                class="separator-icon"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
              </svg>
            </div>
            <input
              id="end-input"
              class="input end-input"
              part="end-input"
              disabled={this.disabled}
              readonly={this.readonly}
              type={toInputType(this.plain)}
              min={this.start}
              max={this.max}
              value={t(this.plain).normalize(this.end)}
              onChange={(e: any) => {
                this.endChangeHandler({ value: e.target.value });
                this.closePopup.emit();
              }}
              onClick={e => {
                this.handleInputClick(e, 1);
              }}
              onKeyDown={e => {
                this.handleKeyDown(e, 1);
              }}
              onBlur={() => this.blurHandler('end-input', this.endChange)}
            />
          </div>
        );

      default:
        return (
          <input
            id="input"
            class="input"
            part="input"
            disabled={this.disabled}
            readonly={this.readonly}
            type={toInputType(this.plain)}
            min={this.min}
            max={this.max}
            value={t(this.plain).normalize(this.value)}
            onChange={(e: any) => {
              this.valueChangeHandler({ value: e.target.value });
              this.closePopup.emit();
            }}
            onClick={e => {
              this.handleInputClick(e, 0);
            }}
            onKeyDown={e => {
              this.handleKeyDown(e, 0);
            }}
            onBlur={() => this.blurHandler('input', this.valueChange)}
          />
        );
    }
  }

  render() {
    return <Host>{this.getPresentation()}</Host>;
  }
}

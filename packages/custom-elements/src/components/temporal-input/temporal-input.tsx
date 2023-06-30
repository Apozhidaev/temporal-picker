import { DateTime } from 'luxon';
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { PlainType } from '@temporal-picker/core';
import { toInputType } from '../../utils';

export type TemporalInputValue = { value: string };

@Component({
  tag: 'temporal-input',
  styleUrl: 'temporal-input.css',
  shadow: true,
})
export class TemporalInput {
  /**
   * The plain of type
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
  @Prop() value: string;

  /**
   * The native value
   */
  @Prop() native: boolean;

  @Prop({ reflect: true }) readonly: boolean;
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * The value change event
   */
  @Event({ bubbles: false, composed: false }) valueChange: EventEmitter<TemporalInputValue>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false }) openPopup: EventEmitter<void>;

  /**
   * The close popup event
   */
  @Event({ bubbles: false, composed: false }) closePopup: EventEmitter<void>;

  changeHandler(event: TemporalInputValue) {
    if (this.min) {
      if (DateTime.fromISO(event.value).toMillis() < DateTime.fromISO(this.min).toMillis()) {
        return;
      }
    }
    if (this.max) {
      if (DateTime.fromISO(event.value).toMillis() > DateTime.fromISO(this.max).toMillis()) {
        return;
      }
    }
    this.valueChange.emit(event);
  }

  private openPopupHandler() {
    if (!this.native) {
      this.openPopup.emit();
    }
  }

  private closePopupHandler() {
    if (!this.native) {
      this.closePopup.emit();
    }
  }

  render() {
    return (
      <input
        part="input"
        disabled={this.disabled}
        readonly={this.readonly}
        type={toInputType(this.plain)}
        min={this.min}
        max={this.max}
        value={this.value}
        onChange={(e: any) => {
          this.changeHandler({ value: e.target.value });
          this.closePopup.emit();
        }}
        onClick={e => {
          if (!this.native) {
            e.preventDefault();
          }
          this.openPopupHandler();
        }}
        onKeyDown={e => {
          if (e.code === 'Space') {
            if (!this.native) {
              e.preventDefault();
            }
            this.openPopupHandler();
          }
          if (e.code === 'Enter') {
            if (!this.native) {
              e.preventDefault();
            }
            this.closePopupHandler();
          }
        }}
      />
    );
  }
}

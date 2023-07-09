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
import { PickerType, PlainType, InputPresentation } from '@temporal-picker/core';

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
  @Prop() picker?: InputPresentation = 'input';
  /**
   * The type of picker
   */
  @Prop() type?: PickerType = 'plain';

  /**
   * The type of picker
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
  @Prop({ mutable: true }) value?: string;

  /**
   * The start value of date range
   */
  @Prop({ mutable: true }) start?: string;

  /**
   * The end value of date range
   */
  @Prop({ mutable: true }) end?: string;

  /**
   * The native value
   */
  @Prop() native?: boolean;

  @Prop() placement?: 'bottom' | 'bottom-start' | 'bottom-end' = 'bottom';
  @Prop() autoApply?: boolean;
  @Prop() resetButton?: boolean;
  @Prop() readonly?: boolean;
  @Prop() disabled?: boolean;
  @Prop() extraSelect?: boolean;
  @Prop() presetPosition?: 'left' | 'right' | 'top' | 'bottom';
  @Prop() tooltip?: boolean;
  @Prop() customLayout?: boolean;
  @Prop() firstDay?: number;
  @Prop() strict?: boolean;
  @Prop() reselect?: boolean;
  @Prop() locale?: string;
  @Prop() localeCancel?: string;
  @Prop() localeApply?: string;
  @Prop() localeClear?: string;

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
      this.el.shadowRoot.getElementById('temporal-input').focus(...args);
    };
  }

  render() {
    return (
      <Host>
        <temporal-input
          id="temporal-input"
          type={this.type}
          presentation={this.picker}
          disabled={this.disabled}
          readonly={this.readonly}
          class="temporal-input"
          exportparts="button,range-items,start-input,separator,end-input,input"
          plain={this.plain}
          min={this.min}
          max={this.max}
          value={this.value}
          start={this.start}
          end={this.end}
          native={this.native}
          locale={this.locale}
          open={this.isOpen}
          onT-value-change={e => {
            this.value = e.detail.value;
            this.popup.value = e.detail.value;
            this.valueChangeHandler();
          }}
          onT-start-change={e => {
            this.start = e.detail.value;
            this.popup.start = e.detail.value;
            this.rangeChangeHandler();
          }}
          onT-end-change={e => {
            this.end = e.detail.value;
            this.popup.end = e.detail.value;
            this.rangeChangeHandler();
          }}
          onT-open-popup={(e) => {
            this.isOpen = true;
            this.popup.scrollToIndex(e.detail.index);
          }}
          onT-close-popup={() => {
            this.isOpen = false;
          }}
        />
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
            reselect={this.reselect}
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

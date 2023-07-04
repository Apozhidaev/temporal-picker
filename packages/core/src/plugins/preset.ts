import { DateTime, DateTimeUnit } from 'luxon';
import { BasePlugin, EventDetail, IPlugin } from './base';
import type { RangePicker } from '../pickers/range';

export type PresetItem = {
  label: string;
  start?: string;
  end?: string;
};

export function sameDate(
  date1: string | undefined,
  date2: string | undefined,
  unit: DateTimeUnit,
) {
  if (!date1 && !date2) {
    return true;
  }
  if (date1 === date2) {
    return true;
  }
  if (!date1 || !date2) {
    return false;
  }
  return DateTime.fromISO(date1).hasSame(DateTime.fromISO(date2), unit);
}

export interface PresetOptions {
  presets: PresetItem[];
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export class PresetPlugin extends BasePlugin<RangePicker> implements IPlugin {
  public dependencies = [];

  public binds = {
    onView: this.onView.bind(this),
    onClick: this.onClick.bind(this),
  };

  public options: PresetOptions = {
    presets: [],
    position: 'bottom',
  };

  /**
   * Returns plugin name
   *
   * @returns String
   */
  public getName(): string {
    return 'PresetPlugin';
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    this.picker.on('view', this.binds.onView);
    this.picker.on('click', this.binds.onClick);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    this.picker.off('view', this.binds.onView);
    this.picker.off('click', this.binds.onClick);
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   *
   * @param event
   */
  private onView(event: CustomEvent) {
    const { view, target }: EventDetail = event.detail;

    if (target && view === 'Main') {
      const container = document.createElement('div');
      container.className = 'preset-plugin-container';

      const startDate = this.picker.datePicked[0]
        ? this.picker.datePicked[0].toISO()!
        : this.picker.getStartDate();
      const endDate = this.picker.datePicked[1]
        ? this.picker.datePicked[1].toISO()!
        : this.picker.getEndDate();

      this.options.presets.forEach(({ label, start, end }) => {
        if (!start && !end) {
          return;
        }
        const item = document.createElement('button');
        item.className = 'preset-button unit';

        const unit = this.picker.options.plain === 'month' ? 'month' : 'day';
        if (sameDate(startDate, start, unit) && sameDate(endDate, end, unit)) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
        item.innerHTML = label;
        if (start) {
          item.dataset.start = start;
        }
        if (end) {
          item.dataset.end = end;
        }

        container.appendChild(item);

        this.picker.trigger('view', {
          view: 'PresetPluginButton',
          target: item,
        });
      });
      target.appendChild(container);
      target.classList.add(`preset-${this.options.position}`);

      this.picker.trigger('view', {
        view: 'PresetPluginContainer',
        target: container,
      });
    }
  }

  /**
   * Handle click event
   *
   * @param event
   */
  private onClick(event: any) {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const element = target.closest('.unit') as HTMLElement;

      if (!(element instanceof HTMLElement)) return;

      if (this.isPresetButton(element)) {
        const startDate = element.dataset.start;
        const endDate = element.dataset.end;

        if (this.picker.options.autoApply) {
          if (startDate && endDate) {
            this.picker.setDateRange(startDate, endDate);
          } else {
            if (startDate) {
              this.picker.setDateRange(startDate, '');
            }
            if (endDate) {
              this.picker.setDateRange('', endDate);
            }
          }

          this.picker.trigger('select', {
            start: this.picker.getStartDate(),
            end: this.picker.getEndDate(),
          });

          this.picker.hide();
        } else {
          this.picker.datePicked = [startDate, endDate]
            .filter(Boolean)
            .map(x => DateTime.fromISO(x!));
          this.picker.gotoDate(this.picker.datePicked[0].toISO()!);
        }
      }
    }
  }

  /**
   * Determines if HTMLElement is preset buttons
   *
   * @param element
   * @returns Boolean
   */
  private isPresetButton(element: HTMLElement) {
    return element.classList.contains('preset-button');
  }
}
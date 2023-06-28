import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'temporal-preset',
  shadow: true,
})
export class TemporalPreset {
  /**
   * The type of preset
   */
  @Prop() type: 'range' = 'range';
  /**
   * The label
   */
  @Prop() label: string;
  /**
   * The start value of date range
   */
  @Prop() start: string;

  /**
   * The end value of date range
   */
  @Prop() end: string;

  render() {
    return <Host></Host>;
  }
}

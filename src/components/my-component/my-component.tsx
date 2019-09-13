import { Component, Prop, h } from '@stencil/core';
import { formatDate } from '../../utils/utils';
import { format } from 'moment';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * year
   */
  @Prop() year: string;

  /**
   * month
   */
  @Prop() month: string;

  /**
   * day
   */
  @Prop() day: string;

  private getDate(): string {
    return formatDate(this.year, this.month, this.day);
  }

  render() {
    return <div>Hello, World! This Date {this.getDate()}</div>;
  }
}

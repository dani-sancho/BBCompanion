import { Pipe, PipeTransform } from '@angular/core';
import { expirationDateRules } from './expiration-date-pipe.mapper';

/**
 * Pipe that converts a Date into a human‑readable expiration message.
 *
 * The implementation is now declarative: an ordered list of conditions maps
 * a number of days to the appropriate message. This makes the logic easy to
 * extend, test and reason about (single responsibility, open/closed principle).
 */
@Pipe({
  name: 'expirationDate',
  standalone: true,
})
export class ExpirationDatePipe implements PipeTransform {
  /** Number of milliseconds in a day – used for conversion. */
  private static readonly MS_PER_DAY = 1000 * 60 * 60 * 24;

  transform(value: Date): string {
    const now = new Date();
    const diff = value.getTime() - now.getTime();
    const days = Math.floor(diff / ExpirationDatePipe.MS_PER_DAY);
    return this.mapDaysToMessage(days);
  }

  /**
   * Maps a signed day delta to the appropriate human‑readable message.
   * The rules are evaluated in order; the first matching predicate wins.
   */
  private mapDaysToMessage(days: number): string {
    const rule = expirationDateRules.find((rule) => rule.matches(days))!;
    return rule.format(days);
  }
}

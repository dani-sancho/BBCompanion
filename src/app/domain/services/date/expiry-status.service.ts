import { Injectable } from '@angular/core';
import { getExpiryStatus } from './expiry-status.mapper';

@Injectable({
  providedIn: 'root',
})
export class ExpiryStatusService {
  getStatus(value: Date): number {
    const now = new Date();
    const diff = value.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return getExpiryStatus(days);
  }
}

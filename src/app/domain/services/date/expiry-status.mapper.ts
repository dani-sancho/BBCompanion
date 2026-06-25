/**
 * Get expiry status based on the number of days remaining.
 * 0: Expired
 * 1: Expires this week
 * 2: Expires in more than a week
 * @param days Number of days remaining
 * @returns Expiry status
 */
export const getExpiryStatus = (days: number): number => (days < 0 ? 0 : days <= 7 ? 1 : 2);

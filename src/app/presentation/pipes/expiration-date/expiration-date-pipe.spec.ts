import { ExpirationDatePipe } from './expiration-date-pipe';

describe('ExpirationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpirationDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform todays date into expired or expires today', () => {
    const pipe = new ExpirationDatePipe();
    const date = new Date();
    //Note: Depends on timing execution it may delay test result into expired
    expect(['Expired', 'Expires today']).toContain(pipe.transform(date));
  });

  it('should transform a future date', () => {
    const pipe = new ExpirationDatePipe();
    const date = new Date();
    date.setDate(date.getDate() + 7);
    expect(pipe.transform(date)).toMatch(/^Expires in \d+ days$/);
  });
});

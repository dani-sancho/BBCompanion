import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ItemDisplay } from './item-display';
import { itemDisplayConfig } from './item-display.interface';

/** Host component wrapping ItemDisplay */
@Component({
  standalone: true,
  imports: [ItemDisplay],
  template: `
    <app-item-display
      [config]="items"
      [title]="title"
      (itemHandler)="selected = $event"
    ></app-item-display>
  `,
})
class TestHostComponent {
  title = 'Test Title';
  selected?: itemDisplayConfig;
  items: itemDisplayConfig[] = [
    { id: '1', name: 'Milk', category: 'Dairy', dueDate: new Date(), dateStatus: 0 },
    { id: '2', name: 'Bread', category: 'Bakery', dueDate: new Date(), dateStatus: 2 },
  ];
}

describe('ItemDisplay Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('creates the host', () => {
    expect(host).toBeTruthy();
  });

  it('renders title and item count', () => {
    const el = fixture.nativeElement as HTMLElement;
    const counter = el.querySelector('div.flex > div')?.textContent?.trim();
    expect(counter).toBe('2');
  });

  it('renders each item name', () => {
    const names = Array.from(
      fixture.nativeElement.querySelectorAll('div.font-bold') as NodeListOf<HTMLElement>,
    ).map((el: HTMLElement) => el.textContent?.trim());
    expect(names).toEqual(['Milk', 'Bread']);
  });

  it('emits item on click', () => {
    const button = fixture.nativeElement.querySelector('[role="button"]') as HTMLElement;
    button.click();
    expect(host.selected?.id).toBe('1');
  });

  it('emits item on Enter key', () => {
    const button = fixture.nativeElement.querySelector('[role="button"]') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    button.dispatchEvent(event);
    expect(host.selected?.id).toBe('1');
  });
});

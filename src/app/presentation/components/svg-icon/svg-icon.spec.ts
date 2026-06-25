import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SvgIconComponent } from './svg-icon';
import { SVG_ICONS } from './svg-icon.constants';

/**
 * Host component that wraps SvgIconComponent to provide @Input bindings.
 * This allows us to set inputs via regular property assignment in tests.
 */
@Component({
  standalone: true,
  imports: [SvgIconComponent],
  template: `<app-svg-icon [icon]="iconKey" [size]="iconSize"></app-svg-icon>`,
})
class TestHostComponent {
  // Default inputs for the first test case
  iconKey: keyof typeof SVG_ICONS = 'milk';
  iconSize = 25;
}

describe('SvgIconComponent (via TestHost)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let svgDebugEl: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    svgDebugEl = hostFixture.debugElement.query(By.directive(SvgIconComponent));
  });

  it('should create the component', () => {
    hostFixture.detectChanges();
    expect(svgDebugEl).toBeTruthy();
  });

  it('should render SVG paths for a known icon', async () => {
    // The default host inputs render the "milk" icon (3 paths)
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const svg = svgDebugEl.query(By.css('svg'));
    expect(svg).toBeTruthy();
    const paths = svg.queryAll(By.css('path'));
    expect(paths.length).toBe(3);
    const expectedD = ['M8 2h8', 'M9 2v4l-3 4v10h12V10l-3-4V2', 'M8 10h8'];
    const actualD = paths.map((p: any) => p.nativeElement.getAttribute('d'));
    expect(actualD).toEqual(expectedD);
  });

  it('should apply size style based on input', async () => {
    hostComponent.iconKey = 'droplet';
    hostComponent.iconSize = 48;
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const svg = svgDebugEl.query(By.css('svg'));
    const style = svg.nativeElement.getAttribute('style');
    expect(style).toContain('width: 48px');
    expect(style).toContain('height: 48px');
  });

  it('should render no paths for an unknown icon', async () => {
    // Assign a non‑existent key; TypeScript will complain, so we cast to any.
    hostComponent.iconKey = 'nonexistent' as any;
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const svg = svgDebugEl.query(By.css('svg'));
    // When the icon is unknown, the component renders an empty <svg> without paths.
    if (svg) {
      const paths = svg.queryAll(By.css('path'));
      expect(paths.length).toBe(0);
    } else {
      // If the component decides to not render the <svg> at all, we still consider the test passed.
      expect(svg).toBeNull();
    }
  });
});



import { Component, computed, input } from '@angular/core';
import { SVG_ICONS } from './svg-icon.constants';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  templateUrl: './svg-icon.html',
})
export class SvgIconComponent {
  icon = input.required<keyof typeof SVG_ICONS>();
  size = input<number>(25);

  iconPaths = computed(() => SVG_ICONS[this.icon()]?.paths ?? []);
  iconSize = computed(() => `width: ${this.size()}px; height: ${this.size()}px;`);
}

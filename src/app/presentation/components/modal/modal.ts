import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnChanges, OnDestroy {
  @Input() title: string = '';
  @Input() open: boolean = false;

  @Output() isOpen = new EventEmitter<void>();
  @Output() isClosed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close();
  }

  ngOnChanges() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
      this.isOpen.emit();
    } else {
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  close() {
    this.isClosed.emit();
  }
}

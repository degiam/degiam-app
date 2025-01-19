import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {
  private touchStartX = 0;
  private touchEndX = 0;

  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.detectSwipe();
  }

  private detectSwipe(): void {
    const deltaX = this.touchEndX - this.touchStartX;

    if (deltaX > 30) {
      this.swipeRight.emit();
    } else if (deltaX < -30) {
      this.swipeLeft.emit();
    }
  }
}

import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css'
})
export class PopoverComponent implements OnInit {
  @Input() maxWidth: number = 200;
  isInit = true;
  isVisible = false;
  position = { x: 0, y: 0 };

  private timeout: any;

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const popoverPadding = 10;

    this.position.x = Math.min(
      clientX,
      screenWidth - this.maxWidth - popoverPadding
    );
    this.position.y = Math.min(
      clientY - 110,
      screenHeight - popoverPadding
    );
  }

  showPopover() {
    this.isVisible = true;
    clearTimeout(this.timeout);
  }

  hidePopover() {
    this.isVisible = false;
    clearTimeout(this.timeout);
  }

  ngOnInit() {
    setTimeout(() => {
      this.isInit = false;
    }, 500);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getPaths } from '@/app.routes';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  private routes: string[] = getPaths();

  constructor(private router: Router) {}

  navigateOnSwipeLeft(): void {
    const currentPath = this.router.url.replace('/', '');
    const currentIndex = this.routes.indexOf(currentPath);
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.routes.length) {
      this.router.navigate([this.routes[nextIndex]]);
    }
  }

  navigateOnSwipeRight(): void {
    const currentPath = this.router.url.replace('/', '');
    const currentIndex = this.routes.indexOf(currentPath);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      this.router.navigate([this.routes[prevIndex]]);
    }
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private isGtagAvailable(): boolean {
    return typeof window.gtag === 'function';
  }

  sendPageView(pagePath: string): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isGtagAvailable()) {
        window.gtag('event', 'page_view', {
          page_location: window.location.href,
          page_path: pagePath,
          page_title: document.title
        });
      } else {
        console.error('Google Analytics gtag not available');
      }
    }
  }

  sendEvent(action: string, category: string, label: string = '', value: number = 0): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isGtagAvailable()) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        });
      } else {
        console.error('Google Analytics gtag not available');
      }
    }
  }
}

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlobalSettingsService } from '@configs/global.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  classLink = 'block px-4 py-2 rounded-full transition lg:hover:bg-zinc-100 dark:lg:hover:bg-slate-800 [&.active]:text-white [&.active]:bg-cyan-600 [&.active]:pointer-events-none';

  constructor(
    private router: Router,
    private globalSettings: GlobalSettingsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedMode = localStorage.getItem(this.globalSettings.getConfigLocalStorage());

      if (savedMode) {
        const savedData = JSON.parse(savedMode);
        this.isDarkMode = savedData.darkmode;
        this.updateTheme(this.isDarkMode);
        this.updateThemeIframe(this.isDarkMode);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = prefersDark;
        this.updateTheme(this.isDarkMode);
        this.updateThemeIframe(this.isDarkMode);

        localStorage.setItem(this.globalSettings.getConfigLocalStorage(), JSON.stringify({ darkmode: this.isDarkMode }));
      }

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.updateThemeIframe(this.isDarkMode);
        });
    }
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;

      localStorage.setItem(this.globalSettings.getConfigLocalStorage(), JSON.stringify({ darkmode: this.isDarkMode }));
      this.updateTheme(this.isDarkMode);
      this.updateThemeIframe(this.isDarkMode);
    }
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private updateThemeIframe(isDark: boolean): void {
    setTimeout(() => {
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { type: 'theme-change', isDarkMode: this.isDarkMode },
          '*'
        );
      }
    },100);
  }
}

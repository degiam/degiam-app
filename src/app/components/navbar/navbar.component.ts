import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { LoadingService } from '@/configs/loading.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    imports: [RouterModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  classLink = 'block px-3 sm:px-4 py-2 rounded-full transition lg:hover:bg-zinc-100 [&.active]:pointer-events-none';
  classLinkDefault = this.classLink + ' dark:lg:hover:bg-slate-800 [&.active]:text-white [&.active]:bg-cyan-500 [&.active]:dark:bg-cyan-600';
  classLinkHome = this.classLink + ' dark:lg:hover:bg-slate-800 [&.active]:text-white [&.active]:bg-red-500 [&.active]:dark:bg-red-700 !p-1.5';

  constructor(
    private router: Router,
    private configService: GlobalService,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedMode = localStorage.getItem(this.configService.getConfigLocalStorage());

      if (savedMode) {
        const savedData = JSON.parse(savedMode);
        this.isDarkMode = savedData.darkmode;
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = prefersDark;
      }

      this.updateTheme(this.isDarkMode);
      this.updateThemeIframe(this.isDarkMode);

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleSystemDarkModeChange.bind(this));

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.updateThemeIframe(this.isDarkMode);
          this.loadingService.setLoadingStatus(true);
        });
    }
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;

      localStorage.setItem(this.configService.getConfigLocalStorage(), JSON.stringify({ darkmode: this.isDarkMode }));

      this.updateTheme(this.isDarkMode);
      this.updateThemeIframe(this.isDarkMode);
    }
  }

  private handleSystemDarkModeChange(event: MediaQueryListEvent): void {
    const isDark = event.matches;
    this.isDarkMode = isDark;
    this.updateTheme(isDark);
    this.updateThemeIframe(isDark);
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private updateThemeIframe(isDark: boolean): void {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;

    if (iframe) {
      const sendMessage = () => {
        iframe.contentWindow?.postMessage(
          {
            type: 'theme-change',
            isDarkMode: isDark
          },
          '*'
        );

        const isMobile = window.innerWidth < 768;
        iframe.contentWindow?.postMessage(
          {
            type: 'screen-size',
            isMobile: isMobile
          },
          '*'
        );
      };

      if (iframe.classList.contains('loaded')) {
        sendMessage();
      } else {
        const handleIframeReady = (event: MessageEvent) => {
          if (event.data?.type === 'iframe-ready') {
            sendMessage();
            window.removeEventListener('message', handleIframeReady);
          }
        };
        window.addEventListener('message', handleIframeReady);

        iframe.addEventListener('load', () => {
          sendMessage();
          iframe.classList.add('loaded');
          setTimeout(() => {
            this.loadingService.setLoadingStatus(false);
          },100);
        });
      }
    }
  }
}

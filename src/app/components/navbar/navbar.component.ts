import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  lsTitle = 'degiam-app';
  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedMode = localStorage.getItem(this.lsTitle);

      if (savedMode) {
        const savedData = JSON.parse(savedMode);
        this.isDarkMode = savedData.darkmode;
        this.updateTheme(this.isDarkMode);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode = prefersDark;
        this.updateTheme(this.isDarkMode);

        localStorage.setItem(this.lsTitle, JSON.stringify({ darkmode: this.isDarkMode }));
      }
    }
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;

      localStorage.setItem(this.lsTitle, JSON.stringify({ darkmode: this.isDarkMode }));
      this.updateTheme(this.isDarkMode);
    }
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

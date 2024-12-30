import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { GlobalSettingsService } from '@configs/global.service';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { FooterComponent } from '@/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private globalSettings: GlobalSettingsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.globalSettings.getConfigBrand());

    this.metaService.addTags([
      { name: 'description', content: this.globalSettings.getConfigDesc() },
      { name: 'keywords', content: 'degiam, website, app, designer, ui, ux, ui/ux, frontend, javascript, js, typescript, ts, css, html, tailwind, mantine, react, next, vue, nuxt, angular' },

      { property: 'og:title', content: this.globalSettings.getConfigBrand() },
      { property: 'og:description', content: this.globalSettings.getConfigDesc() },
      { property: 'og:image', content: `${this.globalSettings.getConfigUrl()}/favicon.png` },
      { property: 'og:site_name', content: this.globalSettings.getConfigBrand() },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: this.globalSettings.getConfigBrand() },
      { name: 'twitter:description', content: this.globalSettings.getConfigDesc() },
      { name: 'twitter:image', content: `${this.globalSettings.getConfigUrl()}/favicon.png` },

      { name: 'format-detection', content: 'telephone=no, address=no, email=no' },

      { name: 'robots', content: 'index, follow, nocache' },

      { name: 'googlebot', content: 'index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1' },
      { name: 'google', content: 'notranslate' },
    ]);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = this.globalSettings.getConfigLang();
    }
  }
}

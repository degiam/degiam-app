import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { GlobalSettingsService } from '@configs/global.service';
import { LinkService } from '@configs/link.service';
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
  title: string;
  description: string;
  url: string;
  favicon: string;
  keywords: string;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private globalSettings: GlobalSettingsService,
    private linkService: LinkService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.title = this.globalSettings.getConfigBrand();
    this.description = this.globalSettings.getConfigDesc();
    this.url = `${this.globalSettings.getConfigUrl()}/`;
    this.favicon = `${this.globalSettings.getConfigUrl()}/favicon.png`;
    this.keywords = 'degiam, website, app, designer, ui, ux, ui/ux, frontend, javascript, js, typescript, ts, css, html, tailwind, mantine, react, next, vue, nuxt, angular';
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.metaService.addTags([
      { name: 'description', content: this.description },
      { name: 'keywords', content: this.keywords },

      { property: 'og:title', content: this.title },
      { property: 'og:description', content: this.description },
      { property: 'og:image', content: this.favicon },
      { property: 'og:url', content: this.url },
      { property: 'og:site_name', content: this.title },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: this.title },
      { name: 'twitter:description', content: this.description },
      { name: 'twitter:image', content: this.favicon },

      { name: 'format-detection', content: 'telephone=no, address=no, email=no' },

      { name: 'robots', content: 'index, follow, nocache' },

      { name: 'googlebot', content: 'index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1' },
      { name: 'google', content: 'notranslate' },
    ]);

    if (isPlatformBrowser(this.platformId)) {
      this.linkService.setCanonicalLink(this.url);
      document.documentElement.lang = this.globalSettings.getConfigLang();
    }
  }
}

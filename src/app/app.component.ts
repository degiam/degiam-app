import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { LinkService } from '@configs/link.service';
import { AnalyticsService } from '@configs/analytics.service';
import { NavbarComponent } from '@/components/navbar/navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
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
    private router: Router,
    private configService: GlobalService,
    private linkService: LinkService,
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.title = this.configService.getConfigBrand();
    this.description = this.configService.getConfigDesc();
    this.url = `${this.configService.getConfigUrl()}/`;
    this.favicon = `${this.configService.getConfigUrl()}/favicon.png`;
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
      document.documentElement.lang = this.configService.getConfigLang();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.analyticsService.sendPageView(event.urlAfterRedirects);
      }
    });
  }
}

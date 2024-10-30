import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  meta_brand = `Degiam App`;
  meta_desc = `Welcome to Degiam App`;
  meta_url = 'https://app.degiam.my.id';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.meta_brand);

    this.metaService.addTags([
      { name: 'description', content: this.meta_desc },
      { name: 'keywords', content: 'degiam, website, app, designer, ui, ux, ui/ux, frontend, javascript, js, typescript, ts, css, html, tailwind, mantine, react, next, vue, nuxt, angular' },

      { property: 'og:title', content: this.meta_brand },
      { property: 'og:description', content: this.meta_desc },
      { property: 'og:image', content: `${this.meta_url}/og.jpeg` },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: this.meta_brand },
      { name: 'twitter:description', content: this.meta_desc },
      { name: 'twitter:image', content: `${this.meta_url}/og.jpeg` },

      { name: 'format-detection', content: 'telephone=no, address=no, email=no' },

      { name: 'robots', content: 'index, follow, nocache' },

      { name: 'googlebot', content: 'index, follow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1' },
      { name: 'google', content: 'notranslate' },
    ]);
  }
}

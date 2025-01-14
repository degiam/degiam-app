import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private config_brand: string = 'Degiam App';
  private config_desc: string = 'Jelajahi beragam aplikasi luar biasa untuk mendukung aktivitas harianmu';
  private config_url: string = 'https://app.degiam.my.id';
  private config_lang: string = 'id';
  private config_author: string = 'Degiam';
  private config_author_url: string = 'https://degiam.my.id';
  private config_localstorage: string = 'degiam-app';

  pageMeta: { title: string; description: string; url: string } = {
    title: '',
    description: '',
    url: '',
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  setPageMeta(title: string, description: string, url: string): void {
    this.pageMeta = { title, description, url };
  }
  getPageMeta(): { title: string; description: string, url: string } {
    return this.pageMeta;
  }

  setConfigBrand(value: string): void {
    this.config_brand = value;
  }
  getConfigBrand(): string {
    return this.config_brand;
  }

  setConfigDesc(value: string): void {
    this.config_desc = value;
  }
  getConfigDesc(): string {
    return this.config_desc;
  }

  setConfigUrl(value: string): void {
    this.config_url = value;
  }
  getConfigUrl(): string {
    return this.config_url;
  }

  setConfigLang(value: string): void {
    this.config_lang = value;
  }
  getConfigLang(): string {
    return this.config_lang;
  }

  setConfigAuthor(value: string): void {
    this.config_author = value;
  }
  getConfigAuthor(): string {
    return this.config_author;
  }

  setConfigAuthorUrl(value: string): void {
    this.config_author_url = value;
  }
  getConfigAuthorUrl(): string {
    return this.config_author_url;
  }

  setConfigLocalStorage(value: string): void {
    this.config_localstorage = value;
  }
  getConfigLocalStorage(): string {
    return this.config_localstorage;
  }

  updateMetaTags(title: string, description: string, url: string = window.location.href): void {
    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  childInsideIframe(): void {
    if (isPlatformBrowser(this.platformId)) {
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;

      if (iframe) {
        iframe.addEventListener('load', () => {
          iframe.contentWindow?.postMessage(
            {
              type: 'child-inside-iframe',
              value: true
            },
            '*'
          );
        });
      }
    }
  }
}

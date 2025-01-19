import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  private readonly meta_name = 'Degiam App';
  private readonly meta_desc = 'Jelajahi beragam aplikasi luar biasa untuk mendukung aktivitas harianmu';
  private readonly meta_author = 'Degiam';
  private readonly meta_author_alias = 'Muhammad N. Hikam';
  private readonly meta_author_desc = `Seorang Frontend Developer lebih dari ${new Date().getFullYear() - 2018} tahun, mendesain dan mengembangkan web dan app untuk beragam klien, familiar juga dengan lintas platform, baik desktop maupun smartphone.`;
  private readonly meta_author_url = 'https://degiam.my.id';
  private readonly meta_author_image = 'https://degiam.my.id/profile/degiam.jpeg';
  private readonly meta_author_logo = 'https://degiam.my.id/profile/favicon.png';
  private readonly meta_author_job = 'Frontend Developer';
  private readonly meta_author_company = 'JogjaCamp';
  private readonly meta_email = 'degiam@outlook.com';
  private readonly meta_url = 'https://app.degiam.my.id';
  private readonly meta_logo = 'https://app.degiam.my.id/icons/icon-192x192.png';
  private readonly github = 'https://github.com/degiam';
  private readonly gitlab = 'https://gitlab.com/degiam';
  private readonly figma = 'https://figma.com/@degiam';
  private readonly twitter = 'https://x.com/degiam';
  private readonly instagram = 'https://instagram.com/degiam';
  private readonly linkedin = 'https://linkedin.com/in/degiam';
  private readonly soundcloud = 'https://soundcloud.com/degiam';

  readonly website = {
    '@type': 'WebSite',
    'name': this.meta_name,
    'url': this.meta_url,
    'publisher': {
      '@type': 'Person',
      'name': this.meta_author,
      'alternateName': this.meta_author_alias,
      'description': this.meta_author_desc,
      'image': this.meta_author_image,
      'url': this.meta_author_url,
    },
  };

  readonly author = {
    '@type': 'Person',
    'name': this.meta_author,
    'description': this.meta_author_desc,
    'image': this.meta_author_image,
    'url': this.meta_author_url,
    'email': this.meta_email,
    'sameAs': [
      this.github,
      this.gitlab,
      this.figma,
      this.twitter,
      this.instagram,
      this.linkedin,
      this.soundcloud,
    ],
    'jobTitle': this.meta_author_job,
    'worksFor': {
      '@type': 'Organization',
      'name': this.meta_author_company,
    },
  };

  readonly schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@id': this.meta_url,
          'name': 'Home',
        },
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@id': `${this.meta_url}/zip`,
          'name': 'KieZip',
        },
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@id': `${this.meta_url}/chat`,
          'name': 'KieChat',
        },
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'item': {
          '@id': `${this.meta_url}/link`,
          'name': 'KieLink',
        },
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'item': {
          '@id': `${this.meta_url}/pict`,
          'name': 'KiePict',
        },
      },
      {
        '@type': 'ListItem',
        'position': 6,
        'item': {
          '@id': `${this.meta_url}/gpt`,
          'name': 'KieGPT',
        },
      },
    ],
  };

  readonly schemaWebSite = {
    '@context': 'https://schema.org',
    ...this.website,
  };

  readonly schemaWebPageHome = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': this.meta_name,
    'url': this.meta_url,
    'description': this.meta_desc,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  readonly schemaWebPageZip = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'KieZip',
    'url': `${this.meta_url}/zip`,
    'description': `Zip Apapun, Langsung Jadi! Arsipkan file atau folder menjadi file zip dengan mudah dan cepat, tanpa harus instal dulu.`,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  readonly schemaWebPageChat = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'KieChat',
    'url': `${this.meta_url}/chat`,
    'description': `Chat tanpa simpan nomor. Cukup masukkan nomor ponsel atau nama pengguna saja, kamu bisa chat tanpa harus menyimpan kontaknya.`,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  readonly schemaWebPageLink = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'KieLink',
    'url': `${this.meta_url}/link`,
    'description': `Singkat tautan dan generate QR Code agar mudah dibagikan untuk promosi atau pun hal lainnya.`,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  readonly schemaWebPagePict = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'KiePict',
    'url': `${this.meta_url}/pict`,
    'description': `Editor gambar online yang serba bisa. Tidak perlu Photoshop! Kamu bisa edit gambar tanpa perlu ribet instal.`,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  readonly schemaWebPageGpt = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'KieGPT',
    'url': `${this.meta_url}/gpt`,
    'description': `Mau curhat? Yuk ngobrol sama GPT. Dapatkan saran dari GPT AI untuk masalah atau kendala yang kamu hadapi.`,
    'image': this.meta_logo,
    'isPartOf': this.website,
    'author': this.author,
  };

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  addJsonLd(data: Record<string, any> | Record<string, any>[]): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data, null, 2);

      this.renderer.appendChild(document.head, script);
    }
  }

  removeJsonLd(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach((script) => {
        this.renderer.removeChild(document.head, script);
      });
    }
  }
}

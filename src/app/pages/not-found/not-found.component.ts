import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '@/services/global.service';
import { LinkService } from '@/services/link.service';

@Component({
    selector: 'app-not-found',
    imports: [],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  image: string;

  constructor(
    private configService: GlobalService,
    private linkService: LinkService,
        @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.image = '/assets/img/warning.png';
  }

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Laman Tidak Ditemukan - ${this.configService.getConfigBrand()}`,
      'Maaf, laman ini tidak tersedia.',
      `${this.configService.getConfigUrl()}/404`
    );

    const { title, description, url } = this.configService.getPageMeta();
    this.configService.updateMetaTags(title, description, url);

    if (isPlatformBrowser(this.platformId)) {
      this.linkService.setCanonicalLink(window.location.href);
    }
  }
}

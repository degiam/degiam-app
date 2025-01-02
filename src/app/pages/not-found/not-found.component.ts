import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GlobalSettingsService } from '@configs/global.service';
import { LinkService } from '@configs/link.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  image: string;

  constructor(
    private globalSettings: GlobalSettingsService,
    private linkService: LinkService,
        @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.image = '/assets/img/warning.png';
  }

  ngOnInit(): void {
    this.globalSettings.setPageMeta(
      `Laman Tidak Ditemukan - ${this.globalSettings.getConfigBrand()}`,
      'Maaf, laman ini tidak tersedia.',
      `${this.globalSettings.getConfigUrl()}/404`
    );

    const { title, description, url } = this.globalSettings.getPageMeta();
    this.globalSettings.updateMetaTags(title, description, url);

    if (isPlatformBrowser(this.platformId)) {
      this.linkService.setCanonicalLink(window.location.href);
    }
  }
}

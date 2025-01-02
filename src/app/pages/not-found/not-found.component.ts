import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@configs/global.service';

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
  ) {
    this.image = '/assets/img/warning.png';
  }

  ngOnInit(): void {
    this.globalSettings.setPageMeta(
      `Laman Tidak Ditemukan - ${this.globalSettings.getConfigBrand()}`,
      'Maaf, laman ini tidak tersedia.',
      `${this.globalSettings.getConfigAuthor()}/404`
    );

    const { title, description, url } = this.globalSettings.getPageMeta();
    this.globalSettings.updateMetaTags(title, description, url);
  }
}

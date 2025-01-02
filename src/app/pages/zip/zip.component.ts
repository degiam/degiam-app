import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@configs/global.service';

@Component({
  selector: 'app-zip',
  standalone: true,
  imports: [],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.css'
})
export class ZipComponent implements OnInit {
  constructor(
    private globalSettings: GlobalSettingsService,
  ) {}

  ngOnInit(): void {
    this.globalSettings.setPageMeta(
      `Zip Apapun, Langsung Jadi! - QuiZip by ${this.globalSettings.getConfigAuthor()}`,
      'Arsipkan file atau folder menjadi file zip dengan mudah dan cepat, tanpa harus instal dulu.',
      `${this.globalSettings.getConfigUrl()}/zip`
    );

    const { title, description, url } = this.globalSettings.getPageMeta();
    this.globalSettings.updateMetaTags(title, description, url);
  }
}

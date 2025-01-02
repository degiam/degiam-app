import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@configs/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  robotImg = '/assets/img/robot.png';

  constructor(
    private globalSettings: GlobalSettingsService,
  ) {}

  ngOnInit(): void {
    this.globalSettings.setPageMeta(
      this.globalSettings.getConfigBrand(),
      'Temukan beragam aplikasi untuk mendukung produktivitas kamu seharian.',
      `${this.globalSettings.getConfigAuthor()}/`
    );

    const { title, description, url } = this.globalSettings.getPageMeta();
    this.globalSettings.updateMetaTags(title, description, url);
  }
}

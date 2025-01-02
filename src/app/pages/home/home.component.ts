import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@configs/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  brand: string;
  robotImg = '/assets/img/robot.png';

  constructor(
    private configService: GlobalService,
  ) {
    this.brand = this.configService.getConfigBrand();
  }

  ngOnInit(): void {
    this.configService.setPageMeta(
      this.configService.getConfigBrand(),
      'Temukan beragam aplikasi untuk mendukung produktivitas kamu seharian.',
      `${this.configService.getConfigUrl()}/`
    );

    const { title, description, url } = this.configService.getPageMeta();
    this.configService.updateMetaTags(title, description, url);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit {
  isLoading = true;
  title = '';
  description = '';

  constructor(
    private configService: GlobalService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Singkat Tautan Biar Gak Ribet - KieLink by ${this.configService.getConfigAuthor()}`,
      'Persingkat URL dan generate QR Code dari tautan kamu biar mudah dibagikan',
      `${this.configService.getConfigUrl()}/link`
    );

    const { title, description, url } = this.configService.getPageMeta();

    this.title = title;
    this.description = description;
    this.configService.updateMetaTags(title, description, url);

    this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
  selector: 'app-pict',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pict.component.html',
  styleUrl: './pict.component.css'
})
export class PictComponent implements OnInit {
  isLoading = true;
  title = '';
  description = '';

  constructor(
    private configService: GlobalService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Perkecil Ukuran dan Konversi Gambar Tanpa Ribet - KiePict by ${this.configService.getConfigAuthor()}`,
      'Kompresi dan konversi gambar dengan mudah, tanpa perlu instal aplikasi tambahan.',
      `${this.configService.getConfigUrl()}/picture`
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { SchemaService } from '@/configs/schema.service';
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
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Editor Gambar Online yang Serba Bisa - KiePict by ${this.configService.getConfigAuthor()}`,
      'Tidak perlu Photoshop! Kamu bisa edit gambar tanpa perlu ribet instal.',
      `${this.configService.getConfigUrl()}/picture`
    );

    const { title, description, url } = this.configService.getPageMeta();

    this.title = title;
    this.description = description;
    this.configService.updateMetaTags(title, description, url);

    this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    const schema = [
      this.schemaService.schemaBreadcrumb,
      this.schemaService.schemaWebSite,
      this.schemaService.schemaWebPagePict,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.schemaService.removeJsonLd();
  }
}

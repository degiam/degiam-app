import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { SchemaService } from '@/configs/schema.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
    selector: 'app-link',
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
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Singkat Tautan Biar Gak Ribet - KieLink by ${this.configService.getConfigAuthor()}`,
      'Persingkat URL dan generate QR Code dari tautan agar mudah dibagikan',
      `${this.configService.getConfigUrl()}/link`
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
      this.schemaService.schemaWebPageLink,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.schemaService.removeJsonLd();
  }
}

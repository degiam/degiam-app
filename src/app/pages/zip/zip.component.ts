import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { SchemaService } from '@/configs/schema.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
    selector: 'app-zip',
    imports: [CommonModule],
    templateUrl: './zip.component.html',
    styleUrl: './zip.component.css'
})
export class ZipComponent implements OnInit {
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
      `Zip Apapun, Langsung Jadi! - KieZip by ${this.configService.getConfigAuthor()}`,
      'Arsipkan file atau folder menjadi file zip dengan mudah dan cepat, tanpa harus instal dulu.',
      `${this.configService.getConfigUrl()}/zip`
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
      this.schemaService.schemaWebPageZip,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.schemaService.removeJsonLd();
  }
}

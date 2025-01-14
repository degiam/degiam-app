import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { SchemaService } from '@/configs/schema.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
  selector: 'app-gpt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gpt.component.html',
  styleUrl: './gpt.component.css'
})
export class GptComponent implements OnInit {
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
      `Mau Curhat? Yuk Ngobrol Sama GPT - KieGPT by ${this.configService.getConfigAuthor()}`,
      'Dapatkan saran dari GPT AI untuk masalah atau kendala yang kamu hadapi',
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
      this.schemaService.schemaWebPageGpt,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.schemaService.removeJsonLd();
  }
}

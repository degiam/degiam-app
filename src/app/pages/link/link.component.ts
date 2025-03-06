import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GlobalService } from '@/services/global.service';
import { SchemaService } from '@/services/schema.service';
import { LoadingService } from '@/services/loading.service';

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
  appName = 'KieLink';
  private loadingSubscription: Subscription = new Subscription();

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Singkat Tautan Biar Gak Ribet - ${this.appName} by ${this.configService.getConfigAuthor()}`,
      'Persingkat URL dan generate QR Code dari tautan agar mudah dibagikan',
      `${this.configService.getConfigUrl()}/link`
    );

    const { title, description, url } = this.configService.getPageMeta();

    this.title = title;
    this.description = description;
    this.configService.updateMetaTags(title, description, url);

    this.loadingSubscription.add(
      this.loadingService.isLoading$.subscribe(isLoading => {
        this.isLoading = isLoading;
      })
    );

    const schema = [
      this.schemaService.schemaWebSite,
      this.schemaService.schemaWebPageLink,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.schemaService.removeJsonLd();
  }
}

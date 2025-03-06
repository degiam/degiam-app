import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GlobalService } from '@/services/global.service';
import { SchemaService } from '@/services/schema.service';
import { LoadingService } from '@/services/loading.service';

@Component({
    selector: 'app-pict',
    imports: [CommonModule],
    templateUrl: './pict.component.html',
    styleUrl: './pict.component.css'
})
export class PictComponent implements OnInit {
  isLoading = true;
  title = '';
  description = '';
  appName = 'KiePict';
  private loadingSubscription: Subscription = new Subscription();

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Editor Gambar Online yang Serba Bisa - ${this.appName} by ${this.configService.getConfigAuthor()}`,
      'Tidak perlu Photoshop! Kamu bisa edit gambar tanpa perlu ribet instal.',
      `${this.configService.getConfigUrl()}/pict`
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
      this.schemaService.schemaWebPagePict,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.schemaService.removeJsonLd();
  }
}

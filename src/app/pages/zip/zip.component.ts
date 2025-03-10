import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GlobalService } from '@/services/global.service';
import { SchemaService } from '@/services/schema.service';
import { LoadingService } from '@/services/loading.service';

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
  appName = 'KieZip';
  private loadingSubscription: Subscription = new Subscription();

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Zip Apapun, Langsung Jadi! - ${this.appName} by ${this.configService.getConfigAuthor()}`,
      'Arsipkan file atau folder menjadi file zip dengan mudah dan cepat, tanpa harus instal dulu.',
      `${this.configService.getConfigUrl()}/zip`
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
      this.schemaService.schemaWebPageZip,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.schemaService.removeJsonLd();
  }
}

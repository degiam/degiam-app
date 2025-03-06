import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GlobalService } from '@/services/global.service';
import { SchemaService } from '@/services/schema.service';
import { LoadingService } from '@/services/loading.service';

@Component({
    selector: 'app-scan',
    imports: [CommonModule],
    templateUrl: './scan.component.html',
    styleUrl: './scan.component.css'
})
export class ScanComponent implements OnInit {
  isLoading = true;
  title = '';
  description = '';
  appName = 'KieScan';
  private loadingSubscription: Subscription = new Subscription();

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Scan Apapun yang Ada Didepanmu - ${this.appName} by ${this.configService.getConfigAuthor()}`,
      'Tak perlu bingung membaca QR Code atau Barcode, bisa dipakai kapan pun dan dimana pun!',
      `${this.configService.getConfigUrl()}/scan`
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
      this.schemaService.schemaWebPageScan,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.schemaService.removeJsonLd();
  }
}

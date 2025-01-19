import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlobalService } from '@/services/global.service';
import { SchemaService } from '@/services/schema.service';
import { LoadingService } from '@/services/loading.service';

@Component({
    selector: 'app-chat',
    imports: [CommonModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  isLoading = true;
  title = '';
  description = '';

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
    private loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Chat Tanpa Simpan Nomor - KieChat by ${this.configService.getConfigAuthor()}`,
      'Cukup masukkan nomor ponsel atau nama pengguna saja, kamu bisa chat tanpa harus menyimpan kontaknya.',
      `${this.configService.getConfigUrl()}/chat`
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
      this.schemaService.schemaWebPageChat,
    ];

    this.schemaService.addJsonLd(schema);

    this.configService.childInsideIframe();

    if (isPlatformBrowser(this.platformId)) {
      this.messageListener = (event: MessageEvent) => {
        const { type, link } = event.data;

        if (type === 'link') {
          window.location.href = link;
        }
      };

      window.addEventListener('message', this.messageListener);
    }
  }

  ngOnDestroy() {
    this.schemaService.removeJsonLd();

    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('message', this.messageListener);
    }
  }

  private messageListener!: (event: MessageEvent) => void;
}

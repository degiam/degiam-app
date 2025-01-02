import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '@configs/global.service';
import { LoadingService } from '@/configs/loading.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  isLoading = true;
  title = '';
  description = '';

  constructor(
    private configService: GlobalService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.configService.setPageMeta(
      `Chat Tanpa Simpan Nomor! - QuiChat by ${this.configService.getConfigAuthor()}`,
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
  }
}

import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@configs/global.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  constructor(
    private globalSettings: GlobalSettingsService,
  ) {}

  ngOnInit(): void {
    this.globalSettings.setPageMeta(
      `Chat Tanpa Simpan Nomor! - QuiChat by ${this.globalSettings.getConfigAuthor()}`,
      'Cukup masukkan nomor ponsel atau nama pengguna saja, kamu bisa chat tanpa harus menyimpan kontaknya.',
      `${this.globalSettings.getConfigAuthor()}/chat`
    );

    const { title, description, url } = this.globalSettings.getPageMeta();
    this.globalSettings.updateMetaTags(title, description, url);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalSettingsService {
  private config_brand: string = 'Degiam App';
  private config_desc: string = 'Selamat datang di Degiam App';
  private config_url: string = 'https://app.degiam.my.id';
  private config_lang: string = 'id';

  constructor() {}

  setConfigBrand(value: string): void {
    this.config_brand = value;
  }
  getConfigBrand(): string {
    return this.config_brand;
  }

  setConfigDesc(value: string): void {
    this.config_desc = value;
  }
  getConfigDesc(): string {
    return this.config_desc;
  }

  setConfigUrl(value: string): void {
    this.config_url = value;
  }
  getConfigUrl(): string {
    return this.config_url;
  }

  setConfigLang(value: string): void {
    this.config_lang = value;
  }
  getConfigLang(): string {
    return this.config_lang;
  }
}

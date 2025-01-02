import { Component } from '@angular/core';
import { GlobalSettingsService } from '@configs/global.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  brand: string = '';

  constructor(
    private globalSettings: GlobalSettingsService,
  ) {}

  ngOnInit(): void {
    // this.globalSettings.setConfigBrand('Updated brand');
    this.brand = this.globalSettings.getConfigBrand();
  }

  get years(): string {
    const currentYear = new Date().getFullYear();
    return currentYear === 2024 ? '2024' : `2024-${currentYear}`;
  }
}

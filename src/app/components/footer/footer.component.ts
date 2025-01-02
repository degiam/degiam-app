import { Component } from '@angular/core';
import { GlobalService } from '@configs/global.service';

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
    private configService: GlobalService,
  ) {}

  ngOnInit(): void {
    // this.configService.setConfigBrand('Updated brand');
    this.brand = this.configService.getConfigBrand();
  }

  get years(): string {
    const currentYear = new Date().getFullYear();
    return currentYear === 2024 ? '2024' : `2024-${currentYear}`;
  }
}

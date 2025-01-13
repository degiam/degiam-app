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
  author: string = '';
  author_url: string = '';

  constructor(
    private configService: GlobalService,
  ) {}

  ngOnInit(): void {
    // this.configService.setConfigBrand('Updated brand');
    this.author = this.configService.getConfigAuthor();
    this.author_url = this.configService.getConfigAuthorUrl();
  }

  get years(): string {
    const currentYear = new Date().getFullYear();
    // return currentYear === 2024 ? '2024' : `2024-${currentYear}`;
    return String(currentYear);
  }
}

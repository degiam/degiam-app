import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@configs/global.service';
import { SchemaService } from '@/configs/schema.service';
import { FooterComponent } from '@/components/footer/footer.component';
import { PopoverComponent } from '@/components/popover/popover.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, PopoverComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  brand: string;
  image = '/assets/img/robot.png';

  constructor(
    private configService: GlobalService,
    private schemaService: SchemaService,
  ) {
    this.brand = this.configService.getConfigBrand();
  }

  ngOnInit(): void {
    this.configService.setPageMeta(
      this.configService.getConfigBrand(),
      'Temukan beragam aplikasi untuk mendukung produktivitas kamu seharian.',
      `${this.configService.getConfigUrl()}/`
    );

    const { title, description, url } = this.configService.getPageMeta();

    this.configService.updateMetaTags(title, description, url);

    const schema = [
      this.schemaService.schemaBreadcrumb,
      this.schemaService.schemaWebSite,
      this.schemaService.schemaWebPageHome,
    ];

    this.schemaService.addJsonLd(schema);
  }

  ngOnDestroy(): void {
    this.schemaService.removeJsonLd();
  }
}

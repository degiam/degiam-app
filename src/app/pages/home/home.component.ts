import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Degiam App');
    this.metaService.updateTag({ name: 'description', content: 'Welcome to the home page of Degiam App' });
  }

  author = 'degiam';
  robotImg = '/assets/img/robot.png';
}

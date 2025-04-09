import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeSectionHeaderComponent } from './home-section-header/home-section-header.component';
import { HomeSectionContentComponent } from './home-section-content/home-section-content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeSectionHeaderComponent,
    HomeSectionContentComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnDestroy() {
  }
  
  ngOnInit() {
  }
}

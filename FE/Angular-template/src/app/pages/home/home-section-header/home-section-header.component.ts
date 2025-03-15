import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchMajorComponent } from '../../../common/components/search-major/search-major.component';

@Component({
  selector: 'app-home-section-header',
  imports: [
    SearchMajorComponent
  ],
  templateUrl: './home-section-header.component.html',
  styleUrl: './home-section-header.component.scss'
})
export class HomeSectionHeaderComponent implements OnInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}

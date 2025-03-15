import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CarouselModule } from 'primeng/carousel';
import { FacilityMajorTopFeedbackComponent } from '../../../common/components/major-top-feedback/facility-major-top-feedback.component';

@Component({
  selector: 'app-home-section-content',
  imports: [
    FormsModule,
    TabsModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    RatingModule,
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,

    FacilityMajorTopFeedbackComponent,
  ],
  templateUrl: './home-section-content.component.html',
  styleUrl: './home-section-content.component.scss'
})
export class HomeSectionContentComponent implements OnInit, OnDestroy {

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

import { Component } from '@angular/core';
import { ServiceCardComponent } from '../../../common/components/service-card/service-card.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-facility-major-detail-section-content',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ServiceCardComponent,
    ButtonModule,
    CardModule,
    RatingModule,
    AvatarModule,
    TextareaModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    TabsModule,
    DialogModule,
  ],
  templateUrl: './facility-major-detail-section-content.component.html',
  styleUrl: './facility-major-detail-section-content.component.scss'
})
export class FacilityMajorDetailSectionContentComponent {

  visible: boolean = false;
  value: '';

  feedback = {
    name: 'Tai Le',
    date: '10 tháng 3, 2025',
    rating: 3,
    comment: 'Game hay đấy nhưng game có thể thêm tính năng lúc chơi squad cup mình có thể điều khiển 2 con recruits được...'
  };

  showDialogFeedback() {
    this.visible = true;
  }
}

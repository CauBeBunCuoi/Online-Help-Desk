import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-facility-major-top-feedback',
  imports: [
    FormsModule,
    CardModule,
    RatingModule,
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,
  ],
  templateUrl: './facility-major-top-feedback.component.html',
  styleUrl: './facility-major-top-feedback.component.scss'
})
export class FacilityMajorTopFeedbackComponent {

  feedbacks = [
    {
      name: 'Tai Le',
      date: '10 tháng 3, 2025',
      rating: 3,
      comment: 'Game hay đấy nhưng game có thể thêm tính năng lúc chơi squad cup mình có thể điều khiển 2 con recruits được...'
    },
    {
      name: 'Nguyen Van A',
      date: '5 tháng 2, 2025',
      rating: 4,
      comment: 'Mình thấy game khá ổn, nhưng cần cải thiện thêm AI để đội hình hoạt động tốt hơn.'
    },
    {
      name: 'Tran B',
      date: '20 tháng 1, 2025',
      rating: 5,
      comment: 'Rất thích lối chơi của game, hi vọng có thêm nhiều sự kiện hay hơn nữa!'
    }
  ];

}

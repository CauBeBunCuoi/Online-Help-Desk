import { Component } from '@angular/core';
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
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facility-major-detail-section-content',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    RatingModule,
    AvatarModule,
    TextareaModule,
    DividerModule,
    InputTextModule,
    TabsModule,
    DialogModule,
    PaginatorModule,
    BadgeModule,
    ChipModule,
    TagModule,
    RouterLink,
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

  feedbacks = [
    { name: 'Nguyễn Văn A', date: '2025-03-10', rating: 4, comment: 'Dịch vụ tốt.' },
    { name: 'Trần Thị B', date: '2025-03-12', rating: 5, comment: 'Nhân viên rất nhiệt tình.' },
    { name: 'Lê Văn C', date: '2025-03-13', rating: 3, comment: 'Cần cải thiện chất lượng.' },
    { name: 'Phạm Thị D', date: '2025-03-14', rating: 4, comment: 'Không gian sạch sẽ.' },
    { name: 'Hoàng Văn E', date: '2025-03-15', rating: 5, comment: 'Rất hài lòng.' },
    { name: 'Đỗ Thị F', date: '2025-03-16', rating: 4, comment: 'Dịch vụ khá ổn.' },
  ];

  pageSize = 3;  // Số feedback mỗi trang
  currentPage = 0;

  showDialogFeedback() {
    this.visible = true;
  }

  get paginatedFeedbacks() {
    const start = this.currentPage * this.pageSize;
    return this.feedbacks.slice(start, start + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
  }
}

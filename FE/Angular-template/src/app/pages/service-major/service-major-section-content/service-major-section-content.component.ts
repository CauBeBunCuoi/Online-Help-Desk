import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-major-section-content',
  imports: [
    ButtonModule,
    CardModule,
    BadgeModule,
    ChipModule,
    TagModule,
    DividerModule,
    AvatarModule,
    RouterLink,
  ],
  templateUrl: './service-major-section-content.component.html',
  styleUrl: './service-major-section-content.component.scss'
})
export class ServiceMajorSectionContentComponent {

}

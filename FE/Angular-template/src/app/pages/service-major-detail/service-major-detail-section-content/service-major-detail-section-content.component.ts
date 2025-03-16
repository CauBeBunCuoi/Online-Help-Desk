import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-major-detail-section-content',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './service-major-detail-section-content.component.html',
  styleUrl: './service-major-detail-section-content.component.scss'
})
export class ServiceMajorDetailSectionContentComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}

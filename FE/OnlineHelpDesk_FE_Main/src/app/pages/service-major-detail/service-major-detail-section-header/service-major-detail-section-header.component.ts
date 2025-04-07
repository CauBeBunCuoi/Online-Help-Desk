import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-service-major-detail-section-header',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './service-major-detail-section-header.component.html',
  styleUrl: './service-major-detail-section-header.component.scss'
})
export class ServiceMajorDetailSectionHeaderComponent {
  @Input()
  name: string = '';
  @Input()
  logo: string = '';
  @Input()
  image: string = '';

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/layouts/header/header.component';
import { FooterComponent } from './common/layouts/footer/footer.component';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BreadcrumbComponent } from './common/components/breadcrump/breadcrumb.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    // BreadcrumbComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OnlineHelpDesk_FE_Main';
}

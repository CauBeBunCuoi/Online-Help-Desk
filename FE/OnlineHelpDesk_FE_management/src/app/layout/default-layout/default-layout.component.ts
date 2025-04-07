import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { Store } from '@ngrx/store';
import { AccountService } from '../../core/service/accounts.service';
import { selectAuthUser } from '../../store/auth/selectors';
import { get_roleNav } from './_roleNav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    // IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective,
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];

  constructor(
    private accountService: AccountService,

    private store: Store


  ) { }

  ngOnInit(): void {
    this.accountService.checkLogin_MainPage();
    this.store.select(selectAuthUser).subscribe((user) => {
      console.log(user);  
      this.navItems = get_roleNav(parseInt(user.role_id));

    }
    );

  }
}

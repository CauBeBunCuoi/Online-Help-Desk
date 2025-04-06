import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    BreadcrumbModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: any[] = []; // Mảng các item breadcrumb

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Lắng nghe sự thay đổi URL để cập nhật breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb() {
    // Reset breadcrumb items
    this.breadcrumbItems = [];

    // Get current route and construct breadcrumb
    let currentRoute = this.activatedRoute.root;
    let url = '';

    while (currentRoute.children.length > 0) {
      const childRoute = currentRoute.children[0];
      const routeConfig = childRoute.routeConfig;

      if (routeConfig?.path) {
        // Update URL
        url += '/' + routeConfig.path;

        // Access 'breadcrumb' using bracket notation
        this.breadcrumbItems.push({
          label: routeConfig.data?.['breadcrumb'], // Use ['breadcrumb'] instead of .breadcrumb
          url
        });
      }

      currentRoute = childRoute;
    }
  }
}
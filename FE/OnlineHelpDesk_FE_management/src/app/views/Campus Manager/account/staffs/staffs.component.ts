import { Component } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";

import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

@Component({
  selector: 'app-staffs',
  standalone: true,
  imports: [
    AgGridAngular,
    CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent {
  // Row Data: The data to be displayed.
  rowData: IRow[] = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true,  },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<IRow>[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ];
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };
}

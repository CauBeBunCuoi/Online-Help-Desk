import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GetRowIdParams,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  ValidationModule,
  createGrid,
} from "ag-grid-community";

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    Dialog,
    AgGridAngular,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  visible: boolean = false;

  selectedFacility: any;
  showFacilityPopup = false;
  showFloorPopup = false;
  showRoomPopup = false;
  showAreaPopup = false;

  newFloor = '';
  newRoom = '';
  newArea = '';

  facilityData = [
    {
      id: 1,
      name: "Building A",
      floors: [{ name: "Floor 1" }],
      rooms: [{ name: "Room 101" }],
      areas: [{ name: "Lobby" }]
    },
    {
      id: 2,
      name: "Building B",
      floors: [{ name: "Floor 2" }],
      rooms: [{ name: "Room 201" }],
      areas: [{ name: "Parking" }]
    }
  ];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Facility Name', width: 200 },
    {
      field: 'floors',
      headerName: 'Floors',
      valueGetter: (params) => params.data.floors.map((f: any) => f.name).join(', '),

    },
    {
      field: 'rooms',
      headerName: 'Rooms',
      valueGetter: (params) => params.data.rooms.map((r: any) => r.name).join(', ')
    },
    {
      field: 'areas',
      headerName: 'Areas',
      valueGetter: (params) => params.data.areas.map((a: any) => a.name).join(', ')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: params => {
        return `
        <button pButton type="button" label="Floors" class="p-button-sm p-button-info mr-1"
            (click)="manageFloors()"></button>
    <button pButton type="button" label="Rooms" class="p-button-sm p-button-success mr-1"
            (click)="manageRooms()"></button>
    <button pButton type="button" label="Areas" class="p-button-sm p-button-warning mr-1"
            (click)="manageAreas()"></button>
    <button pButton type="button" icon="pi pi-pencil" class="p-button-sm p-button-secondary"
            (click)="updateFacility()"></button>
            `;
      },
      width: 150
    }
  ];

  onGridReady(params: any) {
    console.log('Grid is ready!', params);
  }


  openFacilityPopup(facility: any) {
    this.selectedFacility = facility;
    this.showFacilityPopup = true;
  }

  openFloorPopup() {
    this.showFloorPopup = true;
  }

  openRoomPopup() {
    this.showRoomPopup = true;
  }

  openAreaPopup() {
    this.showAreaPopup = true;
  }

  addFloor() {
    if (this.newFloor) {
      this.selectedFacility.floors.push({ name: this.newFloor });
      this.newFloor = '';
    }
  }

  addRoom() {
    if (this.newRoom) {
      this.selectedFacility.rooms.push({ name: this.newRoom });
      this.newRoom = '';
    }
  }

  addArea() {
    if (this.newArea) {
      this.selectedFacility.areas.push({ name: this.newArea });
      this.newArea = '';
    }
  }

  deleteFloor(floor: any) {
    this.selectedFacility.floors = this.selectedFacility.floors.filter(f => f !== floor);
  }

  deleteRoom(room: any) {
    this.selectedFacility.rooms = this.selectedFacility.rooms.filter(r => r !== room);
  }

  deleteArea(area: any) {
    this.selectedFacility.areas = this.selectedFacility.areas.filter(a => a !== area);
  }


  showDialog() {
    this.visible = true;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-facility-major-section-header',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './facility-major-section-header.component.html',
  styleUrl: './facility-major-section-header.component.scss'
})
export class FacilityMajorSectionHeaderComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  majorTypes = [
    { name: 'Computer Science', value: 'cs' },
    { name: 'Business Administration', value: 'ba' },
    { name: 'Mechanical Engineering', value: 'me' }
  ];
  selectedMajor: any | undefined;
  keyword: string;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      selectedMajor: [null],
      keyword: ['']
    });
  }
  ngOnDestroy() {
  }

  save() {
    console.log(this.formGroup.value);

  }
}

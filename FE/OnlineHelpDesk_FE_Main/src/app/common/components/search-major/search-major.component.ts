import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-major',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './search-major.component.html',
  styleUrl: './search-major.component.scss'
})
export class SearchMajorComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  majors = [
    { name: 'Computer Science', value: 'cs' },
    { name: 'Business Administration', value: 'ba' },
    { name: 'Mechanical Engineering', value: 'me' }
  ];
  selectedMajorType: any | undefined;
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

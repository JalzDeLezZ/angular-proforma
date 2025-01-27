import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBT_CATEGORY, I_CATEGORY } from "@assets/data/MOCK_DATA"
import { ApiService } from './services/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  currentDate!: Date;
  value = 'Clear me';
  private timerId: any;
  readonly date = new FormControl(new Date());
  readonly minDate = new Date();

  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(8),
    Validators.maxLength(10),
  ]);

  myControl = new FormControl('');
  options: I_CATEGORY[] = []; // Inicialmente vacío
  filteredOptions!: Observable<string[]>;

  matcher = new MyErrorStateMatcher();

  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) {}

  ngOnInit(): void {

    this.updateTime();
    this.timerId = setInterval(() => {
      this.updateTime();
      this.cdr.markForCheck(); // Marca para detección de cambios
    }, 1000);

    this.callStack();
  }

  async callStack() {
    this.options = await this.apiService.getFakeCategories();
    this.cdr.markForCheck();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private updateTime(): void {
    this.currentDate = new Date();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    /* return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    ); */
    return this.options
      .map(option => option.cat_name)
      .filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onTimeSet(time: string): void {
    console.log('Hora completa seleccionada:', time);
  }
}

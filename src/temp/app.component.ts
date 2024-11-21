import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {NgModule} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  currentDate!: Date;
  value = 'Clear me';
  primaryDateTime: Date;
  secondaryDateTime: Date;
  minSecondaryDateTime: Date;
  private timerId: any;

   readonly date = new FormControl(new Date());
  //readonly serializedDate = new FormControl(new Date().toISOString());
  readonly minDate = new Date();
  
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(8),
    Validators.maxLength(10),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  matcher = new MyErrorStateMatcher();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.updateTime();
    this.timerId = setInterval(() => {
      this.updateTime();
      this.cdr.markForCheck(); // Marca para detección de cambios
    }, 1000);

  }
  private updateTime(): void {
    this.currentDate = new Date();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
 /*
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onPrimaryDateTimeChange() {
    console.log("CHANGE")
    if (this.primaryDateTime) {
      console.log("!!!111!!!")
      // Añadir 30 minutos al valor del primer datetime picker
      this.secondaryDateTime = new Date(this.primaryDateTime);
      this.secondaryDateTime.setMinutes(this.secondaryDateTime.getMinutes() + 30);

      // Establecer la fecha mínima para el segundo datetime picker
      this.minSecondaryDateTime = new Date(this.primaryDateTime);
    }
  } */

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }


  selectedHour: number | null = null;

  onHourSelected(hour: number): void {
    this.selectedHour = hour;
    console.log('Hora seleccionada:', hour);
    // Aquí puedes realizar otras acciones, como actualizar el estado de la aplicación
  }

  onTimeSet(time: string): void {
    console.log('Hora completa seleccionada:', time);
  }

}

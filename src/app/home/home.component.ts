import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports : [ MatIconModule, FormsModule, MatSlideToggleModule, MatCardContent, MatCheckbox, MatCard, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'myappxx';

  checked = false;
  disabled = false;


  ngOnInit() {
    console.log("INIT ZZZZ")
  }

}
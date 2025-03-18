import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import {  HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SpinnerComponent,HttpClientModule,MatAutocompleteModule,MatInputModule]
})
export class AppComponent {
  title = 'Garage';
}

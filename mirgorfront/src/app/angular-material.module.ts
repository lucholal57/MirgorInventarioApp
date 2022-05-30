import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  imports: [
  ],
  exports: [
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class AngularMaterialModule { }

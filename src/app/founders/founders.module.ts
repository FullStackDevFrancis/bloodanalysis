import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FoundersComponent} from "./founders.component";



@NgModule({
  declarations: [FoundersComponent],
  imports: [
    CommonModule
  ],
  exports: [FoundersComponent]
})
export class FoundersModule { }

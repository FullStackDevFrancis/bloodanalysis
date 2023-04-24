import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [MainComponent]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main.component";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [MainComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterLink
    ],
  exports: [MainComponent]
})
export class MainModule { }

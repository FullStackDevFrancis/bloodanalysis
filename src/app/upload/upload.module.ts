import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadComponent} from "./upload.component";
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";




@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [UploadComponent]
})
// @ts-ignore
export class UploadModule { }

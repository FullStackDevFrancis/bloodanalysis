import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadComponent} from "./upload.component";
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  exports: [UploadComponent]
})
export class UploadModule { }

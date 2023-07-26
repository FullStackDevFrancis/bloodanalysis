import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadComponent} from "./upload.component";
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {LineChartModule} from "@swimlane/ngx-charts";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    LineChartModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
  ],
  exports: [UploadComponent]
})
// @ts-ignore
export class UploadModule { }

import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  imageUploaded = false;
  analysisBusy = false;
  fileType = 'image/*';
  dataSource: any;
  filterValues = []
  currentFilter = '';
  minScale = 0;
  maxScale = 100;
  compareOrAnalyze = '1';
  hospital = "";

  // COMPARE CHART
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  displayedColumns: string[] = ['Analyse', 'Eenheid', 'Referentie', 'value'];

  fileName = '';
  diseases = [{
    name: 'Addisons Disease',
    probability: 75,
    color: 'green'
  },
    {
      name: 'Cushing Syndrome',
      color: 'red',
      probability: 20
    },
    {
      name: 'Diabetes Mellitus',
      color: 'light-green',
      probability: 60
    },
    {
      name: 'Hyperthyroidism',
      color: 'light-red',
      probability: 40
    },
    {
      name: 'Hypothyroidism',
      color: 'orange',
      probability: 50
    }]

  dataFromBE: any  = {
  }

  comparison: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.analysisBusy = true;
    const files: File = event.target.files;

    if (files) {

      this.fileName = 'Analyse';

      const formData = new FormData();
      if (this.compareOrAnalyze === '1') {
        formData.append("file", (files as any)[0]);
      } else {
        for (let index in files) {
          if (typeof (files as any)[index] == 'object'){
            formData.append("files", (files as any)[index]);
          }
        }
      }

      if (this.compareOrAnalyze === '1') {
        const upload$ = this.http.post("https://bam-ai.herokuapp.com/scan/image?type=" + this.hospital, formData);
        upload$.subscribe(x => {
          this.dataSource = x;
          this.imageUploaded = true;
          this.analysisBusy = false;
        })
      }

      if (this.compareOrAnalyze === '2') {
        const upload$ = this.http.post("https://bam-ai.herokuapp.com/compare/files?type="+ this.hospital, formData);
        upload$.subscribe(x => {
          this.imageUploaded = true;
          this.dataFromBE = x
          this.changeComparison()
          // this.dataSource = x;
          this.analysisBusy = false;
        })
      }
    }
  }

  changeComparison() {
    this.filterValues = Object.keys(this.dataFromBE) as [];
    const listOfSerie = []
    const listOfValues = this.dataFromBE[this.currentFilter]

    this.minScale = listOfValues[0]["Normality"].split('-')[0] * 0.8
    this.maxScale = listOfValues[0]["Normality"].split('-')[1] * 1.3
    for (const obj in listOfValues) {
      listOfSerie.push({
        "name": 'file ' + obj,
        "value": listOfValues[obj]["Referentie"]
      })
    }
    console.log(listOfSerie)
    this.comparison = [
      {
        "name": this.currentFilter,
        "series": listOfSerie
      }
    ]
    console.log(this.currentFilter)
  }
}

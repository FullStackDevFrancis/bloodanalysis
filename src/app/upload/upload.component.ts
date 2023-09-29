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
  fileType = '*';
  dataSource: any;
  filterValues = []
  currentFilter = '';
  minScale = 0;
  maxScale = 100;
  compareOrAnalyze = '1';

  // COMPARE CHART
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  displayedColumns: string[] = ['Test', 'Unit', 'Value', 'Reference', 'BamTest'];

  resultChanged: any = []
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

  dataFromBE = []

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
        formData.append("files", (files as any)[0]);
      } else {
        for (let index in files) {
          if (typeof (files as any)[index] == 'object') {
            formData.append("files", (files as any)[index]);
          }
        }
      }


      const upload$ = this.http.post("https://bam-ai.herokuapp.com/scan/image", formData);
      upload$.subscribe((x: any) => {
        this.dataSource = x.results;
        this.dataFromBE = x.results;
        x.results.forEach((x: any) => {
          const mutatedObj = x
          x.lastValue = '[' + x.measurements.map((x: any) => x.value).join(' , ') + ']'
        })
        this.changeComparison();
        this.imageUploaded = true;
        this.analysisBusy = false;
      })
    }
  }


  changeComparison() {
    console.log()
    this.filterValues = this.dataFromBE.map((x: any) => x.test) as [];
    const listOfSerie: any = []
    const foundValue: any = this.dataFromBE.find((x: any) => x.test == this.currentFilter)
    console.log(this.filterValues, foundValue)
    if (foundValue) {
      this.minScale = foundValue.reference.split('|')[0] * 0.8
      this.maxScale = foundValue.reference.split('|')[1] * 1.3
      foundValue.measurements.forEach((x: any, index: number) => {
        listOfSerie.push({
          "name": 'file ' + (index + 1),
          "value": x.value
        })
      })


      this.comparison = [
        {
          "name": this.currentFilter,
          "series": listOfSerie
        }
      ]
    }
    console.log(this.comparison)
    console.log(this.currentFilter)
  }
}

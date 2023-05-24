import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  imageUploaded = false;
  analysisBusy = false;
  fileType = 'image/png';
  dataSource: any;

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.analysisBusy = true;
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("file", file);

        const upload$ = this.http.post("https://bam-ai.herokuapp.com/scan/image", formData);
        upload$.subscribe(x => {
          this.dataSource = x;
          this.imageUploaded = true;
          this.analysisBusy = false;
        })
    }
}
}

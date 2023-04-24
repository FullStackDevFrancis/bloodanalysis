import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'bloodanalysis';
  showGrayedOut = false;
  mobile = false;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(private url: LocationStrategy) {

  }

  ngOnInit(): void {
    if (window.screen.width <= 960) { // 768px portrait
      this.mobile = true;
    }
    if (window.screen.width >= 1700) { // 768px portrait
      this.showGrayedOut = true;
    }
  }

  isMatchingPath(route: string) {
    return this.url.path().includes(route);
  }
}

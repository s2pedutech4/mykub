import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyer-filters',
  templateUrl: './lawyer-filters.component.html',
  styleUrls: ['./lawyer-filters.component.scss']
})
export class LawyerFiltersComponent implements OnInit {
  services: any = ["abc","xyz"];

  constructor() { }

  ngOnInit() {
  }

}

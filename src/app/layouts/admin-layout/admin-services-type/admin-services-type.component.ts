import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-services-type',
  templateUrl: './admin-services-type.component.html',
  styleUrls: ['./admin-services-type.component.scss']
})
export class AdminServicesTypeComponent implements OnInit {
  p: number = 1;
  services = [
    {
      id : 100,
      type : "bjn"
    },
    {
      id : 101,
      type : "bjn"
    },
    {
      id : 102,
      type : "bjn"
    },
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  AddAdmin(){
    this.router.navigate(['/addservice-type']);

  }
  EditAdmin(item){
    // this.title.emit("Edit");
    // this.add.title = "Edit";
    this.router.navigate(['/addservice-type'] ,{ queryParams: item });

  }

}

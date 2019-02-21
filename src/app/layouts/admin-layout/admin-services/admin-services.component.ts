import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
// import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss']
})
export class AdminServicesComponent implements OnInit {
  // @Output() title = new EventEmitter<string>();
p: number = 1;
  services = [
    {
      id : 100,
      firstName: "faisal",
      lastName : "Amdani",
      email : "assa@ds.com",
      mobile : 8605601208
    },
    {
      id : 101,
      firstName: "Gandhar",
      lastName : "Patwardhan",
      email : "assa@ds.com",
      mobile : 8605601208
    },
    {
      id : 103,
      firstName: "Sachin",
      lastName : "Nandgirwar",
      email : "assa@ds.com",
      mobile : 8605601208
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  AddAdmin(){
    this.router.navigate(['/addservice']);

  }
  EditAdmin(item){
    // this.title.emit("Edit");
    // this.add.title = "Edit";
    this.router.navigate(['/addservice'] ,{ queryParams: item });

  }
 

}

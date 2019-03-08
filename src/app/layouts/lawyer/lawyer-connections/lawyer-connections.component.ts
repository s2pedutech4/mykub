import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LawyersService } from '../../../services/lawyers/lawyers.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lawyer-connections',
  templateUrl: './lawyer-connections.component.html',
  styleUrls: ['./lawyer-connections.component.scss']
})

export class LawyerConnectionsComponent implements OnInit {
  connections:any = [];
  connectionsfilter:any = [];
  currentUser: any;
  title: any = "Services Availed";
  filterForm: FormGroup;
  showTable: boolean = true;
  p: number = 1;
  // @ViewChild('myModal') myModal;

  constructor(private _formBuilder: FormBuilder,private spinnerService: Ng4LoadingSpinnerService,private router: Router,private rest: RestService,private auth: AuthService,private lawyer: LawyersService,private _location: Location) { }

  ngOnInit() {
    this.filterForm = this._formBuilder.group({
      service: [null,Validators.required]
    });

    this.spinnerService.show();
this.currentUser = this.auth.getCurrentUser();
console.log(this.currentUser);
if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_LAWYER")
    {
        this.router.navigate(['/login']);

    }

    // get transactions of a lawyer
    this.lawyer.getAllTransaction(this.currentUser.id).subscribe(data => {
      console.log(data);
      this.connections = [];
      for(let i=0; i< data.length; i++)
      {
        
        let serviceId = data[i].serviceId;
        let userId = data[i].userId;
        let tdate = data[i].transactionDate;
        let connData:any = {};
        
        // get the user details
        this.rest.getUserInfo(userId).subscribe(userData => {
          console.log(userData);
          connData.firstName = userData.firstName;
          connData.lastName = userData.lastName;
          
          // get the service data
        this.rest.getServiceDetails(serviceId).subscribe(serviceData => {
          console.log(serviceData);
          connData.serviceName = serviceData.displayName;
          connData.details = data[i];
          this.connections.push(connData);
          this.connectionsfilter.push(connData);
          console.log(this.connections);
          this.connectedServices();
        }, error => {
          console.log("Unable to get service data");
        });
        }, error => {
          console.log("Unable to get user data");
        });

        

      }
    }, error => {});
  
    
  }

  GoToUserDetails(item){
    console.log(item);
    let obj:any = {};
    obj.userId = item.details.userId;
    obj.transactionId = item.details.id;
    this.router.navigate(['/user-details'],{ queryParams: obj });
  }
  filter(){
      console.log(this.filterForm.value);
      if(this.filterForm.controls.service.value.length === 0)
      {
        this.connectionsfilter = this.connections;
      }
      else{
      this.connectionsfilter = this.connections.filter( x =>{
          for(let i = 0;i<this.filterForm.controls.service.value.length;i++){
            if(this.filterForm.controls.service.value[i] === x.details.serviceId)
            return x;
          }
      });
    }
      console.log(this.connectionsfilter);
      this.showTable = true;
  }
  goToFilter()
  {
    this.showTable = false;
  }
  Cancel()
  {
    this.connectionsfilter = this.connections;
    this.availedServices();
    this.showTable = true;

  }
  connectedServices()
  {
    this.title = "Connections";
    this.connectionsfilter = this.connections.filter( x =>{
      console.log(x.details.serviceId);
      if(x.details.serviceId === 1)
        return x;
    });
    console.log(this.connectionsfilter);
  }
  availedServices()
  {
    this.title = "Services Availed";
    this.connectionsfilter = this.connections.filter( x =>{
      if(x.details.serviceId != 1)
        return x;
    });
    console.log(this.connectionsfilter);
  }
  goToBack()
  {
    this._location.back();
  
  }
}


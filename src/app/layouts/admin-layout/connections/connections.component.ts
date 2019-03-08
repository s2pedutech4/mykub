import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AdminMastersService } from '../../../services/admin/admin-masters.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  connections = [];
  currentUser: any;
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private rest: RestService,private auth: AuthService,private adminmaster: AdminMastersService,private _location: Location) { }

  ngOnInit() {
    this.spinnerService.show();
this.currentUser = this.auth.getCurrentUser();
if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_ADMIN")
    {
        this.router.navigate(['/login']);

    }

    this.adminmaster.getAllTransaction().subscribe((data) => {
      console.log(data);
      this.connections = [];
      for(let i=0;i< data.length;i++)
      {
        let connData:any = {};

        let serviceId = data[i].serviceId;
        let userId = data[i].userId;
        let providerId = data[i].providerSelected;
        if(data[i].transactionDate)
        {
        let d = new Date(data[i].transactionDate).toString().slice(0,10);
        connData.transactionDate = d;
        }
        // let tdate = data[i].transactionDate;
      
        
        // get the user details
        this.rest.getUserInfo(userId).subscribe(userData => {
          console.log(userData);
          connData.userfirstName = userData.firstName;
          connData.userlastName = userData.lastName;
          //get the lawyer details
          this.rest.getUserInfo(providerId).subscribe(lawyerData => {
            console.log(lawyerData);
            connData.lawyerfirstName = lawyerData.firstName;
            connData.lawyerlastName = lawyerData.lastName;
  
              // get the service data
                this.rest.getServiceDetails(serviceId).subscribe(serviceData => {
                  console.log(serviceData);
                  connData.serviceName = serviceData.displayName;
                  connData.details = data[i];
                  this.connections.push(connData);
                  console.log(this.connections);
                }, error => {
                  console.log("Unable to get service data");
                });
          },
            error => {
              console.log("Unable to get lawyer data");
            });

        
        }, error => {
          console.log("Unable to get user data");
        });

        

      }
    
    });  
  }

  GoToConnectionDetails(item){
    let obj: any = {};
    obj.providerId = item.details.providerSelected;
    obj.userId = item.details.userId;
    obj.transactionId = item.details.id;
    this.router.navigate(['/connections-details'],{ queryParams: obj });

  }
  goToBack()
  {
    this._location.back();

  }
}


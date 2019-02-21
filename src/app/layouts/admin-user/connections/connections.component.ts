import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  connections = [];
  connectionsfilter:any = [];
  currentUser: any;
  searchText;
  filterForm: FormGroup;
  showTable: boolean = true;
  p: number = 1;

  constructor(private _formBuilder: FormBuilder,private spinnerService: Ng4LoadingSpinnerService,private router: Router,private rest: RestService,private auth: AuthService) { }

  ngOnInit() {
    this.filterForm = this._formBuilder.group({
      service: [null,Validators.required]
    });
    this.spinnerService.show();
this.currentUser = this.auth.getCurrentUser();
if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_USER")
    {
        this.router.navigate(['/login']);

    }
    this.rest.getAvailService(this.currentUser.id).subscribe((data) => {
      console.log(data);
      // this.spinnerService.hide();

      for(let i=0; i <data.length;i++){
        let connection:any = {};
       

      this.rest.getTransaction(data[i].servicesTransactionId).subscribe((x) => {
        console.log(x);
        connection.providerId = data[i].providerId;
        connection.transactionId = data[i].servicesTransactionId;
        //connection.transactionDate = x.transactionDate;
        console.log(x.transactionDate);
        if(x.transactionDate)
        {
        let d = new Date(x.transactionDate).toString().slice(0,10);
        connection.transactionDate = d;
        }
        this.rest.getUserInfo(data[i].providerId).subscribe((y) => {
          console.log(y);
          connection.firstName = y.firstName;
          connection.lastName = y.lastName;
          this.rest.getServiceDetails(data[i].serviceId).subscribe((z) => {
            console.log(z);
            connection.name = z.displayName;
            connection.details = data[i];
            console.log(connection);
            this.connections.push(connection);
            this.connectionsfilter.push(connection);
            this.spinnerService.hide();
            // this.connections = data;
          });
          // this.connections = data;
        });
        // this.connections = data;
      });

     

      
    }
      // this.connections = data;
    });
  
    
  }

  GoToLawyerDetails(item){
    let obj: any = {};
    obj.providerId = item.providerId;
    obj.transactionId = item.transactionId;
    this.router.navigate(['/lawyer-details'],{ queryParams: obj });

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
    this.showTable = true;
}
}

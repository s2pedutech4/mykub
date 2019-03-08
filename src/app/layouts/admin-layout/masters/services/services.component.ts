import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RestService } from '../../../../rest.service';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  connections: Array<any> = [];
  p : number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private rest: RestService,private _location: Location,private dialog: MatDialog) {  
  }

  ngOnInit() {
    this.adminmaster.getAllServices_Basic().subscribe((data) => {
      console.log(data);
      this.connections = data;
     
    });
  }

  AddService()
  {
    this.router.navigate(['/service-add']);

  }
  GoToServiceDetails(item)
  {
    this.router.navigate(['/service-add'],{ queryParams: item });

  }
  delete(item){
    
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '250px',
    data: {title: "Delete", message: "Are you sure you want to delete service " + item.servicesBasicInfo.name + " ? "},
    panelClass: 'myapp-no-padding-dialog'
  
  });
  
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if(result === "Delete")
    {
      this.adminmaster.deleteServices(item.serviceId).subscribe((data) => {
        console.log(data);
        this.adminmaster.getAllServices_Basic().subscribe((data) => {
          console.log(data);
          this.connections = data;
         
        });
    });
  
    }
  });
   }

   goToBack()
   {
     this._location.back();
   
   }
}

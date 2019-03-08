import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.scss']
})
export class ServiceTypeComponent implements OnInit {
  servicetypes = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,private dialog: MatDialog) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllService_types().subscribe((data) => {
      console.log(data);
      this.servicetypes = data;
      this.spinnerService.hide();
  });
}

  
AddService_type(){
   this.router.navigate(['/service-type-add']);
  }
  EditService_type(item){
    this.router.navigate(['/service-type-add'],{ queryParams: item });
   }
   delete(item){
   
   
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '250px',
    data: {title: "Delete", message: "Are you sure you want to delete service type " + item.type + " ? "},
    panelClass: 'myapp-no-padding-dialog'
  
  });
  
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if(result === "Delete")
    {
      this.adminmaster.deleteService_type(item.id).subscribe((data) => {
        console.log(data);
        this.adminmaster.getAllService_types().subscribe((data) => {
          console.log(data);
          this.servicetypes = data;
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



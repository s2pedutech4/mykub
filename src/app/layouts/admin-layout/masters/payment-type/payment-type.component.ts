import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  paymenttypes = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,private dialog: MatDialog) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllPayment_types().subscribe((data) => {
      console.log(data);
      this.paymenttypes = data;
      this.spinnerService.hide();
  });
}

goToBack()
{
  this._location.back();

}
  
AddPayment_type(){
   this.router.navigate(['/payment-type-add']);
  }
  EditPayment_type(item){
    this.router.navigate(['/payment-type-add'],{ queryParams: item });
   }
   delete(item){
   
   
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '250px',
    data: {title: "Delete", message: "Are you sure you want to delete payment type " + item.type + " ? "},
    panelClass: 'myapp-no-padding-dialog'
  
  });
  
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if(result === "Delete")
    {
      this.adminmaster.deletePayment_type(item.id).subscribe((data) => {
        console.log(data);
        this.adminmaster.getAllPayment_types().subscribe((data) => {
          console.log(data);
          this.paymenttypes = data;
      });
    });
  
    }
  });
   }
  

}



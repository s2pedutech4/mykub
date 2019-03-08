import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  banks = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,public dialog: MatDialog) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllBanks().subscribe((data) => {
      console.log(data);
      this.banks = data;
      this.spinnerService.hide();
  });
}
AddBank(){
	this.router.navigate(['bank-add']);

}

editBank(item){
  this.router.navigate(['/bank-add'],{ queryParams: item });
 }
 deleteBank(item){
  
const dialogRef = this.dialog.open(PopupComponent, {
  width: '250px',
  data: {title: "Delete", message: "Are you sure you want to delete bank " + item.bankName + " ? "},
  panelClass: 'myapp-no-padding-dialog'

});


dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result);
  if(result === "Delete")
  {
    this.adminmaster.deleteBank(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllBanks().subscribe((data) => {
        console.log(data);
        this.banks = data;
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

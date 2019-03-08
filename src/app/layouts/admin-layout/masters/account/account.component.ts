import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
import { CustomSnackbarComponent } from '../../../../custom-snackbar/custom-snackbar.component';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
accounts = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllAccounts().subscribe((data) => {
      console.log(data);
      this.accounts = data;
      this.spinnerService.hide();
  });
}

  
  AddAccount(){
   this.router.navigate(['/account-add']);
  }
  EditAccount(item){
    this.router.navigate(['/account-add'],{ queryParams: item });
   }
   delete(item){

    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: {title: "Delete", message: "Are you sure you want to delete account " + item.name + " ? "},
      panelClass: 'myapp-no-padding-dialog'

    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result === "Delete")
      {
        this.adminmaster.deleteAccount(item.id).subscribe((data) => {
          console.log(data);
          this.adminmaster.getAllAccounts().subscribe((data) => {
            console.log(data);
            this.accounts = data;
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



import { Component, OnInit,ViewChild,VERSION} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../../rest.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { DialogOverviewExampleDialogComponent } from '../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../snackbar/snackbar.component';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  changePassForm: FormGroup;
  cnfrmpass: boolean = false;
  userData: any = {};
  constructor(private _formBuilder: FormBuilder,private rest: RestService,private auth: AuthService,private router: Router,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userData = this.auth.getCurrentUser();
    console.log(this.userData);
    this.changePassForm = this._formBuilder.group({
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        cnfrmpass: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        


    });
  }
  checkPass()
  {
    let a = this.changePassForm.controls.pass.value;
    let b = this.changePassForm.controls.cnfrmpass.value;
    if(a === b)
    {
      this.cnfrmpass = true;
    }
    else{
      this.cnfrmpass = false;
    }
  
  }
  updatePaswword()
  {
    this.userData.password = this.changePassForm.controls.cnfrmpass.value;
    this.auth.updateUserById(this.userData).subscribe(resp =>{
      console.log(resp);
      // const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      //   width: '250px',
      //   data: {title: "Success", message: "Password changed Successfully! "},
      //   panelClass: 'myapp-no-padding-dialog'
    
      // });
    
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.router.navigate(['/lawyer-profile']);
      // });
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.router.navigate(['/lawyer-profile']);
    }); 
  }
  goToBack()
  {
    this._location.back();
  
  }
}

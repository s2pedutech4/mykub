import { Component, OnInit,ViewChild,VERSION} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../../rest.service';
// import { NotificationsComponent } from '../../../notifications/notifications.component';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { DialogOverviewExampleDialogComponent } from '../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { SnackbarComponent } from '../../../snackbar/snackbar.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { NotificationsComponent } from '../../../notifications/notifications.component';
declare var $: any;
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  personalForm: FormGroup;
  userData: any;
  constructor(private _formBuilder: FormBuilder,private rest: RestService,private auth: AuthService,private router: Router,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit() {
   this.userData = this.auth.getCurrentUser();
   
    this.personalForm = this._formBuilder.group({
      id:[],
      firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
          mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          role : ['ROLE_USER']


    });
    this.personalForm.patchValue(this.userData);
  }
  updateUser()
  {
    this.auth.updateUserById(this.personalForm.value).subscribe(resp =>{
      console.log(resp);
      this.auth.setCurrentUser(this.personalForm.value);
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
     
      this.router.navigate(['/user-dashboard']);
      //  const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      //   width: '250px',
      //   data: {title: "Success", message: "Your Profile Updated Successfully! "},
      //   panelClass: 'myapp-no-padding-dialog'
    
      // });
    
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   
      // });
    });

  }
  
  showNotification(from, align,message){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}

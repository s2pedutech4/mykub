import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { RestService } from '../rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams, HttpResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  timeLeft: number = 60;
  interval;
  username: string = " ";
  password: string =" ";
  showForgetPass: boolean = true;
  showOtp: boolean = false;
  showpass: boolean = false;
  cnfrmpass: boolean = false;
  showmobile: boolean = false;
  emailForm: FormGroup;
  mobileForm: FormGroup;
  otpForm: FormGroup;
  passForm: FormGroup;
  submitted = false;
  useremailExists: boolean = true;
  usermobileExists: boolean = true;
  userData: any;
    currentUser: any;
    providerId: any;
    serviceId: any;
    allData: any = [];
  constructor(
      private formBuilder: FormBuilder,
      private spinnerService: Ng4LoadingSpinnerService,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private rest: RestService,public dialog: MatDialog,@Inject(LOCAL_STORAGE) private storage: WebStorageService,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.rest.getAll().subscribe(resp =>{
      console.log(resp);
      this.allData = resp;
    });

    this.route.queryParams.subscribe(params => {
     console.log(params);
     if(params.hasOwnProperty('providerSelected'))
     {
      this.providerId = params.providerSelected;
      this.serviceId = params.serviceId;
     }
     else{
       this.providerId = null;
       this.serviceId = null;
     }

    });

      this.emailForm = this.formBuilder.group({
        emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])]
      });

      this.mobileForm = this.formBuilder.group({
        mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])]
      });
      this.otpForm = this.formBuilder.group({
        otp: ['',{validators:[Validators.required, Validators.minLength(4),Validators.maxLength(4)]}]
        
      });
      this.passForm = this.formBuilder.group({
        pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        cnfrmpass: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      // reset login status
      // this.authenticationService.logout();

      // // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkUserEmail()
  {
    let bname = this.emailForm.controls.emailId.value;
    let b = this.allData.find(x => {
        if(x.emailId === bname)
          return x;
    });
    if(b != null)
      this.useremailExists = true;
    else
      this.useremailExists = false;
  }
  checkUserMobile()
  {
    let bname = this.mobileForm.controls.mobileNum.value;
    let b = this.allData.find(x => {
        if(x.mobileNum === bname)
          return x;
    });
    if(b != null)
      this.usermobileExists = true;
    else
      this.usermobileExists = false;
  }
  onmobileFormSubmit() {
console.log(this.mobileForm.value);
this.showForgetPass = false;
      this.showOtp = true ;
this.auth.sendOTP(this.mobileForm.controls.mobileNum.value).subscribe(resp =>{
  
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
          this.storage.set('otp',null);
          clearInterval(this.interval);
        }
      },1000)
});


}

onemailFormSubmit()
{
  this.showForgetPass = false;
      this.showOtp = true ;
  var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
  this.storage.set('otp',val);
  console.log(this.storage.get('otp'));
      let senderEmailId = this.emailForm.controls.emailId.value
      let subject = "KUBER: OTP";
      let msg = "We have initiated your password change request. Your OTP is ";
      msg += val;
      // msg += data.firstName + " " + data.lastName;
      this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
        console.log(response);
        
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
          this.storage.set('otp',null);
          clearInterval(this.interval);
        }
      },1000)
      });
      
}
onOtpSubmit()
{
 

  
  let otp = this.storage.get('otp');
  // let obj = this.storage.get("userdata");
  console.log(otp);
  // console.log(obj);
  // let o:any = JSON.parse(obj);
  // console.log(o);
  if(this.otpForm.controls.otp.value == otp)
  {
    console.log("OTP Validated");
    this.showOtp = false;
    this.showpass = true;
    if(this.showmobile)
    {
      this.auth.getUserByMobile(this.mobileForm.controls.mobileNum.value).subscribe(data => {
        console.log(data);
        this.userData = data;
      });
    }
    else{
      this.auth.getUserByEmail(this.emailForm.controls.emailId.value).subscribe(data => {
        console.log(data);
        this.userData = data;
      });
    }
  }
  else
  {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 3000,
      data: 'Incorrect OTP'
    });
  } 
}
  onPassSubmit()
  {
    this.userData.password = this.passForm.controls.cnfrmpass.value;
    this.auth.updateUserById(this.userData).subscribe(resp =>{
      console.log(resp);
      // const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      //   width: '250px',
      //   data: {title: "Success", message: "Password changed Successfully! "},
      //   panelClass: 'myapp-no-padding-dialog'
    
      // });
    
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.router.navigate(['/login']);
      // });
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        duration: 3000,
        data: 'Password changed Successfully'
      });
      this.router.navigate(['/login']);
    });
  }

  resendOtp()
 {
  this.otpForm.reset();
  clearInterval(this.interval);
  if(this.showmobile)
{
  this.auth.sendOTP(this.mobileForm.controls.mobileNum.value).subscribe(resp =>{
    console.log(resp);
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 60;
        this.storage.set('otp',null);
        clearInterval(this.interval);
      }
    },1000)
  });
  console.log();
}
else{
  var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val);
  this.storage.set('otp',val);
  console.log(this.storage.get('otp'));
      let senderEmailId = this.emailForm.controls.emailId.value
      let subject = "KUBER: OTP";
      let msg = "We have initiated your password change request. Your OTP is ";
      msg += val;
      // msg += data.firstName + " " + data.lastName;
      this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
        console.log(response);
        this.showForgetPass = false;
      this.showOtp = true ;
      this.timeLeft = 60;
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          // this.timeLeft = 60;
          this.storage.set('otp',null);
          clearInterval(this.interval);
        }
      },1000)
      });
}
 }


checkPass()
{
  let a = this.passForm.controls.pass.value;
  let b = this.passForm.controls.cnfrmpass.value;
  if(a === b)
  {
    this.cnfrmpass = true;
  }
  else{
    this.cnfrmpass = false;
  }

}
checkValid() {
  if(this.passForm.get('emailId').valid || this.passForm.get('mobileNum').valid) {
    return false;
  } else {
    return true;
  }
}

showEmailForm()
{
  this.showmobile = false;
}
showMobileForm()
{
  this.showmobile = true;

}
}

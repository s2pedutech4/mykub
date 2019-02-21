import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup = new FormGroup({
    otp: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(4)])
  });
  obj: any = {};
  timeLeft: number = 60;
  interval;
  constructor(private route: ActivatedRoute, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,private auth: AuthService,public dialog: MatDialog ) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 60;
        this.storage.set('otp',null);
        clearInterval(this.interval);
      }
    },1000)

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.obj.providerSelected = params.providerSelected;
      this.obj.serviceId = params.serviceId;
    });
  }

  onSubmit()
  {
    let otp = this.storage.get('otp');
    let obj = this.storage.get("userdata");
    console.log(otp);
    console.log(obj);
    let o:any = JSON.parse(obj);
    console.log(o);
    if(this.otpForm.controls.otp.value == otp)
    {
      console.log("OTP Validated");
    
    this.auth.Register(o)
    .pipe(first())
        .subscribe(
            data => {
              //this.spinnerService.hide();
             console.log(data);
             this.auth.verifyUser(data.id)
             .pipe(first())
                 .subscribe(
                     data => {
                       console.log(data);
                      this.router.navigate(['/login'],{ "queryParams":this.obj });

                     });

              
              
            },
            error => {
              console.log("error");
               
            });
    }
    else
{
  const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
    width: '250px',
    data: {title: "Error", message: "Incorrect OTP! "},
    panelClass: 'myapp-no-padding-dialog'

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
} 
 }
 resendOtp()
 {
  this.otpForm.reset();
  clearInterval(this.interval);
  let obj = this.storage.get("userdata");
  let o:any = JSON.parse(obj);
  this.auth.sendOTP(o.mobileNum).subscribe(resp =>{
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
}

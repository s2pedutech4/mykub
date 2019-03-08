import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import { first } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerdata: any;
  userid: any;
  navigationpath: any;
UserRegisterForm: FormGroup;
LawyerRegisterForm: FormGroup;
LawFirmRegisterForm: FormGroup;
  loading = false;
  usersubmitted = false;
  userform = false;
  lawyerform = false;
  lawfirmform = false;
  lawfirmsubmitted = false;
  lawyersubmitted = false;
  allData: any = [];
  useremailExists: boolean = false;
  usermobileExists: boolean = false;
  userNameExists: boolean = false;
  lawyeremailExists: boolean = false;
  lawyermobileExists: boolean = false;
  lawyerNameExists: boolean = false;
  firmemailExists: boolean = false;
  firmmobileExists: boolean = false;
  firmNameExists: boolean = false;
  transactionDetails:any = {};
  cnfrmUserPassword: string = '';
  cnfrmLawyerPassword: string = '';
  cnfrmFirmPassword: string = '';
   endpoint = 'http://52f32a78.ngrok.io/kuber/rest/user/register';
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
providerId: any;
serviceId: any;
 obj: any = {};
myparams: any = {};
errorcnfrmuserpass: boolean = false;
errorcnfrmlwyerpass: boolean = false;
errorcnfrmfirmpass: boolean = false;

  constructor(private spinnerService: Ng4LoadingSpinnerService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private route: ActivatedRoute,private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private auth: AuthService, private rest:RestService) {

      //   this.route.queryParams.subscribe(params => {
      //   //   this.transactionDetails = params;
      //   //  console.log(this.transactionDetails);
      //   //  this.userid = this.transactionDetails.providerSelected;
      //   //   console.log(this.userid);
      //   this.providerId = params.providerSelected;
      //   });
        
       }

  ngOnInit() {
    this.spinnerService.hide();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.myparams = params;
      this.providerId = params.providerSelected;
      this.serviceId = params.serviceId;
      this.obj.providerSelected = this.providerId;
      this.obj.serviceId = this.serviceId;
    });

      this.UserRegisterForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
          mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
          username: ['', Validators.required],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          role : ['ROLE_USER']
      });
      this.LawyerRegisterForm = this.formBuilder.group({
        firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
          mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
          username: ['', Validators.required],
          password: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
          role : ['ROLE_LAWYER']
    });
    this.LawFirmRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
      mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      role : ['ROLE_FIRM']
    });
    this.rest.getAll().subscribe(resp =>{
      console.log(resp);
      this.allData = resp;
    });
  }

  // convenience getter for easy access to form fields
  get f1() { return this.UserRegisterForm.controls; }
  get f2() { return this.LawyerRegisterForm.controls; }
  get f3() { return this.LawFirmRegisterForm.controls; }

//   onSubmit() {
//       this.submitted = true;
//       this.router.navigateByUrl('/login');

     
//   }
checkUserPass()
{
  let a = this.UserRegisterForm.controls.password.value;
  let b = this.cnfrmUserPassword;
  console.log(this.cnfrmUserPassword);
  if(a === b)
  {
    this.errorcnfrmuserpass = false;
  }
  else{
    this.errorcnfrmuserpass = true;
  }

}
checkLawyerPass()
{
  let a = this.LawyerRegisterForm.controls.password.value;
  let b = this.cnfrmLawyerPassword;
  // console.log(this.cnfrmUserPassword);
  if(a === b)
  {
    this.errorcnfrmlwyerpass = false;
  }
  else{
    this.errorcnfrmlwyerpass = true;
  }

}
checkFirmPass()
{
  let a = this.LawFirmRegisterForm.controls.password.value;
  let b = this.cnfrmFirmPassword;
  // console.log(this.cnfrmUserPassword);
  if(a === b)
  {
    this.errorcnfrmfirmpass = false;
  }
  else{
    this.errorcnfrmfirmpass = true;
  }

}
onUserSubmit() {

    this.spinnerService.show();
// console.log(this.UserRegisterForm.value);
    this.usersubmitted = true;

    var otp = "123456";
    console.log("Sending sms to " + this.UserRegisterForm.controls.mobileNum.value);
    this.auth.sendOTP(this.UserRegisterForm.controls.mobileNum.value).subscribe(resp =>{
      console.log(resp);
      this.storage.set("userdata",JSON.stringify(this.UserRegisterForm.value));
      this.router.navigate(['/otp'], {"queryParams":this.obj});
    });



/*
    this.loading = true;
    this.auth.Register(this.UserRegisterForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.spinnerService.hide();
             
              this.router.navigate(['/login'],{ "queryParams":this.obj });

              
              
            },
            error => {
              console.log("error");
               
            });

      */     
          
}




GotoLogin(){
  this.router.navigateByUrl('/login');

}
onLawyerSubmit(){

  // send sms to the user using mobile number
  var otpurl = "http://sms.smsmob.in/api/mt/SendSMS?user=s2pedutech&password=s2p@321&senderid=WEBSMS&channel=Trans&DCS=0&flashsms=0&number=";
  otpurl += this.LawyerRegisterForm.controls.mobileNum.value;
  otpurl += "&text=test message&route=8";
  
    // save the otp and user form details

    // navigate to otp page 

    // verify otp

    // register

  this.lawyersubmitted = true;
  this.spinnerService.show();

  var otp = "123456";
    console.log("Sending sms to " + this.LawyerRegisterForm.controls.mobileNum.value);
    this.auth.sendOTP(this.LawyerRegisterForm.controls.mobileNum.value).subscribe(resp =>{
      console.log(resp);
      this.storage.set("userdata",JSON.stringify(this.LawyerRegisterForm.value));
      this.router.navigate(['/otp'], {"queryParams":this.obj});
    });
    // this.auth.Register(this.LawyerRegisterForm.value)
    // .pipe(first())
    // .subscribe(
    //     data => {
    //       this.spinnerService.hide();
    //       if(isEmpty(this.userid)){
    //         this.router.navigate(['/login']);
    //       }
    //       else
    //       this.router.navigate(['/profile'],{"queryParams": this.userid});
    //     },
    //     error => {
    //       console.log("error");
            
    //     });
  

}
onLawfirmSubmit(){
  this.lawfirmsubmitted = true;
  this.spinnerService.show();
  var otp = "123456";
  console.log("Sending sms to " + this.LawFirmRegisterForm.controls.mobileNum.value);
  this.auth.sendOTP(this.LawFirmRegisterForm.controls.mobileNum.value).subscribe(resp =>{
    console.log(resp);
    this.storage.set("userdata",JSON.stringify(this.LawFirmRegisterForm.value));
    this.router.navigate(['/otp'], {"queryParams":this.obj});
  });
  
  // stop here if form is invalid
  // if (this.LawFirmRegisterForm.invalid) {
  //     return;
  // } 
  // else{
  //   this.auth.Register(this.LawFirmRegisterForm.value)
  //   .pipe(first())
  //   .subscribe(
  //       data => {
  //         this.spinnerService.hide();
  //         if(isEmpty(this.userid)){
  //           this.router.navigate(['/login']);
  //         }
  //         else
  //         this.router.navigate(['/profile'],{"queryParams": this.userid});
  //       },
  //       error => {
  //         console.log("error");
  //           // this.alert.error(error);
  //           // this.loading = false;
  //       });
  // }
  
}
  Cancel(){
    this.router.navigateByUrl('/start');


  }
  checkUserEmail()
  {
    let bname = this.UserRegisterForm.controls.emailId.value;
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
    let bname = this.UserRegisterForm.controls.mobileNum.value;
    let b = this.allData.find(x => {
        if(x.mobileNum === bname)
          return x;
    });
    if(b != null)
      this.usermobileExists = true;
    else
      this.usermobileExists = false;
  }
  checkUserName()
  {
    let bname = this.UserRegisterForm.controls.username.value;
    let b = this.allData.find(x => {
        if(x.username === bname)
          return x;
    });
    if(b != null)
      this.userNameExists = true;
    else
      this.userNameExists = false;
  }

  checkLawyerEmail()
  {
    let bname = this.LawyerRegisterForm.controls.emailId.value;
    let b = this.allData.find(x => {
        if(x.emailId === bname)
          return x;
    });
    if(b != null)
      this.lawyeremailExists = true;
    else
      this.lawyeremailExists = false;
  }
  checkLawyerMobile()
  {
    let bname = this.LawyerRegisterForm.controls.mobileNum.value;
    let b = this.allData.find(x => {
        if(x.mobileNum === bname)
          return x;
    });
    if(b != null)
      this.lawyermobileExists = true;
    else
      this.lawyermobileExists = false;
  }
  checkLawyerName()
  {
    let bname = this.LawyerRegisterForm.controls.username.value;
    let b = this.allData.find(x => {
        if(x.username === bname)
          return x;
    });
    if(b != null)
      this.lawyerNameExists = true;
    else
      this.lawyerNameExists = false;
  }

  checkFirmEmail()
  {
    let bname = this.LawFirmRegisterForm.controls.emailId.value;
    let b = this.allData.find(x => {
        if(x.emailId === bname)
          return x;
    });
    if(b != null)
      this.firmemailExists = true;
    else
      this.firmemailExists = false;
  }
  checkFirmMobile()
  {
    let bname = this.LawFirmRegisterForm.controls.mobileNum.value;
    let b = this.allData.find(x => {
        if(x.mobileNum === bname)
          return x;
    });
    if(b != null)
      this.firmmobileExists = true;
    else
      this.firmmobileExists = false;
  }
  checkFirmName()
  {
    let bname = this.LawFirmRegisterForm.controls.username.value;
    let b = this.allData.find(x => {
        if(x.username === bname)
          return x;
    });
    if(b != null)
      this.firmNameExists = true;
    else
      this.firmNameExists = false;
  }

}

export const isEmpty = (obj) => {
  return obj === null || undefined
      ? true
      : (() => {
              for (const prop in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                      return false;
                  }
              }
              return true;
          })();
  };
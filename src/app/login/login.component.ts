import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { RestService } from '../rest.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams, HttpResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = " ";
  password: string =" ";

  loginForm: FormGroup;
    submitted = false;
    currentUser: any;
    providerId: any;
    serviceId: any;
  constructor(
      private formBuilder: FormBuilder,
      private spinnerService: Ng4LoadingSpinnerService,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private rest: RestService,public dialog: MatDialog) {}

  ngOnInit() {
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

      this.loginForm = this.formBuilder.group({
        username: ['', {validators:[Validators.required], updateOn: 'change'}],
          password: ['', {validators:[Validators.required], updateOn: 'change'}]
      });

      // reset login status
      // this.authenticationService.logout();

      // // get return url from route parameters or default to '/'
      // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.router.navigateByUrl('/dashboard');

      
  // }
  onSubmit() {
    this.submitted = true;
    this.spinnerService.show();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    } 
    else{
      if(this.providerId == null)
      {
        this.Login();
      }
      else{
        this.LoginOnConnect();
      }
    }
}
Login()
{

console.log(this.loginForm.value);
console.log("Login called");
  this.auth.Login(this.loginForm.value)
  .pipe(first())
  .subscribe(
    data => {
          // this.alert.success('Registration successful', true);
          
          console.log(data);
          if(data.status === 403 || data.status === 500)
          {
            this.loginForm.reset();
            this.spinnerService.hide();

            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
              width: '250px',
              data: {title: "Error", message: "Login Unsuccessful! "},
              panelClass: 'myapp-no-padding-dialog'

            });
        
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          
          }
          else{
          console.log(data.headers.keys());
          let h:HttpHeaders = data.headers;
          console.log(h.get('Authorization'));
          
              this.auth.setAuthToken(h.get('Authorization'));
              this.rest.setAuthToken(h.get('Authorization'));

          this.auth.getUserByName(this.loginForm.controls.username.value).pipe(first()).subscribe(
            success => {
              console.log(success);
              this.auth.setCurrentUser(success);
              
              this.currentUser = this.auth.getCurrentUser();

              if(success.role === "ROLE_ADMIN")
              this.router.navigateByUrl('/dashboard');
              else if(success.role === "ROLE_USER")
              this.router.navigateByUrl('/user-dashboard');
              else if(success.role === "ROLE_LAWYER" || success.role === "ROLE_LAWFIRM" )
              this.router.navigateByUrl('/lawyer-dashboard');
              this.spinnerService.hide();

            },
            error => {
              console.log(error);
              // this.spinnerService.hide();

            }
          );

         
      }
    },
      error => {
        console.log("error");
      });
}

LoginOnConnect()
{
  console.log(this.loginForm.value);
  console.log("LoginOnConnect called");
  this.auth.Login(this.loginForm.value)
      .pipe(first())
      .subscribe(
          data => {
              // this.alert.success('Registration successful', true);
              console.log(data);
              if(data.status === 403 || data.status === 500)
              {
                this.spinnerService.hide();
    
                const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                  width: '250px',
                  data: {title: "Error", message: "Login Unsuccessful! "},
                  panelClass: 'myapp-no-padding-dialog'

                });
            
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                });
              
              }
              else{
               
              let h:HttpHeaders = data.headers;
              console.log(h.get('Authorization'));
              
                  this.auth.setAuthToken(h.get('Authorization'));
                  this.rest.setAuthToken(h.get('Authorization'));

              this.auth.getUserByName(this.loginForm.controls.username.value).pipe(first()).subscribe(
                success => {
                  console.log(success);
                  this.auth.setCurrentUser(success);
                  this.currentUser = this.auth.getCurrentUser();

                  if(success.role === "ROLE_LAWYER" || success.role === "ROLE_LAWFIRM" )
                  this.router.navigateByUrl('/lawyer-dashboard');
                  else if(success.role === "ROLE_ADMIN")
                  this.router.navigateByUrl('/dashboard');
                else{
                  var obj: any = {};
                  obj.providerSelected = this.providerId;
                  obj.serviceId = this.serviceId;
                  obj.userId = this.auth.getCurrentUser().id;
                  
                  console.log(obj);
                  this.rest.getAllServices().subscribe((z) => {
                    console.log(z);
                    // console.log(z[1].serviceId + "-" + this.serviceId);
                    let service: any = {};
                   service = z.find(item =>
                      item.serviceId.toString() === this.serviceId
                    
                      );
                    // service = z.find(item => item.serviceId === this.serviceId);

                    console.log(service);
                    if(this.serviceId != 1 && service.servicesPaymentInfo.fees > 0)
                    {
                      // obj.providerId = this.providerId;
                      obj.fees = service.servicesPaymentInfo.fees;
                      this.router.navigate(['/payment-lawyer'],{"queryParams": obj});

                    }
                    else
                    {
                      this.rest.setTransaction(obj).pipe(first()).subscribe(
                        data => {
                          console.log(data);
                          this.rest.getUserInfo(this.providerId).subscribe(data =>{
                            console.log(data);
                            let senderEmailId = data.emailId; 
                            let subject = "KUBER: New Connection";
                            let msg = "A new connection for a service ";
                            msg += " is created with the lawyer ";
                            msg += data.firstName + " " + data.lastName;
                            this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
                              console.log(response);
                            });
                  
                          });
                          // navigate to dashboard profile with lawyerid
                          // console.log(this.currentUser.id);
                          obj.providerId = this.providerId;
                          obj.transactionId = data.id;
                          console.log(obj);
                          this.router.navigate(['/lawyer-details'],{"queryParams": obj});
                          this.spinnerService.hide();
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }
                  });
                }
              
                },
                error => {
                  console.log(error);
                }
              );
              
  
              
            }
            },
          error => {
            this.spinnerService.hide();
            console.log("error");
              // this.alert.error(error);
              // this.loading = false;
          });
}
GotoSignup()
{
  let obj: any = {};
  obj.providerSelected = this.providerId;
  obj.serviceId = this.serviceId;
  this.router.navigate(['/signup'],{ "queryParams":obj });

}

checkUsername()
{
  let a = this.loginForm.controls.username.value;
  console.log(a);
  if(a === null || a === "")
  {
    this.checkUser = true;
  }
  else
  {
    this.checkUser = false;
  }
}

checkUser:boolean = false;
}

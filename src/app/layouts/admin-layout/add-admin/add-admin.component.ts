import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  data : any;
  title : string;

  firstName: string = " ";
  lastName: string =" ";
  email: string = " ";
  mobile: string =" ";
  registerForm: FormGroup;
    submitted = false;
 
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private routeback: Router) { 
  
   this.route.queryParams.subscribe(params => {
        this.data = params;
        
            console.log(params);
            if(params){
              this.title = "Edit";
            }
            //this.isAddPage = (params === undefined || params === null || Object.keys(params).length === 0);
            
        });
        if(isEmpty(this.data)){
            this.title = "Add";
        }
        else{
            this.title = "Edit";
        }
  // this.data = {
  //   firstName : "faisal",
  //   lastName : "amdani",
  //   email : "asad@cdc.com",
  //   password : "ds"

  // }
        
  
  }
 
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.minLength(10)]]
        });
    }
 
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
 
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } 
 }
//  public setName(value:string) {
//   console.log(value); // will output "chicken"
// }
 Cancel(){
  this.routeback.navigateByUrl('/service');

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
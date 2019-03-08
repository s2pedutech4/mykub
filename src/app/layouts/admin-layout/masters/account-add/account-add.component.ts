import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DialogOverviewExampleDialogComponent } from '../../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../../snackbar/snackbar.component';
@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  accounts = [];
  accountForm: FormGroup;
  accountExists:boolean = false;
  submitted =  false;
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required]
    });
  this.route.queryParams.subscribe(params => {
    // this.data = params;

        console.log(params);   
        if(params.hasOwnProperty('id'))
        {
          this.accountForm.patchValue(params); 
        }
              
    });

    // get all accounts and check if the name already exists
    this.adminmaster.getAllAccounts().subscribe((data) => {
      //console.log(data);
      this.accounts = data;
  });
  }
  get f() { return this.accountForm.controls; }

  onSubmit(){
    this.submitted = true;
  console.log(this.accountForm.value)
  this.adminmaster.addAccount(this.accountForm.value).subscribe((z) => {
    console.log(z);
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
    //   width: '250px',
    //   data: {title: "Success", message: "Account has been updated! "},
    //   panelClass: 'myapp-no-padding-dialog'
  
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.router.navigate(['account']);

    // });
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
    });
    this.router.navigate(['account']);
  });
  
  }
  
  Cancel(){
    this.router.navigate(['account']);

  }

  checkAccount()
  {
    console.log(this.accountForm.controls.name.value);
    // check if the account exists in db, if yes, display error msg
    
    let aname = this.accountForm.controls.name.value;
    let item = this.accounts.find((x) => {
        if(aname === x.name)
          return x;
    });
    if(item != null)
      this.accountExists = true;
    else
      this.accountExists = false;
  }
  
  goToBack()
  {
    this._location.back();

  }


}

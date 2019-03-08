import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogOverviewExampleDialogComponent } from '../../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { SnackbarComponent } from '../../../../snackbar/snackbar.component';
@Component({
  selector: 'app-service-type-add',
  templateUrl: './service-type-add.component.html',
  styleUrls: ['./service-type-add.component.scss']
})
export class ServiceTypeAddComponent implements OnInit {
  service_type_Form:FormGroup
  sTypeExists:boolean = false;
  servicetypes = [];
  submitted = false;
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { }

   ngOnInit() {
   
    this.service_type_Form = this.formBuilder.group({
      id: null,
      type: ['', Validators.required],
     
    });

    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);   
          if(params.hasOwnProperty('id'))
          {
            this.service_type_Form.patchValue(params); 
          }
                
      });
      
      this.adminmaster.getAllService_types().subscribe((data) => {
        console.log(data);
        this.servicetypes = data;
        
    });
    }
    get f() { return this.service_type_Form.controls; }

    onSubmit(){
      this.submitted =true;
    console.log(this.service_type_Form.value)
    this.adminmaster.addService_type(this.service_type_Form.value).subscribe((z) => {
      console.log(z);
      // const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      //   width: '250px',
      //   data: {title: "Success", message: "Service Type has been updated! "},
      //   panelClass: 'myapp-no-padding-dialog'
    
      // });
    
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.router.navigate(['service-type']);
  
      // });
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.router.navigate(['service-type']);
    });
    
    }
    
    Cancel(){
      this.router.navigate(['service-type']);

    }
    checkSType()
    {
      let bname = this.service_type_Form.controls.type.value;
      console.log(this.servicetypes);
      let b = this.servicetypes.find(x => {
          if(x.type === bname)
            return x;
      });
      if(b != null)
        this.sTypeExists = true;
      else
        this.sTypeExists = false;
    }
    goToBack()
  {
    this._location.back();
  
  } 

}

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
  selector: 'app-document-type-add',
  templateUrl: './document-type-add.component.html',
  styleUrls: ['./document-type-add.component.scss']
})
export class DocumentTypeAddComponent implements OnInit {
  document_type_Form:FormGroup
  documenttypes = [];
  submitted = false;
  docTypeExists:boolean = false;
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router,private _location: Location,public dialog: MatDialog,private snackBar: MatSnackBar) { }

   ngOnInit() {
   
    this.document_type_Form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);   
          if(params.hasOwnProperty('id'))
          {
            this.document_type_Form.patchValue(params); 
          }
                
      });
      this.adminmaster.getAllDocument_types().subscribe((data) => {
        console.log(data);
        this.documenttypes = data;
        
    });
    }
    get f() { return this.document_type_Form.controls; }

    
    onSubmit(){
      this.submitted = true;
    console.log(this.document_type_Form.value)
    this.adminmaster.addDocument_type(this.document_type_Form.value).subscribe((z) => {
      console.log(z);
      // const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      //   width: '250px',
      //   data: {title: "Success", message: "Document Type has been updated! "},
      //   panelClass: 'myapp-no-padding-dialog'
    
      // });
    
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.router.navigate(['document-type']);
  
      // });
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3000,
      });
      this.router.navigate(['document-type']);
      

    });
    
    }
    
    Cancel(){
      this.router.navigate(['document-type']);

    }
    
    checkDocType()
  {
    let bname = this.document_type_Form.controls.name.value;
    console.log(this.documenttypes);
    let b = this.documenttypes.find(x => {
        if(x.name === bname)
          return x;
    });
    if(b != null)
      this.docTypeExists = true;
    else
      this.docTypeExists = false;
  }

  goToBack()
  {
    this._location.back();
  
  }
}

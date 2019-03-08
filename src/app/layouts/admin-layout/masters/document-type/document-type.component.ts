import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  documenttypes = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,private dialog: MatDialog ) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllDocument_types().subscribe((data) => {
      console.log(data);
      this.documenttypes = data;
      this.spinnerService.hide();
  });
}

  
AddDocument_type(){
   this.router.navigate(['/document-type-add']);
  }
  EditDocument_type(item){
    this.router.navigate(['/document-type-add'],{ queryParams: item });
   }
   delete(item){
    
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '250px',
    data: {title: "Delete", message: "Are you sure you want to delete document type " + item.name + " ? "},
    panelClass: 'myapp-no-padding-dialog'
  
  });
  
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if(result === "Delete")
    {
      this.adminmaster.deleteDocument_type(item.id).subscribe((data) => {
        console.log(data);
        this.adminmaster.getAllDocument_types().subscribe((data) => {
          console.log(data);
          this.documenttypes = data;
      });
    });
  
    }
  });
   
   }
  
   goToBack()
   {
     this._location.back();
   
   }
}



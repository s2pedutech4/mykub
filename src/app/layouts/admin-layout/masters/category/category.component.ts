import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from '../../../../popup/popup.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categories = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private _location: Location,public dialog: MatDialog) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
      this.spinnerService.hide();
  });
}

  
  AddCategory(){
   this.router.navigate(['/category-add']);
  }
  EditCategory(item){
    this.router.navigate(['/category-add'],{ queryParams: item });
   }
   delete(item){
   
     
const dialogRef = this.dialog.open(PopupComponent, {
  width: '250px',
  data: {title: "Delete", message: "Are you sure you want to delete category " + item.name + " ? "},
  panelClass: 'myapp-no-padding-dialog'

});


dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  console.log(result);
  if(result === "Delete")
  {
    this.adminmaster.deleteCategory(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllCategories().subscribe((data) => {
        console.log(data);
        this.categories = data;
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



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categories = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) {
      
      
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
    this.adminmaster.deleteCategory(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllCategories().subscribe((data) => {
        console.log(data);
        this.categories = data;
    });
  });
   
   }
  

}



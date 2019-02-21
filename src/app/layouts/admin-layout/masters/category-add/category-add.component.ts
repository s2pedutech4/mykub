import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  categoryExists:boolean = false;
  categoryForm:FormGroup
  submitted = false;
  categories = [];
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) { }

   ngOnInit() {
   
    this.categoryForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      users: []
    });

    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);   
          if(params.hasOwnProperty('id'))
          {
            this.categoryForm.patchValue(params); 
          }
                
      });

      this.adminmaster.getAllCategories().subscribe((data) => {
        console.log(data);
        this.categories = data;
       
    });
        
    }
    get f() { return this.categoryForm.controls; }

    onSubmit(){
      this.submitted = true;
    console.log(this.categoryForm.value)
    this.adminmaster.addCategory(this.categoryForm.value).subscribe((z) => {
      console.log(z);
      this.router.navigate(['category']);

    });
    
    }
    
    Cancel(){
      this.router.navigate(['category']);

    }
    
  checkCategory()
  {
    let bname = this.categoryForm.controls.name.value;
    console.log(this.categories);
    let b = this.categories.find(x => {
        if(x.name === bname)
          return x;
    });
    if(b != null)
      this.categoryExists = true;
    else
      this.categoryExists = false;
  }

}

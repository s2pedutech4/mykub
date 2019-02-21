import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

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
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) { }

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
      this.router.navigate(['service-type']);

    });
    
    }
    
    Cancel(){
      this.router.navigate(['service-type']);

    }
    checkSType()
    {
      let bname = this.service_type_Form.controls.name.value;
      console.log(this.servicetypes);
      let b = this.servicetypes.find(x => {
          if(x.name === bname)
            return x;
      });
      if(b != null)
        this.sTypeExists = true;
      else
        this.sTypeExists = false;
    }
    

}

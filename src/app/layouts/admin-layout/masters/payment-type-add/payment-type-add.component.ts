import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-payment-type-add',
  templateUrl: './payment-type-add.component.html',
  styleUrls: ['./payment-type-add.component.scss']
})
export class PaymentTypeAddComponent implements OnInit {
  payment_type_Form:FormGroup
  paymenttypes = [];
  pTypeExists:boolean = false;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) { }

   ngOnInit() {
   
    this.payment_type_Form = this.formBuilder.group({
      id: null,
      type: ['', Validators.required],
     
    });

    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);   
          if(params.hasOwnProperty('id'))
          {
            this.payment_type_Form.patchValue(params); 
          }
                
      });

      this.adminmaster.getAllPayment_types().subscribe((data) => {
        console.log(data);
        this.paymenttypes = data;
    });
        
    }
    get f() { return this.payment_type_Form.controls; }

    onSubmit(){
      this.submitted =true;
    console.log(this.payment_type_Form.value)
    this.adminmaster.addPayment_type(this.payment_type_Form.value).subscribe((z) => {
      console.log(z);
      this.router.navigate(['payment-type']);

    });
    
    }
    
    Cancel(){
      this.router.navigate(['payment-type']);

    }
    
    checkPType()
  {
    let bname = this.payment_type_Form.controls.type.value;
    console.log(this.paymenttypes);
    let b = this.paymenttypes.find(x => {
        if(x.type === bname)
          return x;
    });
    if(b != null)
      this.pTypeExists = true;
    else
      this.pTypeExists = false;
  }
    

}

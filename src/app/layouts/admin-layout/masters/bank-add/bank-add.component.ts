import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-bank-add',
  templateUrl: './bank-add.component.html',
  styleUrls: ['./bank-add.component.scss']
})
export class BankAddComponent implements OnInit {
  bankForm: FormGroup;
  bankExists:boolean = false;
  data : any;
  submitted =false;
  bankName: string = '';
  banks = [];
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.bankForm = this.formBuilder.group({
      id: null,
      bankName: ['', Validators.required],
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required]
  });

  this.route.queryParams.subscribe(params => {
    // this.data = params;

        console.log(params);   
        if(params.hasOwnProperty('id'))
        {
          this.bankForm.patchValue(params); 
        }
              
    });
    this.adminmaster.getAllBanks().subscribe((data) => {
      console.log(data);
      this.banks = data;   
  });
  }
  get f() { return this.bankForm.controls; }
  onSubmit()
  {
    this.submitted = true;
    console.log(this.bankForm.value);
    this.adminmaster.addBank(this.bankForm.value).subscribe((z) => {
      console.log(z);
      this.router.navigate(['bank']);

    });
  }
  Cancel()
  {
    this.router.navigate(['bank']);
  }

  checkBank()
  {
    let bname = this.bankForm.controls.bankName.value;
    let b = this.banks.find(x => {
        if(x.bankName === bname)
          return x;
    });
    if(b != null)
      this.bankExists = true;
    else
      this.bankExists = false;
  }
}

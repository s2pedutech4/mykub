import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

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
  constructor(private formBuilder:FormBuilder,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) { }

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

}

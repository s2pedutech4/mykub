import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  documenttypes = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) {
      
      
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
    this.adminmaster.deleteDocument_type(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllDocument_types().subscribe((data) => {
        console.log(data);
        this.documenttypes = data;
    });
  });
   
   }
  

}



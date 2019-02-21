import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.scss']
})
export class ServiceTypeComponent implements OnInit {
  servicetypes = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllService_types().subscribe((data) => {
      console.log(data);
      this.servicetypes = data;
      this.spinnerService.hide();
  });
}

  
AddService_type(){
   this.router.navigate(['/service-type-add']);
  }
  EditService_type(item){
    this.router.navigate(['/service-type-add'],{ queryParams: item });
   }
   delete(item){
    this.adminmaster.deleteService_type(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllService_types().subscribe((data) => {
        console.log(data);
        this.servicetypes = data;
    });
  });
   
   }
  

}



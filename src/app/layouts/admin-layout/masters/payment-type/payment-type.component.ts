import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  paymenttypes = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllPayment_types().subscribe((data) => {
      console.log(data);
      this.paymenttypes = data;
      this.spinnerService.hide();
  });
}

  
AddPayment_type(){
   this.router.navigate(['/payment-type-add']);
  }
  EditPayment_type(item){
    this.router.navigate(['/payment-type-add'],{ queryParams: item });
   }
   delete(item){
    this.adminmaster.deletePayment_type(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllPayment_types().subscribe((data) => {
        console.log(data);
        this.paymenttypes = data;
    });
  });
   
   }
  

}



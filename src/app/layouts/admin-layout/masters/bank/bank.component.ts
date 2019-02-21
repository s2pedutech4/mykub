import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  banks = [];
  p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) {
      
      
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllBanks().subscribe((data) => {
      console.log(data);
      this.banks = data;
      this.spinnerService.hide();
  });
}
AddBank(){
	this.router.navigate(['bank-add']);

}

editBank(item){
  this.router.navigate(['/bank-add'],{ queryParams: item });
 }
 deleteBank(item){
  this.adminmaster.deleteBank(item.id).subscribe((data) => {
    console.log(data);
    this.adminmaster.getAllBanks().subscribe((data) => {
      console.log(data);
      this.banks = data;
  });
});
}
}

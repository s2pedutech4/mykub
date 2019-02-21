import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
accounts = [];
p: number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService) { 
  }

  ngOnInit() {
    this.spinnerService.show();
    this.adminmaster.getAllAccounts().subscribe((data) => {
      console.log(data);
      this.accounts = data;
      this.spinnerService.hide();
  });
}

  
  AddAccount(){
   this.router.navigate(['/account-add']);
  }
  EditAccount(item){
    this.router.navigate(['/account-add'],{ queryParams: item });
   }
   delete(item){
    this.adminmaster.deleteAccount(item.id).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllAccounts().subscribe((data) => {
        console.log(data);
        this.accounts = data;
    });
  });
   
   }
  

}



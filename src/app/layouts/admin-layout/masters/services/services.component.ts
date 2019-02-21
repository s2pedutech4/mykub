import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RestService } from '../../../../rest.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  connections: Array<any> = [];
  p : number = 1;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router,private adminmaster: AdminMastersService,private rest: RestService) {  
  }

  ngOnInit() {
    this.adminmaster.getAllServices_Basic().subscribe((data) => {
      console.log(data);
      this.connections = data;
     
    });
  }

  AddService()
  {
    this.router.navigate(['/service-add']);

  }
  GoToServiceDetails(item)
  {
    this.router.navigate(['/service-add'],{ queryParams: item });

  }
  delete(item){
    this.adminmaster.deleteServices(item.serviceId).subscribe((data) => {
      console.log(data);
      this.adminmaster.getAllServices_Basic().subscribe((data) => {
        console.log(data);
        this.connections = data;
       
      });
  });
   
   }
}

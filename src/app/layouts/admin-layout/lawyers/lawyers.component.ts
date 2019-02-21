import { Component, OnInit } from '@angular/core';
import { AdminMastersService } from '../../../services/admin/admin-masters.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.scss']
})
export class LawyersComponent implements OnInit {
  p: number = 1;
  lawyers: any = [];
  constructor(private adminmaster: AdminMastersService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
        this.adminmaster.getAllLawyers().subscribe((data) => {
      console.log(data);
      for(let i=0; i < data.length; i++)
      {
        let obj:any = data[i];
        // get lawyer verification status
        this.adminmaster.getLawyerStatus(obj.id).subscribe(lawyerresp => {
          if(lawyerresp != null)
          {
            if(lawyerresp.admin_verified)
              obj.status = "Verified";
            else
              obj.status = "Pending";
            this.lawyers.push(obj);
          }
        });
      }
      
      this.spinnerService.hide();

    });
  }
  GoToLawyerDetails(item)
  {
    this.router.navigate(['/lawyers-details'],{ queryParams: item });

  }

}

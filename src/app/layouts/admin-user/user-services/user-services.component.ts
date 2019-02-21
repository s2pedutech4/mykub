import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss']
})
export class UserServicesComponent implements OnInit {
userdata: any;
  constructor(private router : Router,private auth: AuthService) { }

  ngOnInit() {
    this.userdata = this.auth.getCurrentUser();
    console.log(this.userdata);
    if(typeof this.userdata === "undefined" || this.userdata.role != "ROLE_USER")
    {
        this.router.navigate(['/login']);

    }
  }

}

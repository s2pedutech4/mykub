import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  currentRate = 8;
  userid: any;
  constructor(private route: ActivatedRoute,private router : Router,private rest: RestService) {
   
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userid = params;
     
      console.log(this.userid[0]);
    });
    this.rest.getLawyerProfileInfo(this.userid[0]).subscribe((data) => {
      console.log(data);
    });
  }
  GoToLogin(){
		this.router.navigateByUrl('/login');
	}
	GoToSignUp(){
		this.router.navigateByUrl('/signup');
    }
    GotoChat(){
      this.router.navigateByUrl('/chat');

    }
}

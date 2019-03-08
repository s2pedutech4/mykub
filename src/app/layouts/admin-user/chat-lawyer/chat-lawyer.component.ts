import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat-lawyer',
  templateUrl: './chat-lawyer.component.html',
  styleUrls: ['./chat-lawyer.component.scss']
})
export class ChatLawyerComponent implements OnInit {
  currentUser: any;
  forumId: any;
  SendingMessages = [];
  ForumForm: FormGroup = new FormGroup({
    author: new FormControl([]),
    body: new FormControl([]),
    createdAt: new FormControl(new Date()),
    role: new FormControl([]),
    forumId: new FormControl([]),  
    id: new FormControl([])
  });
  constructor(private router: Router,private auth: AuthService,private route: ActivatedRoute,private rest: RestService,private _location: Location) { }

  ngOnInit() {

    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentUser);
    if(typeof this.currentUser === "undefined")
    {
        this.router.navigate(['/login']);

    }
    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params.forumId);
          this.forumId = params.forumId;

          this.rest.getForumData(this.forumId).subscribe((z) => {
            console.log(z);
          
            this.SendingMessages = z.messages;
           
          });
          
      });
   

  }
  Send()
  {
    
    this.ForumForm.controls.author.setValue(this.currentUser.firstName);
    this.ForumForm.controls.role.setValue(this.currentUser.role);
    this.ForumForm.controls.forumId.setValue(this.forumId);
    this.ForumForm.controls.createdAt.setValue(new Date());
    this.ForumForm.controls.id.setValue(this.currentUser.id);
    console.log(this.ForumForm.value);
    this.rest.SendMessage(this.ForumForm.value).subscribe((z) => {
      console.log(z);
      this.ForumForm.reset();

      this.rest.getForumData(this.forumId).subscribe((z) => {
        console.log(z);
        this.SendingMessages = z.messages;

      });
    });

  }
  goToBack()
{
  this._location.back();

}
}

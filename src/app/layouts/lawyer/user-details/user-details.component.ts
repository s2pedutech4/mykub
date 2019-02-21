import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpEventType,HttpEvent,HttpResponse } from '@angular/common/http';
import { LawyersService } from '../../../services/lawyers/lawyers.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  currentRate = 1;
  progressbar = 0;
  showProgress = false;
  userId: any;
  transactionId: any;
  UploadDoc: boolean = true;
  IsOutputDocuments: boolean = false;
  IsInputDocuments: boolean = false;
  IsOutputDocNull: boolean = true;
  IsInputDocNull: boolean = true;
  
  UserDetils: any = {};
  currentUser;
  
@ViewChild("fileInput") fileInput;

  constructor(private spinnerService: Ng4LoadingSpinnerService,private route: ActivatedRoute,private router: Router,private rest: RestService,private auth: AuthService,private lawyer: LawyersService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.currentUser = this.auth.getCurrentUser();
    if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_LAWYER")
    {
        this.router.navigate(['/login']);

    }
    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);
         this.userId = params.userId;
         this.transactionId = params.transactionId;
          
      });
      
      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.UserDetils.inputDocuments = z.inputDocuments;
        this.UserDetils.outputDocuments = z.outputDocuments;
        this.UserDetils.forumId = z.forumId;
        console.log(this.UserDetils.forumId);
         // get the service data
      this.rest.getServiceDetails(z.serviceId).subscribe(serviceData => {
        console.log(serviceData);
        if(z.inputDocuments.length === 0)
          this.IsInputDocNull = false;
          if(z.outputDocuments.length === 0)
          this.IsOutputDocNull = false;
        this.IsInputDocuments = serviceData.documentInput;
        this.IsOutputDocuments = serviceData.documentOutput;
        this.UserDetils.serviceName = serviceData.name;
        console.log(this.IsInputDocuments +"-"+ this.IsOutputDocuments);
        this.spinnerService.hide();      }, error => {
        console.log("Unable to get service data");
      });
        this.spinnerService.hide();

      });

      // get the user details
      this.rest.getUserInfo(this.userId).subscribe(userData => {
        console.log(userData); 
        this.UserDetils.firstName = userData.firstName;
        this.UserDetils.lastName = userData.lastName;
        this.UserDetils.emailId = userData.emailId;
        this.UserDetils.mobileNum = userData.mobileNum;
        
      }, error => {
        console.log("Unable to get user data");
      });
      
      
      
  }
  GoToChat(){
    console.log(this.UserDetils.forumId);
    this.router.navigate(['/chat-user'],{"queryParams":{forumId: this.UserDetils.forumId}});
    // ,{ queryParams: item });

  }
  OpenDoc()
  {
    this.UploadDoc = false;
  }
  AddDoc()
  {
    this.progressbar = 0;
   let fi = this.fileInput.nativeElement;
   if(fi.files && fi.files[0]){
     let fileToUpload = fi.files[0];
    //  this.rest.uploadDocument(this.transactionId,fileToUpload).subscribe((event) => {
    //    console.log(event);
    //  });
     this.rest.uploadOutputDocument(this.transactionId,fileToUpload).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.showProgress =true;
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.progressbar = percentDone;
        if(this.progressbar === 100)
        {
          this.showProgress = false;
          this.UploadDoc = true;

        }
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        // this.progress.total = 100;
          this.showProgress = false;
          
        console.log('File is completely uploaded!');
      }
      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.UserDetils.outputDocuments = z.outputDocuments;
        if(z.outputDocuments.length === 0)
        this.IsOutputDocNull = false;
        else
        this.IsOutputDocNull = true;

      });
      // console.log(z);
    });  
   }

  }
  
  DownloadDoc(item)
  {
    this.rest.downloadDocument(item,this.userId).subscribe((z) => {
      let b = new Blob([z]);
      console.log(b);

      var downloadURL = window.URL.createObjectURL(z);
  var link = document.createElement('a');
  link.href = downloadURL;
  console.log(item);
  link.download = item;
  link.click();
    });

  }
  DeleteDoc(item)
  {
    this.rest.DeleteDoc(this.transactionId,item).subscribe((z) => {
      console.log(z);

      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.UserDetils.inputDocuments = z.inputDocuments;

      });
    });

  }
  Cancel()
  {
    this.UploadDoc = true;
    this.showProgress = false;
  }



}

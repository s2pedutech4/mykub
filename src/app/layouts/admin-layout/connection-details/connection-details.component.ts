import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpEventType,HttpEvent,HttpResponse } from '@angular/common/http';
import { LawyersService } from '../../../services/lawyers/lawyers.service';

@Component({
  selector: 'app-connection-details',
  templateUrl: './connection-details.component.html',
  styleUrls: ['./connection-details.component.scss']
})
export class ConnectionDetailsComponent implements OnInit {
  currentRate = 1;
  progressbar = 0;
  showProgress = false;
  userId: any;
  transactionId: any;
  providerId: any;
  UploadDoc: boolean = false;
  IsInputDocNull: boolean = false;
  IsOutputDocNull: boolean = false;
  LawyerDetails: any = {};
  UserDetails: any = {};
  currentUser;
  myimage:any;
showmyimg:boolean = false;
  
@ViewChild("fileInput") fileInput;

  constructor(private spinnerService: Ng4LoadingSpinnerService,private route: ActivatedRoute,private router: Router,private rest: RestService,private auth: AuthService,private lawyer: LawyersService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.currentUser = this.auth.getCurrentUser();
    if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_ADMIN")
    {
        this.router.navigate(['/login']);

    }
    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);
         let userId = params.userId;
         let providerId = params.providerId;
         let transactionId = params.transactionId;
          
         this.rest.getTransaction(transactionId).subscribe((z) => {
          console.log(z);
          
          this.UserDetails.inputDocuments = z.inputDocuments;
          this.LawyerDetails.outputDocuments = z.outputDocuments;
          if(z.inputDocuments.length === 0)
          this.IsInputDocNull = false;
          if(z.outputDocuments.length === 0)
          this.IsOutputDocNull = false;

          this.rest.getImageNameByUserId(providerId).subscribe(imgresp => {
            this.rest.downloadUserImage(imgresp.imagepath,providerId).subscribe(z=>{
              let reader = new FileReader();
            reader.addEventListener("load",()=>{
              if(reader.result != null)
              {
              this.myimage = reader.result;
              console.log("getting the image");
              this.showmyimg = true;
              }
            },false);
            let b = new Blob([z]);
            reader.readAsDataURL(b);
          
            });
          });
          console.log(providerId);
          this.lawyer.getBarDetails(providerId).subscribe(x => {
            console.log(x);
            this.LawyerDetails.barcouncil = x.bar_council;
            this.LawyerDetails.reg = x.bar_registration_no;
    
          });
          // this.UserDetails.forumId = z.forumId;
          // console.log(this.UserDetails.forumId);
           // get the service data
        this.rest.getServiceDetails(z.serviceId).subscribe(serviceData => {
          console.log(serviceData);
          this.UserDetails.serviceName = serviceData.name;
            // get the lwyer details
      this.rest.getUserInfo(providerId).subscribe(lawyerData => {
        console.log(lawyerData); 
        this.LawyerDetails.firstName = lawyerData.firstName;
        this.LawyerDetails.lastName = lawyerData.lastName;
        this.LawyerDetails.emailId = lawyerData.emailId;
        this.LawyerDetails.mobileNum = lawyerData.mobileNum;
        
          // get the user details
      this.rest.getUserInfo(userId).subscribe(userData => {
        console.log(userData); 
        this.UserDetails.firstName = userData.firstName;
        this.UserDetails.lastName = userData.lastName;
        this.UserDetails.emailId = userData.emailId;
        this.UserDetails.mobileNum = userData.mobileNum;
        
        this.spinnerService.hide();

      }, error => {
        console.log("Unable to get user data");
      });
      }, error => {
        console.log("Unable to get user data");
      });
        }, error => {
          console.log("Unable to get service data");
        });
  
        });
      });
    }
  GoToChat(){
    console.log(this.UserDetails.forumId);
    this.router.navigate(['/chat-user'],{"queryParams":{forumId: this.UserDetails.forumId}});
    // ,{ queryParams: item });

  }
  OpenDoc()
  {
    this.UploadDoc = true;
  }
  AddDoc()
  {
    this.progressbar = 0;
    this.UploadDoc = false;
   let fi = this.fileInput.nativeElement;
   if(fi.files && fi.files[0]){
     let fileToUpload = fi.files[0];
    //  this.rest.uploadDocument(this.transactionId,fileToUpload).subscribe((event) => {
    //    console.log(event);
    //  });
     this.rest.uploadDocument(this.transactionId,fileToUpload).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.showProgress =true;
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.progressbar = percentDone;
        if(this.progressbar === 100)
        {
          this.showProgress = false;
        }
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        // this.progress.total = 100;
          this.showProgress = false;
          
        console.log('File is completely uploaded!');
      }
      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.UserDetails.inputDocuments = z.inputDocuments;

      });
      // console.log(z);
    });  
   }

  }
  
  DownloadDoc(item)
  {
    // this.rest.getTransaction(this.transactionId,item).subscribe((z) => {
    //   console.log(z);
    // });

  }
  DeleteDoc(item)
  {
    this.rest.DeleteDoc(this.transactionId,item).subscribe((z) => {
      console.log(z);

      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.UserDetails.inputDocuments = z.inputDocuments;

      });
    });

  }
  Cancel()
  {
    this.UploadDoc = false;
    this.showProgress = false;
  }



}

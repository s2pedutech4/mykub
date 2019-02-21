import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEventType,HttpEvent,HttpResponse } from '@angular/common/http';
import { LawyersService } from '../../../services/lawyers/lawyers.service';

@Component({
  selector: 'app-lawyer-details',
  templateUrl: './lawyer-details.component.html',
  styleUrls: ['./lawyer-details.component.css']
})
export class LawyerDetailsComponent implements OnInit {
  currentRate = 1;
  userId: any;
  progressbar = 0;
  showProgress = false;
  IsInputDocuments: boolean = false;
  IsOutputDocuments: boolean = false;
  IsInputDocNull: boolean = true;
  IsOutputDocNull: boolean = true;
  providerId: any;
  transactionId: any;
  UploadDoc: boolean = false;
  LawyerDetils: any = {};
  currentUser;
  showReview: boolean = true;
  Food = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  experianceDetails : any = [];
  showExpDatailsTable: boolean = true;
  myimage: any;
  showmyimg: boolean = false;
@ViewChild("fileInput") fileInput;
progress = { loaded : 0 , total : 0 };
ReviewForm: FormGroup = new FormGroup({
  userId: new FormControl([]),
  winRatio: new FormControl(),
  ratings: new FormControl([]),
  description: new FormControl(['']),
  servicesTransactionId: new FormControl([]),
  providerId: new FormControl([])

});
  constructor(private spinnerService: Ng4LoadingSpinnerService,private route: ActivatedRoute,private router: Router,private rest: RestService,private auth: AuthService,private lawyer: LawyersService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.currentUser = this.auth.getCurrentUser();
    if(typeof this.currentUser === "undefined" || this.currentUser.role != "ROLE_USER")
    {
        this.router.navigate(['/login']);

    }
    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);
         this.providerId = params.providerId;
         this.transactionId = params.transactionId;
          
      });
      this.rest.getUserPersonalDetails(this.providerId).subscribe((z) => {
        console.log(z);
        this.LawyerDetils.firstName = z.firstName;
        this.LawyerDetils.lastName = z.lastName;
        this.LawyerDetils.mobileNum = z.mobileNum;
        this.LawyerDetils.emailId = z.emailId;

        
        // this.connections = data;
      });
      this.lawyer.getUserExpDetails(this.providerId).subscribe(resp => {
        this.experianceDetails = resp;
        if(resp.length === 0)
        {
          this.showExpDatailsTable = false;
        }
        console.log(resp);
      });
      this.rest.getUserAdressDetails(this.providerId).subscribe((z) => {
        console.log(z);
        this.LawyerDetils.address = z.address;
        this.LawyerDetils.zipcode = z.zipcode;
        // this.connections = data;
      });
      this.rest.getUserReviews(this.providerId).subscribe((z) => {
        console.log(z);
        console.log(this.showReview);
        let x: any = z.find(item =>{
          if(item.servicesTransactionId.toString() === this.transactionId)
          return item;
        });
        console.log(x);
        if(typeof x === "undefined" || x === null)
        {
          this.showReview = true;
        }
        else{
          this.showReview = false;
        }
        console.log(this.showReview);
        let winRatio=0;
        let ratings=0;
        let reviews = [];
        console.log(this.transactionId);
        for(let i=0;i<z.length;i++)
        {
          let o : any = {};
          winRatio += z[i].winRatio;
          ratings += z[i].ratings;
          // o.rating = z[i].ratings;
          let ratingsarray = []; 

          for (let j = 0; j < z[i].ratings; j++) { 
            ratingsarray.push(j) 
          } 
          o.rating = ratingsarray;
          // console.log(z[i].servicesTransactionId + "-" + this.transactionId);
          // if(z[i].servicesTransactionId.toString() === this.transactionId)
          // {
          //   let o : any = {};
          //   o.rating = z[i].ratings;
          //   o.reviews = z[i].description;
          //   reviews.push(o);

          // }
          o.review = z[i].description;
          reviews.push(o);
          console.log(reviews);
        }
        
        this.LawyerDetils.winRatio = winRatio/z.length;
        this.LawyerDetils.ratings = ratings/z.length;
        this.LawyerDetils.reviews = reviews;
        // this.connections = data;
        console.log(this.LawyerDetils);

      });
      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        if(z.inputDocuments.length === 0)
          this.IsInputDocNull = false;
          if(z.outputDocuments.length === 0)
          this.IsOutputDocNull = false;
        this.LawyerDetils.inputDocuments = z.inputDocuments;
        this.LawyerDetils.outputDocuments = z.outputDocuments;
        this.LawyerDetils.forumId = z.forumId;
        console.log(this.LawyerDetils.forumId);
        this.rest.getServiceDetails(z.serviceId).subscribe(serviceData => {
          console.log(serviceData);
          this.IsInputDocuments = serviceData.documentInput;
          this.IsOutputDocuments = serviceData.documentOutput;
          this.LawyerDetils.serviceName = serviceData.name;
          console.log(this.IsInputDocuments +"-"+ this.IsOutputDocuments);
          this.spinnerService.hide();
        });

      });
      this.lawyer.getBarDetails(this.providerId).subscribe(x => {
        console.log(x);
        this.LawyerDetils.barcouncil = x.bar_council;
        this.LawyerDetils.reg = x.bar_registration_no;

      });
      this.rest.getImageNameByUserId(this.providerId).subscribe(imgresp => {
        console.log(imgresp);
        this.rest.downloadUserImage(imgresp.imagepath,this.providerId).subscribe(z=>{
          let reader = new FileReader();
        reader.addEventListener("load",()=>{
          if(reader.result != null)
          {
          this.myimage = reader.result;
          console.log("getting the image");
          console.log(this.myimage);
          this.showmyimg = true;
          }
        },false);
        let b = new Blob([z]);
        reader.readAsDataURL(b);
      
        });
      });
  }
  GoToChat(){
    console.log(this.LawyerDetils.forumId);
    this.router.navigate(['/chat-lawyer'],{"queryParams":{forumId: this.LawyerDetils.forumId}});
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
     let fileToUpload:File = fi.files[0];
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
        console.log(this.progress.loaded);
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        // this.progress.total = 100;
          this.showProgress = false;
          
        console.log('File is completely uploaded!');
      }
      this.rest.getTransaction(this.transactionId).subscribe((z) => {
        console.log(z);
        this.LawyerDetils.inputDocuments = z.inputDocuments;
        if(z.inputDocuments.length === 0)
        this.IsInputDocNull = false;
        else
        this.IsInputDocNull = true;

      });
      // console.log(z);
    });  
   }

  }
  
  DownloadDoc(item)
  {
    this.rest.downloadDocument(item,this.providerId).subscribe((z) => {
     
      let b = new Blob([z]);
      

      var downloadURL = window.URL.createObjectURL(z);
      var link = document.createElement('a');
      link.href = downloadURL;
     
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
        this.LawyerDetils.inputDocuments = z.inputDocuments;

      });
    });

  }
  Cancel()
  {
    this.UploadDoc = false;
    this.showProgress = false;
  }

  SendReview()
  {
    this.ReviewForm.controls.userId.setValue(this.providerId);
    this.ReviewForm.controls.servicesTransactionId.setValue(this.transactionId);
    this.ReviewForm.controls.providerId.setValue(this.currentUser.id);
    this.ReviewForm.controls.ratings.setValue(this.currentRate);

    console.log(this.ReviewForm.value);
    this.rest.SendReview(this.ReviewForm.value).subscribe((z) => {
      console.log(z);
      this.ReviewForm.reset();

      this.rest.getUserReviews(this.providerId).subscribe((z) => {
        console.log(z);
        let x: any = z.find(item =>{
          if(item.servicesTransactionId.toString() === this.transactionId)
           return item;
        });
        if(typeof x === "undefined" || x === null)
        {
          this.showReview = true;
        }
        else{
          this.showReview = false;
        }
        
        let winRatio=0;
        let ratings=0;
        let reviews = [];
        for(let i=0;i<z.length;i++)
        {
          let o : any = {};
          winRatio += z[i].winRatio;
          ratings += z[i].ratings;
          let ratingsarray = []; 

          for (let j = 0; j < z[i].ratings; j++) { 
            ratingsarray.push(j) 
          } 
          o.rating = ratingsarray;
          o.review = z[i].description;
          reviews.push(o);
  
         }
        
        this.LawyerDetils.winRatio = winRatio/z.length;
        this.LawyerDetils.ratings = ratings/z.length;
        this.LawyerDetils.reviews = reviews;
        // this.connections = data;
      });

    });
  }

}

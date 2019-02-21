import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { LawyersService } from '../../../services/lawyers/lawyers.service';
import { AuthService } from '../../../auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DialogOverviewExampleDialogComponent } from '../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
@Component({
  selector: 'app-lawyers-details',
  templateUrl: './lawyers-details.component.html',
  styleUrls: ['./lawyers-details.component.scss']
})
export class LawyersDetailsComponent implements OnInit {
lawyerId: any;
LawyerDetils: any = {};
experianceDetails : any = [];
educationalDetails: any = [];
showExpDatailsTable: boolean = true;
showMarkVerify: boolean = true;
showEducatinalDetails: boolean = true;
currentPage: number = 1;
myimage:any;
showmyimg:boolean = false;
  constructor(private route: ActivatedRoute,private rest: RestService,private auth: AuthService,private lawyer: LawyersService,private spinnerService: Ng4LoadingSpinnerService,public dialog: MatDialog) { }

  ngOnInit() {
    this.spinnerService.show();
    this.route.queryParams.subscribe(params => {
          console.log(params);
         this.lawyerId = params.id;
         if(params.status === "Pending")
         this.showMarkVerify = true;
         else
         this.showMarkVerify = false;
          
      });

      this.rest.getUserPersonalDetails(this.lawyerId).subscribe((z) => {
        console.log(z);
        this.LawyerDetils.firstName = z.firstName;
        this.LawyerDetils.lastName = z.lastName;
        this.LawyerDetils.mobileNum = z.mobileNum;
        this.LawyerDetils.emailId = z.emailId;

        
        // this.connections = data;
      });
      this.rest.getImageNameByUserId(this.lawyerId).subscribe(imgresp => {
        console.log(imgresp);
        this.rest.downloadUserImage(imgresp.imagepath,this.lawyerId).subscribe(z=>{
          let reader = new FileReader();
        reader.addEventListener("load",()=>{
          if(reader.result != null)
          {
          this.myimage = reader.result;
          this.showmyimg = true;
          }
        },false);
        let b = new Blob([z]);
        reader.readAsDataURL(b);
      
        });
      });

      this.lawyer.getBarDetails(this.lawyerId).subscribe(x => {
        console.log(x);
        this.LawyerDetils.barcouncil = x.bar_council;
        this.LawyerDetils.reg = x.bar_registration_no;

      });
      this.lawyer.getUserExpDetails(this.lawyerId).subscribe(resp => {
        this.experianceDetails = resp;
        if(resp.length === 0)
        {
          this.showExpDatailsTable = false;
        }
        console.log(resp);
      });
      this.rest.getAllLawyersAdressDetails(this.lawyerId).subscribe((z) => {
        console.log(z);
        this.LawyerDetils.address = z.address;
        this.LawyerDetils.zipcode = z.zipcode;
        // this.connections = data;
      });
      this.rest.getUserReviews(this.lawyerId).subscribe((z) => {
        console.log(z);
        let winRatio=0;
        let ratings=0;
        for(let i=0;i<z.length;i++)
        {
          winRatio += z[i].winRatio;
          ratings += z[i].ratings;
        }
        this.LawyerDetils.winRatio = winRatio/z.length;
        this.LawyerDetils.ratings = ratings/z.length;
      });
      this.lawyer.getUserEducationalDetails(this.lawyerId).subscribe(resp => {
        this.educationalDetails = resp;
        if(resp.length === 0)
        {
          this.showEducatinalDetails = false;
        }
        console.log(resp);
        this.spinnerService.hide();

      });
  }
  markVerified(){
    this.lawyer.markVerify(this.lawyerId).subscribe(resp => {
      console.log(resp);
      let senderEmailId = this.LawyerDetils.emailId; 
        let subject = "Verification Successful";
        let msg = "Congratulations! ";
        msg += this.LawyerDetils.firstName + " " + this.LawyerDetils.lastName + ".";
        msg += "Your Profile has been successfully verified.";
        this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
          console.log(response);
        });

      this.showMarkVerify = false;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
        width: '250px',
        data: {title: "Success", message: "Lawyer Verified! "},
        panelClass: 'myapp-no-padding-dialog'

      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}

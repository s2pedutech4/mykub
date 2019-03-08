import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { first } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DialogOverviewExampleDialogComponent } from '../../../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
transactionData: any = {};
fees: any;
  constructor(private route: ActivatedRoute,private rest: RestService,private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // this.data = params;

          console.log(params);
       this.transactionData = params;
       this.fees = params.fees
      });
  }

  pay() {
    this.rest.setTransaction(this.transactionData).pipe(first()).subscribe(
      data => {
        console.log(data);
        console.log("sending an email on transaction");
        // this.rest.sendEmail("aa","aa","aa").subscribe(resp => {
        //   console.log(resp);
        // });
        //this.rest.sendmail("a","b");
        this.rest.getUserInfo(this.transactionData.providerSelected).subscribe(data =>{
          console.log(data);
          let senderEmailId = data.emailId; 
          let subject = "KUBER: New Connection";
          let msg = "A new connection for a service ";
          msg += " is created with the user ";
          this.rest.getUserInfo(this.transactionData.userId).subscribe(x =>{
            console.log(x);
          msg += x.firstName + " " + x.lastName;
          this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
            console.log(response);
          });
        });
        });
       
        var obj: any = {};
        obj.userId = this.transactionData.userId;
        obj.serviceId = this.transactionData.serviceId;
        obj.providerId = this.transactionData.providerSelected;
        obj.transactionId = data.id;
        console.log(obj);
        this.router.navigate(['/lawyer-details'],{"queryParams": obj});
        // this.spinnerService.hide();
      },
      error => {
        console.log(error);
      }
    );

  }
  Cancel(){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {title: "Error", message: "Unable to Process Payment"},
      panelClass: 'myapp-no-padding-dialog'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/user-dashboard']);
    });
  }
}

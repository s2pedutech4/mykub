import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../../../rest.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../auth.service';
import { AdminMastersService } from '../../../../services/admin/admin-masters.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  isLinear = false;
  userData : any;
  userId : any;
  basicForm: FormGroup;
  documentForm: FormGroup;
  providerForm: FormGroup;
  paymentForm: FormGroup;
  currentServiceId: any;
  serviceTypes = [];
  admins = [];
  documentlist = [];
  accounts = [];
 providerlist = [];
 services=[];
 sNameExists:boolean = false;
 dNameExists:boolean = false;
 showOtherSteppers : boolean = false;
  constructor(private _formBuilder: FormBuilder,private rest: RestService,private auth: AuthService,private adminmaster: AdminMastersService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
   
    // this.userData = this.auth.getCurrentUser();
    // this.userId = this.userData.id;
    // console.log(this.userData);

    this.basicForm = this._formBuilder.group({
      id:[],
      name: ['', Validators.required],
      displayName: ['', Validators.required],
      serviceTypeId: [null, Validators.required],
      online: [false],
      documentInput: [false],
      documentOutput: [false],
      activeFrom: ['',Validators.required],
       activeTo: ['',Validators.required],
       userId: [null,Validators.required],
       serviceId: [null]
      //  admin: ['', Validators.required]


    });
    this.documentForm = this._formBuilder.group({
      id: [],
      documents: [null,Validators.required]
    });

    this.paymentForm = this._formBuilder.group({
      id: [],
      fees: [null, Validators.required],
      accountId: [null, Validators.required]
     
    });

    this.providerForm = this._formBuilder.group({
      id: [],
      providers: [null, Validators.required],
     
    }); 

    this.adminmaster.getAllServices_Basic().subscribe((data) => {
      console.log(data);
      this.services = data;
     
    });

    this.adminmaster.getAllService_types().subscribe((data) => {
      console.log(data);
      this.serviceTypes = data;
     
  });
  this.adminmaster.getAllAdmins().subscribe((data) => {
    console.log(data);
    this.admins = data;
   
});

this.adminmaster.getAllDocument_types().subscribe((data) => {
  console.log(data);
  this.documentlist = data;
 
});

this.adminmaster.getAllAccounts().subscribe((data) => {
  console.log(data);
  this.accounts = data;
 
});
this.adminmaster.getAllProviders().subscribe((data) => {
  console.log(data);
  this.providerlist = data;
 
});

this.route.queryParams.subscribe(params => {
      console.log(params);
  console.log(params.serviceTypeId);
  if(params.hasOwnProperty("id")){ 
    this.showOtherSteppers = true;
    this.getKuberService(params.serviceId);
    this.currentServiceId = params.serviceId;
  }
});
  }

  getKuberService(id)
  {

    this.adminmaster.getKuberServiceById(id).pipe(first()).subscribe(data => {
      console.log(data);
      if(data.servicesBasicInfoId != null)
      {
        this.getBasicInfo(data.servicesBasicInfoId);
      }
      if(data.servicesPaymentInfoId != null)
      {
        this.getPaymentInfo(data.servicesPaymentInfoId);
      }
      if(data.servicesDescriptionId != null)
      {
        this.getDescriptionInfo(data.servicesDescriptionId);
      }
      if(data.servicesProviderMappingId != null)
      {
        this.getProviderMappingInfo(data.servicesProviderMappingId);
      }
      
    });
  }
  getBasicInfo(id)  {
    this.adminmaster.getKuberServiceBasicInfoById(id).pipe(first()).subscribe(data => {
      console.log("Basic Info");
      console.log(data);
      
      this.basicForm.patchValue(data);
      let activeFromDate = new Date(data.activeFrom).toISOString().slice(0,10);
      this.basicForm.controls.activeFrom.setValue(activeFromDate);
      let activeToDate = new Date(data.activeTo).toISOString().slice(0,10);
      console.log(activeToDate);
      this.basicForm.controls.activeTo.setValue(activeToDate);
    });
  }
  getPaymentInfo(id){
    this.adminmaster.getKuberServicePaymentInfoById(id).pipe(first()).subscribe(data => {
      console.log("PAyment");
      console.log(data);
      this.paymentForm.patchValue(data);
    });
  }
  getDescriptionInfo(id){
    this.adminmaster.getKuberServiceDescriptionById(id).pipe(first()).subscribe(data => {
      console.log("Descrip");
      console.log(data);
      this.documentForm.patchValue(data);
    });
  }
  getProviderMappingInfo(id){
    this.adminmaster.getKuberServiceProviderMappingById(id).pipe(first()).subscribe(data => {
      console.log("providermapping");
      console.log(data);
      this.providerForm.patchValue(data);
    });
  }
  addKuberService()
  {
    if(this.currentServiceId == null)
    {
    this.adminmaster.addServiceBasicInfo(this.basicForm.value)
                    .pipe(first())
                  .subscribe(data => {
                    console.log(data);
                    //this.basicForm.patchValue(data);
                    this.showOtherSteppers = true;
                    this.currentServiceId = data.id;
                    // get the basic info from here
                    this.adminmaster.getKuberServiceBasicInfoById(data.servicesBasicInfoId).pipe(first()).subscribe(data => {
                      this.basicForm.patchValue(data);
                      let activeFromDate = new Date(data.activeFrom).toISOString().slice(0,10);
                      this.basicForm.controls.activeFrom.setValue(activeFromDate);
                      let activeToDate = new Date(data.activeTo).toISOString().slice(0,10);
                      console.log(activeToDate);
                      this.basicForm.controls.activeTo.setValue(activeToDate);
                    },
                      error=>{
                        console.log("Unable to get basic info")
                      });
                  },
                    error => {
                      console.log("Error while creating basic info");
                    });
                  }
                  else
                  {
                    this.addBasic_Info();
                  }
  }
  addBasic_Info()
  {
    console.log(this.basicForm.value);

    this.adminmaster.addService_Basic_Info(this.basicForm.value)
    .pipe(first())
    .subscribe(
        data => {
            // this.alert.success('Registration successful', true);
            console.log(data);
            let obj: any = {};
            obj.servicesBasicInfoId = data.id;
            let obj1: any = data;
            },
            error => {
              console.log("error");
                // this.alert.error(error);
                // this.loading = false;
            });
  }

  addDocument()
  {
    console.log(this.documentForm.value);
    // this.documentForm.controls.documents.setValue(this.documentForm.value.docuemnts.id);
    // console.log(this.documentForm.value);
    var obj:any = {};
    obj.serviceId = this.currentServiceId;
    obj.servicesDescription = this.documentForm.value;
    this.adminmaster.addService_Description(this.currentServiceId,obj)
    .pipe(first())
    .subscribe(
        data => {
            // this.alert.success('Registration successful', true);
            console.log(data);
            
            },
        error => {
          console.log("error");
            // this.alert.error(error);
            // this.loading = false;
        });
  }
  addPaymentInfo()
  {
    console.log(this.paymentForm.value);
    var obj:any = {};
    obj.serviceId = this.currentServiceId;
    obj.servicesPaymentInfo = this.paymentForm.value;
    this.adminmaster.addService_Payment_Info(this.currentServiceId,obj)
    .pipe(first())
    .subscribe(
        data => {
         console.log(data);
            
            },
        error => {
          console.log("error");
            // this.alert.error(error);
            // this.loading = false;
        });
  }
  addProviders()
  {
    console.log(this.providerForm.value);
    var obj:any = {};
    obj.serviceId = this.currentServiceId;
    obj.servicesProviderMapping = this.providerForm.value;
    this.adminmaster.addService_Providers(this.currentServiceId,obj)
    .pipe(first())
    .subscribe(
        data => {
            // this.alert.success('Registration successful', true);
            console.log(data);
            this.router.navigate(['/services']);

            },
        error => {
          console.log("error");
            // this.alert.error(error);
            // this.loading = false;
        });
  }
  checkServices()
  {
    let bname = this.basicForm.controls.name.value;
    console.log(bname);
    let b = this.services.find(x => {
      console.log(x.servicesBasicInfo.name + "--" + bname)
        if(x.servicesBasicInfo.name === bname)
          return x;
    });
    console.log(b);
    if(b != null)
      this.sNameExists = true;
    else
      this.sNameExists = false;

      let dname = this.basicForm.controls.displayName.value;
    let d = this.services.find(x => {
      if(x.servicesBasicInfo.displayName === dname)
        return x;
  });
  if(d != null)
    this.dNameExists = true;
  else
    this.dNameExists = false;
    
  }
}
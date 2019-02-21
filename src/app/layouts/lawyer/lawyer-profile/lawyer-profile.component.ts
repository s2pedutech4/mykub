import { Component, OnInit,ViewChild,VERSION} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestService } from '../../../rest.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';
import { LawyersService } from '../../../services/lawyers/lawyers.service';
import { AdminMastersService } from '../../../services/admin/admin-masters.service';
// import { MatStepper } from '@angular/material/stepper';
import {MatStepper} from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEventType,HttpEvent,HttpResponse } from '@angular/common/http';
import {SafeimgPipe} from '../safeimg.pipe'
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
declare const google: any;

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.scss']
})
export class LawyerProfileComponent implements OnInit {
  ViewMap : boolean = false;
  isLinear = false;
  userData : any;
  userId : any;
  showeduForm : boolean = false;
  showexpForm: boolean = false;
  personalForm: FormGroup;
  addressForm: FormGroup;
  servicesForm: FormGroup;
  lawyerinfoForm: FormGroup;
  addSearchForm: FormGroup;
  barDetailsForm: FormGroup;
  bankDetailsForm: FormGroup;
  educationalinfoForm: FormGroup;
  experienceDetailsForm: FormGroup;
  serviceList: any = [];
  allServices: any = {};
  categoryList: any = [];
  educationalDetails: any = [];
  experianceDetails: any = [];
  barData: any = {};
  mapOptions: any = {};
  divisionList: any = ["DISTINCTION","FIRST","SECOND","THIRD"];
  statusList: any = ["GRADUATION","POST_GRADUATION"];
  map: any;
  lat: any;
  lng: any;
  currentUser: any;
  currentPage: number = 1;
  currentPracticePage: number = 1;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  changeImage:boolean = false;
  imageUrl:string="";
  showmyimg:boolean = false;
    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild("fileInput") fileInput;

    myimage:any;
    newimg:any;
  constructor(private sanitizer: DomSanitizer, private _formBuilder: FormBuilder,private rest: RestService,private auth: AuthService,private lawyer: LawyersService,private router: Router,private adminmaster: AdminMastersService) {}

  change()
  {
    this.changeImage = true;
  }
  showProgress: boolean = false;
  progressbar:any;
  progress:any;
  AddImage()
  {
    let fi = this.fileInput.nativeElement;
   if(fi.files && fi.files[0]){
    let fileToUpload:File = fi.files[0];
    this.rest.uploadLawyerImage(this.userId,fileToUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.showProgress =true;
        // This is an upload progress event. Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.progressbar = percentDone;
        if(this.progressbar === 100)
        {
          this.showProgress = false;
        }
        // console.log(this.progress.loaded);
        console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        // this.progress.total = 100;
          this.showProgress = false;
          this.changeImage = false;
        console.log('File is completely uploaded!');
        this.rest.getImageNameByUserId(this.userId).subscribe(imgresp => {
          console.log(imgresp);
          this.rest.downloadUserImage(imgresp.imagepath,this.userId).subscribe(z=>{
            let reader = new FileReader();
          reader.addEventListener("load",()=>{
            if(reader.result != null)
            {
            this.myimage = reader.result;
            console.log("here");
            console.log(this.myimage);
            this.showmyimg = true;
            }
          },false);
          let b = new Blob([z]);
          reader.readAsDataURL(b);
        
          });
        });
        
      }
    });
   }
  }
  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
console.log(this.currentUser);
if( this.currentUser === null || this.currentUser.role != "ROLE_LAWYER")
    {
        this.router.navigate(['/login']);

    }
    var myLatlng1 = new google.maps.LatLng(21.1458, 79.0888);

    this.mapOptions = {
      zoom: 13,
      center: myLatlng1,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      // streetViewControl: false,
      // disableDefaultUI: true,    
      // streetViewControl: false,
      mapTypeControl: false,
      styles: [{
          "featureType": "water",
          "stylers": [{
              "saturation": 43
          }, {
              "lightness": -11
          }, {
              "hue": "#0088ff"
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
              "hue": "#ff0000"
          }, {
              "saturation": -100
          }, {
              "lightness": 99
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#808080"
          }, {
              "lightness": 54
          }]
      }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#ece2d9"
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#ccdca1"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#767676"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "color": "#ffffff"
          }]
      }, {
          "featureType": "poi",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [{
              "visibility": "on"
          }, {
              "color": "#b8cb93"
          }]
      }, {
          "featureType": "poi.park",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.sports_complex",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.medical",
          "stylers": [{
              "visibility": "on"
          }]
      }, {
          "featureType": "poi.business",
          "stylers": [{
              "visibility": "simplified"
          }]
      }]

  };
  
  this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
   
 
    this.userData = this.auth.getCurrentUser();
    this.userId = this.userData.id;
    console.log(this.userData);

  
    this.personalForm = this._formBuilder.group({
      id:[],
      firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          emailId: ['', Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
          mobileNum: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          role : ['ROLE_LAWYER']


    });

    this.educationalinfoForm = this._formBuilder.group({
      id:[],
      userId :this.userData.id,
      qualificationStatus: ['', Validators.required],
          university: ['', Validators.required],
          college: ['',  Validators.required],
          yearOfCompletion: ['', Validators.required],
          percent: ['', Validators.required],
          division: ['', [Validators.required]],
          speciality : ['', [Validators.required]]


    });
    this.addressForm = this._formBuilder.group({
      id: [],
      userId: this.userId,
      lat: ['', Validators.required],
      lon: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      alternativeAddress: [''],
    });

    this.barDetailsForm = this._formBuilder.group({
      id:[],
      userid: this.userId,
      bar_council: ['', Validators.required],
      bar_registration_no: ['', Validators.required]
    });

    this.experienceDetailsForm = this._formBuilder.group({
      id: [],
      userId: this.userId,
      courtName: ['', Validators.required],
      year: ['', Validators.required],
      judgement: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.servicesForm = this._formBuilder.group({
      services: ['', Validators.required],
     
    });
    
    this.addSearchForm = this._formBuilder.group({
      addSearch: ['', Validators.required],
     
    });

    
    this.personalForm.patchValue(this.userData);
    console.log(this.userId);
    // this.rest.getUserPersonalDetails(this.userId).subscribe((data) => {
    //   console.log(data);
    //   this.personalForm.patchValue(data);
    // });


    this.rest.getAllLawyersAdressDetails(this.userId).subscribe((data) => {
      console.log(data);

      this.rest.setUserAdressDetails(data);

      this.addressForm.patchValue(data);
      console.log(data.lat + "-"+ data.lon);

      if(data.lat != null && data.lon != null)
      {
        console.log(data.lat + "-"+ data.lon);
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.lat,data.lon),
          map: this.map,
          draggable:true,
          animation:google.maps.Animation.Drop
       });
       this.lat = data.lat;
       this.lng = data.lon;
       google.maps.event.addListener(marker, 'dragend', ()=>
                 {
                     let markerlatlong = marker.getPosition();
                    this.lat = marker.getPosition().lat();
                    this.lng = marker.getPosition().lng();
                    console.log(this.currentUser);  
                    console.log(this.lat+  "-"+ this.lng );
                     console.log("latlong   "+ markerlatlong);
                     console.log("lat    "+marker.getPosition().lat());
                     console.log("long   "+marker.getPosition().lng());
                 }
                 );
      }
    });

    // this.rest.getUserExpDetails(this.userId).subscribe((data) => {
    //   console.log(data);
    //   this.rest.setUserExpDetails(data);
    //   if(data.length != 0)
    //   this.lawyerinfoForm.patchValue(data[0]);
    // });
    
    this.rest.getImageNameByUserId(this.userId).subscribe(imgresp => {
      console.log(imgresp);
      this.rest.downloadUserImage(imgresp.imagepath,this.userId).subscribe(z=>{
        let reader = new FileReader();
      reader.addEventListener("load",()=>{
        if(reader.result != null)
        {
        this.myimage = reader.result;
        console.log("here");
        console.log(this.myimage);
        this.showmyimg = true;
        }
      },false);
      let b = new Blob([z]);
      reader.readAsDataURL(b);
    
      });
    });
    this.rest.getAllServices().subscribe(resp => {
      this.serviceList = resp;
      
      console.log(resp);
      this.getServicesProvided();
    });

    this.lawyer.getUserEducationalDetails(this.userId).subscribe(resp => {
      this.educationalDetails = resp;
      console.log(resp);
    });
    this.adminmaster.getAllCategories().subscribe((data) => {
      console.log(data);
      this.categoryList = data;
      // this.spinnerService.hide();
  });
  this.lawyer.getUserExpDetails(this.userId).subscribe(resp => {
    this.experianceDetails = resp;
    console.log(resp);
  });

  this.lawyer.getBarDetails(this.userId).subscribe(resp => {
    this.barData = resp;
    console.log(resp);
    this.barDetailsForm.patchValue(this.barData);
  });
  }

  getServicesProvided()
  {
    
    this.allServices.services = [];
    let lawyerServices :any = [];
    for(let i=0; i< this.serviceList.length;i++)
    {
      let providerMapping = this.serviceList[i].servicesProviderMapping;
      console.log(providerMapping);
      if(providerMapping != null)
      {
        let providers = providerMapping.providers;
        console.log(providers);
        if(providers.includes(this.userId))
        {
          lawyerServices.push(this.serviceList[i]);
          this.allServices.services.push(this.serviceList[i].serviceId);
        }
      }
    }
    this.servicesForm.patchValue(this.allServices);
    console.log(this.servicesForm.value);
  }

  updateUser()
  {
    console.log(this.personalForm.value);
    //call the required api sued during signup
    this.rest.updateUser(this.personalForm.value)
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

  updateEducationalInfo()
  {
    console.log(this.educationalinfoForm.value);
    this.educationalinfoForm.controls.userId.setValue(this.userId);
    //call the required api sued during signup
    this.lawyer.updateEducationalInfo(this.educationalinfoForm.value)
    .pipe(first())
    .subscribe(
        data => {
            // this.alert.success('Registration successful', true);
            console.log(data);
            this.lawyer.getUserEducationalDetails(this.userId).subscribe(resp => {
              this.educationalDetails = resp;
              console.log(resp);
              this.showeduForm = false;
              this.educationalinfoForm.reset();

            });
            
            },
        error => {
          console.log("error");
            // this.alert.error(error);
            // this.loading = false;
        });
  }

  updateAddress()
  {
    console.log(this.addressForm.controls.address.value);
   this.addressForm.controls.userId.setValue(this.userId);
    this.rest.updateAddress(this.addressForm.value)
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
  updateBarDetails()
  {
    console.log(this.barDetailsForm.value);
    this.lawyer.updateBarDetails(this.barDetailsForm.value)
    .pipe(first())
    .subscribe(barresp => {
      console.log(barresp);
      this.lawyer.getBarDetails(this.userId).subscribe(bardata => {
        this.barData = bardata;
      });
    });
  }
  updateExperience()
  {
    console.log(this.experienceDetailsForm.value);
    this.experienceDetailsForm.controls.userId.setValue(this.userId);
    this.lawyer.updateExperienceInfo(this.experienceDetailsForm.value)
    .pipe(first())
    .subscribe(
        data => {
            // this.alert.success('Registration successful', true);
            console.log(data);
            this.lawyer.getUserExpDetails(this.userId).subscribe(resp => {
              this.experianceDetails = resp;
              this.showexpForm = false;
              this.experienceDetailsForm.reset();
              console.log(resp);
            });
            // this.router.navigate(['/user-dashboard']);

            },
        error => {
          console.log("error");
            // this.alert.error(error);
            // this.loading = false;
        });
  }
  updateServices()
  {
    console.log(this.servicesForm.value);
    // for each service
    // get the service details and get the serviceproviders
    // update the service providers array with this userid
    // check for duplicacy also
    // update the serviceprovidermapping

    let services = this.servicesForm.controls.services.value;
    let removeServices = [];
    console.log(this.allServices.services);
    console.log(services);
    removeServices = this.allServices.services.filter(x => {
      if(!services.includes(x))
        return x;
    });
    console.log("remg services");
    console.log(removeServices);
    for(let j=0; j < removeServices.length; j++)
    {
      this.rest.getServiceById(removeServices[j]).subscribe(ser => {
        let servicesProviderMappingId = ser.servicesProviderMappingId;
        this.rest.getServiceProviderMappingById(servicesProviderMappingId).subscribe(mapping => {
          let providers = mapping.providers;
          if(providers.includes(this.userId))
          {
            // remove an element from array
            let index = providers.indexOf(this.userId);
            console.log(index);
            providers.splice(index,1);
            console.log(providers);
            let mappingProviders:any = {};
            mappingProviders.id = mapping.id;
            mappingProviders.providers = providers;
            this.rest.updateServiceProviderMapping(mappingProviders).subscribe(mappingData => {
              console.log(mappingData);
            });
          }
        });
      });
    }
    for(let i=0; i < services.length; i++)
    {
      console.log(services[i]);
      this.rest.getServiceById(services[i]).subscribe(resp => {
        console.log(resp);
        let servicesProviderMappingId = resp.servicesProviderMappingId;
        // get the serviceprovidermapping by id
        this.rest.getServiceProviderMappingById(servicesProviderMappingId).subscribe(mapping =>{
          console.log(mapping);
          let providers = mapping.providers;
          console.log(providers.includes(this.userId));
          if(!providers.includes(this.userId))
          {
            providers.push(this.userId);
            //console.log("After pushing");
            console.log(providers);
            let mappingProviders:any = {};
            mappingProviders.id = mapping.id;
            mappingProviders.providers = providers;
            this.rest.updateServiceProviderMapping(mappingProviders).subscribe(mappingData => {
              console.log(mappingData);
              // this.router.navigate(['/lawyer-dashboard']);

            })
          }
        });
      });
    }
  }
  showOnMap()
  {
    this.ViewMap = true;

  }
  searchAdd()
  {
    this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);    
    console.log(this.addSearchForm.value);
    this.lawyer.getLocation(this.addSearchForm.controls.addSearch.value).subscribe(data =>{
     console.log(data);
      this.addMarker(data);
    });
  }
  addMarker(latLong)
  {
    
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLong.results[0].geometry.location.lat,latLong.results[0].geometry.location.lng),
      map: this.map,
      draggable:true,
      animation:google.maps.Animation.Drop
   });
   this.lat = latLong.results[0].geometry.location.lat;
   this.lng = latLong.results[0].geometry.location.lng;
   google.maps.event.addListener(marker, 'dragend', ()=>
             {
                 let markerlatlong = marker.getPosition();
                this.lat = marker.getPosition().lat();
                this.lng = marker.getPosition().lng();
                console.log(this.currentUser);  
                console.log(this.lat+  "-"+ this.lng );
                 console.log("latlong   "+ markerlatlong);
                 console.log("lat    "+marker.getPosition().lat());
                 console.log("long   "+marker.getPosition().lng());
             }
             );
  }
  mapAddSave()
  {
    console.log(this.lat+  "-"+ this.lng );
    this.addressForm.controls.lat.setValue(this.lat);
    this.addressForm.controls.lon.setValue(this.lng);
    this.ViewMap = false;
    // this.stepper.selectedIndex = 2;

  }
  editeducationalDetails(item)
  {
    this.showeduForm = true;
    this.educationalinfoForm.patchValue(item);
  }
  editexperianceDetails(item)
  {
    this.showexpForm = true;
    this.experienceDetailsForm.patchValue(item);
  }
  showeducationalForm()
  {
    this.educationalinfoForm.reset();
    this.showeduForm = true;

  }
  showexperienceForm()
  {
    this.experienceDetailsForm.reset();
    this.showexpForm = true;

  }
}
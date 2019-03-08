import {Component, ElementRef, OnInit, VERSION, ViewChild,NgZone,TemplateRef,Inject,EventEmitter} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../rest.service';
import { LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../auth.service';
import { Location } from '@angular/common';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

import { MapsAPILoader } from '@agm/core';
import { Input,Output } from '@angular/core';
declare const google: any;
declare var $: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
} 

@Component({
  selector: 'app-find-lawyers',
  templateUrl: './find-lawyers.component.html',
  styleUrls: ['./find-lawyers.component.scss']
})
export class FindLawyersComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  angularVersion: string;
  ViewMap : boolean = true;
collapsed = true;
  title = 'app';
  serviceId: any;
  showBottomSheet= false;

  allservices : Array<any> = [];
  SelectedCategory: any;
  CategorySearch: boolean = true;
  CategorySearchData: Array<any> = [];
  tableData: any = [];
  showTableToggle: boolean = false;
  setDistance: any = 5.0;
  serviceData: any;
  categoryData: any;
  isCategory: boolean = true;
  locAdd: any = "";

    myFunction(id)
    {
         console.log(id);
         console.log(this.SelectedCategory);
         let obj: any = {};
         obj.providerSelected = id;
         //obj.serviceId = this.SelectedCategory[0].id;
         //hard coding to 1
         obj.serviceId = this.serviceId;
         obj.userId = this.auth.getCurrentUser().id;
         this.rest.getAllServices().subscribe((z) => {
            console.log(z);
            let service: any = {};
           service = z.find(item =>
              item.serviceId === this.serviceId
              );
            console.log(service);
            if(this.serviceId != 1 && service.servicesPaymentInfo.fees > 0)
            {
                obj.fees = service.servicesPaymentInfo.fees;
                this.router.navigate(['/payment-lawyer'],{"queryParams": obj});

              }
              else{
                this.rest.setTransaction(obj).pipe(first()).subscribe(
                    data => {
                      console.log(data);
                      this.rest.getUserInfo(id).subscribe(data =>{
                        console.log(data);
                        let senderEmailId = data.emailId; 
                        let subject = "KUBER: New Connection";
                        let msg = "A new connection for a service ";
                        msg += " is created with the lawyer ";
                        msg += data.firstName + " " + data.lastName;
                        this.rest.sendEmail(senderEmailId,subject,msg).subscribe(response => {
                          console.log(response);
                        });
              
                      });
                      // navigate to dashboard profile with lawyerid
                      console.log(this.userdata.id);
                      obj.transactionId = data.id;
                      obj.providerId = id;
                      this.router.navigate(['/lawyer-details'],{"queryParams": obj});
                    },
                    error => {
                      console.log(error);
                    }
                  );
              }
           });
        
         console.log(obj);
    }
items = [];
locations = [];
searchTerm : string ;
map: any;
userdata: any;
searchService : string;
searchCity : string;
loginFormModalEmail = new FormControl('', Validators.email);
loginFormModalPassword = new FormControl('', Validators.required);
formated_address: any = "";
myControl = new FormControl();
options: string[] = [];
data : any;
showLocation: boolean = false;

searchshow : boolean = true;
mapOptions : {};
searchControl = new FormControl();

search(): void {
  let term = this.searchTerm;
  // this.items = this.itemsCopy.filter(elem => elem.name.toLowerCase().indexOf(term) > -1);
  console.log(this.items);
}
toggleSearch(){
// this.searchshow = !this.searchshow;
}
   toggleCollapsed(): void {
     this.collapsed = !this.collapsed;
   }

constructor(private auth: AuthService,private router : Router,public _ngZone: NgZone,private modalService: NgbModal,private rest: RestService,private _location: Location,@Inject(LOCAL_STORAGE) private storage: WebStorageService,private mapsAPILoader: MapsAPILoader,private bottomSheet: MatBottomSheet) {
}

ngOnInit() {
    let add:any = this.storage.get("userAdd");
    console.log(add);
    if(add === null){
        this.userAddress = add;
        this.formated_address = this.userAddress.formatted_address;
        this.locAdd = this.userAddress.address_components[0].short_name;
        this.showLocation = true;
        $('#frameModalTop').modal({backdrop: 'static', keyboard: false});
        $('#frameModalTop').modal('show');
    }
    else{
        this.userAddress = add;
        this.formated_address = this.userAddress.formatted_address;
        this.locAdd = this.userAddress.address_components[0].short_name;
        this.showLocation = true;
    }
//     var modal = document.getElementById('frameModalTop');
// modal.backdrop = "static";
// modal.keyboard = false;

    this.userdata = this.auth.getCurrentUser();
    console.log(this.userdata);
    if(typeof this.userdata === "undefined" || this.userdata.role != "ROLE_USER")
    {
        this.router.navigate(['/login']);

    }
    
      this.rest.getAllServices().subscribe((data) => {
          console.log(data);
          // this.allservices = [];
          this.allservices = data;
        //   this.addMarker();
        });
        this.rest.getAllCategory().subscribe((data) => {
            console.log(data);
            this.CategorySearchData = data;
          });

      window["angularComponentRef"] = { component: this, zone: this._ngZone };

      this.locations = [{
          name : "faisal",
          id : "100",
          latitude : "21.1458",
          longitude : "79.0882"
      },
      {
          name : "faisal",
          id: "101",
          latitude : "20.9374",
          longitude : " 77.7796"
      }
  ];

  this.searchshow = true;
  var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
  var myLatlng1 = new google.maps.LatLng(21.1466, 79.0888);

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
  // To add the marker to the map, call setMap();
  //marker.setMap(map);
  //marker1.setMap(map);
  this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);

}
//   clicked(){
//     console.log("clicked");
// }
addMarker(user){

    // var map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
    let locLatLng = new google.maps.LatLng(user.lat, user.lon);
    var  marker = new google.maps.Marker({
        position: locLatLng,
        map: this.map
    });
    
    var infoWindow = new google.maps.InfoWindow();
    marker.addListener('click', () => {
        this.rest.getReviewsInfo(user.userId).subscribe((data) => {
            console.log(data);
            let lawyerName: string = "";
            let str: string = "";
                    this.rest.getLawyerName(user.userId).subscribe((data) => {
                        console.log(data);
                        lawyerName = data.firstName + " "+  data.lastName;
                        this.rest.getLawyerCourtDetails(user.userId).subscribe((data) => {
                            console.log(data);
                            let courtNameArray: any = [];
                            for(let i = 0;i<data.length;i++)
                            {
                                if(!courtNameArray.includes(data[i].courtName))
                                {
                                    courtNameArray.push(data[i].courtName);
                                }
                            }
                            for(let j=0;j<courtNameArray.length;j++)
                            {
                                str = courtNameArray[j] + ", "
                
                            }
                            // if (str.endsWith(", ")) {
                            //      str.substring(0, str.length() - 1);
                            //   }
                            let courtName = str.slice(0, -2);
                            // let courtName = str.substring(0, str.length() - 2);
            
            let ratings = 0;
            let winRatio = 0;
            for(let i = 0;i< data.length;i++)
            {
                ratings += data[i].ratings;
                winRatio += data[i].winRatio;
            }
            let showRating : any;
            if(ratings === 0 || isNaN(ratings))
            {
                showRating = 0;
            }else
           showRating = ratings/data.length;
            let infoContent: string = '<div><ul style="font-weight:bold;font-size:20px"> <li>Name : ' +  lawyerName +'</li><li>Court Name : ' + courtName + '</li><li>Ratings : ' +  showRating + '</li></ul><button class="btn btn-info " style="background-color: #13B9CE" onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.myFunction(\'' + user.userId + '\');})">Connect</button></div>';
            
            infoWindow.setContent(infoContent);
            // console.log("i="+i);
            console.log(marker.getPosition().lat());
            infoWindow.open(marker.get('map'), marker);
        });
    });
        });
      });
    
    }
collapseNav() {
//   if (this.navBarTogglerIsVisible()) {
//     console.log('collapseNav in NavigationComponent clicking navbarToggler')
//     this.navbarToggler.nativeElement.click();
//   }
}

private navBarTogglerIsVisible() {
//   const isVisible: boolean = (this.navbarToggler.nativeElement.offsetParent !== null);
//   return isVisible;
}

GoToLogin(){
  this.router.navigateByUrl('/login');
}
GoToSignUp(){
  this.router.navigateByUrl('/signup');
  }
  GotoProfile(){
      this.router.navigateByUrl('/profile');

  }
  modalSearch(){

  }

  SearchCategory()
  {
      this.CategorySearch = true;
      this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);  
                this.myControl.setValue(""); 
                    this.tableData = [];

  }
  SearchService()
  {
      this.CategorySearch = false;
      this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);  
                this.myControl.setValue(""); 
                this.tableData = [];

  }
  SelectCategory(item)
  {
    this.categoryData = item;
    this.isCategory = true;

    this.showTableToggle = true;
    this.categoryData = item;

    this.tableData = [];
      this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);    

         console.log(item);
      let data = this.CategorySearchData.filter(x => x.name === item);
      this.SelectedCategory = data;
      console.log(this.SelectedCategory);
      this.serviceId = 1;
      data[0].users.forEach( (value) => {
          this.rest.getUserAdressDetails(value).subscribe((x) => {
              console.log(x); 
              let o : any ={};
              o = x;
              if(x != null && x.userId != null)
         {
              this.rest.getReviewsInfo(x.userId).subscribe((data) => {
                  console.log(data);
                  let ratings = 0;
                      for(let i = 0;i< data.length;i++)
                      {
                          ratings += data[i].ratings;
                      }
                      console.log(ratings);
                      if(ratings === 0 || isNaN(ratings))
                      {
                          o.ratings = 0;
                      }
                      else
                      o.ratings = ratings/data.length;
                      let lawyerName: string = "";
                      let str: string = "";
                              this.rest.getLawyerName(x.userId).subscribe((data) => {
                                  console.log(data);
                                  lawyerName = data.firstName + " "+  data.lastName;
                                  this.rest.getLawyerCourtDetails(x.userId).subscribe((data) => {
                                      console.log(data);
                                      let courtNameArray: any = [];
                                      for(let i = 0;i<data.length;i++)
                                      {
                                          if(!courtNameArray.includes(data[i].courtName))
                                          {
                                              courtNameArray.push(data[i].courtName);
                                          }
                                      }
                                      for(let j=0;j<courtNameArray.length;j++)
                                      {
                                          str = courtNameArray[j] + ", "
                          
                                      }
                                      // if (str.endsWith(", ")) {
                                      //      str.substring(0, str.length() - 1);
                                      //   }
                                      let courtName = str.slice(0, -2);
                                      o.courtName = courtName;
                                      o.lawyerName = lawyerName;
                                  });
                              });
                  });
            //   this.addMarker(x);
            //   this.tableData.push(o);
             let markerLoc = new google.maps.LatLng(x.lat, x.lon);
             let add:any = this.storage.get("userAdd");
                const center = new google.maps.LatLng(add.lat, add.lng);
                const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
                console.log(distanceInKm);
                if(distanceInKm <  this.setDistance)
                {
                        this.addMarker(x);
                        this.tableData.push(o);
                }
                
              }
              });
              // this.addMarker(user);
      });

      
 }
 SelectService(item){
    this.isCategory = false;
    this.serviceData = item;

  this.showTableToggle = true;
  this.tableData = [];
    this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);    

    console.log(item);
    let data = this.allservices.filter(x => x.servicesBasicInfo.displayName === item);
    // this.SelectedService = data[0];
    // console.log(this.SelectedService);
    this.serviceId = data[0].servicesBasicInfo.serviceId;
    data[0].servicesProviderMapping.providers.forEach( (value) => {
     this.rest.getUserAdressDetails(value).subscribe((x) => {
         console.log(x); 
         let o : any ={};
         o = x;
         if(x != null && x.userId != null)
         {
         this.rest.getReviewsInfo(x.userId).subscribe((data) => {
             console.log(data);
             let ratings = 0;
                 for(let i = 0;i< data.length;i++)
                 {
                     ratings += data[i].ratings;
                 }
                 console.log(ratings);
                 if(ratings === 0 || isNaN(ratings))
                 {
                     o.ratings = 0;
                 }
                 else
                 o.ratings = ratings/data.length;
             });
             let lawyerName: string = "";
             let str: string = "";
                     this.rest.getLawyerName(x.userId).subscribe((data) => {
                         console.log(data);
                         lawyerName = data.firstName + " "+  data.lastName;
                         this.rest.getLawyerCourtDetails(x.userId).subscribe((data) => {
                             console.log(data);
                             let courtNameArray: any = [];
                             for(let i = 0;i<data.length;i++)
                             {
                                 if(!courtNameArray.includes(data[i].courtName))
                                 {
                                     courtNameArray.push(data[i].courtName);
                                 }
                             }
                             for(let j=0;j<courtNameArray.length;j++)
                             {
                                 str = courtNameArray[j] + ", "
                 
                             }
                             // if (str.endsWith(", ")) {
                             //      str.substring(0, str.length() - 1);
                             //   }
                             let courtName = str.slice(0, -2);
                             o.courtName = courtName;
                             o.lawyerName = lawyerName;
                         });
                     });
        //  this.addMarker(x);
        //  this.tableData.push(o);
        //     }
        let markerLoc = new google.maps.LatLng(x.lat, x.lon);
        let add:any = this.storage.get("userAdd");
        const center = new google.maps.LatLng(add.lat, add.lng);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
        console.log(distanceInKm);
        if(distanceInKm <  this.setDistance)
        {
                this.addMarker(x);
                this.tableData.push(o);
        }
        }
         });
        
         // this.addMarker(user);
 });   
}
  ShowMap()
  {
      this.ViewMap = true;

  }
  ShowTable()
  {
      this.ViewMap = false;

  }
  public updated() {
    this.options = [];
    if (this.myControl.value.length > 0) {
      //let all = ['John', 'Jenny', 'Jonson']
      let all = this.CategorySearchData;
      let searchedWord = this.myControl.value
      for(let key in all) {
        //   console.log(all[key]);
        let r = all[key].name.search(new RegExp(searchedWord, "i"));
        if (r != -1) {
          this.options.push(all[key])
        }
      }
    } else {
      this.options = []
    }
  }
  public updatedService() {
    this.options = [];
    if (this.myControl.value.length > 0) {
      //let all = ['John', 'Jenny', 'Jonson']
      let all = this.allservices;   
      let searchedWord = this.myControl.value
      for(let key in all) {
          console.log(all[key].servicesBasicInfo);
        let r = all[key].servicesBasicInfo.displayName.search(new RegExp(searchedWord, "i"));
        if (r != -1) {
          this.options.push(all[key]);
          console.log(all[key].servicesBasicInfo);
        }
      }
      console.log(this.options);
    } else {
      this.options = []
    }
  }

  showMap()
  {
      this.ViewMap = true;
  }
  showTable()
  {
      this.ViewMap = false;
  }
  goToBack()
{
  this._location.back();

}
openBottomSheet(): void {
    // this.bottomSheet.open(BottomSheet);
    this.showBottomSheet = true;

  }
addresses:any = [];
addSearchTerm:string = "";
@ViewChild("search")
public searchElementRef: ElementRef;
ngAfterViewInit() {
this.searchAdd();
}
userAddress:any = {};
searchAdd()
{
  this.mapsAPILoader.load().then(() => {
      
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
     
      autocomplete.addListener("place_changed", () => {
          //this.invokeEvent(autocomplete.getPlace());
          console.log(autocomplete.getPlace());
          this.userAddress = autocomplete.getPlace();
          var lat = this.userAddress.geometry.location.lat();
          // get lng
          var lng = this.userAddress.geometry.location.lng();
          // console.log(lat+"-"+lng);
          this.userAddress.lat = lat;
          this.userAddress.lng = lng;
          // console.log(this.userAddress);
          this.storage.set("userAdd",this.userAddress);
          this.formated_address = this.userAddress.formatted_address;
          this.locAdd = this.userAddress.address_components[0].short_name;
          this.showLocation = true;
          this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);    
          this.setDistance = 5.0;
          this.myControl.setValue("");  
          this.tableData = [];

        //   if(this.isCategory)
        //   {
        //       this.SelectCategory(this.categoryData);
        //   }
        //   else{
        //       this.SelectService(this.serviceData);
        //   }
          // $("#frameModalTop").modal("hide"); 
          // jQuery("#frameModalTop").modal("hide");
          this.closeBtn.nativeElement.click();
                  this.searchControl.setValue("");

     
      });
    });

}
@Input() adressType: string;
@ViewChild('addresstext') addresstext: any;
@Output() setAddress: EventEmitter<any> = new EventEmitter();
invokeEvent(place: Object) {
  this.setAddress.emit(place);
}
setditancekm(data)
{
  this.setDistance = data;
  console.log(this.setDistance);
  if(this.isCategory)
  {
      this.SelectCategory(this.categoryData);
  }
  else{
      this.SelectService(this.serviceData);
  }
}


}


@Component({
    selector: 'bottom-sheet',
    templateUrl: 'bottom-sheet.html',
  })
  export class BottomSheet {
      show: false;
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}
  
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
    closeBottomSheet()
    {
        this.bottomSheetRef.dismiss();

    }
  }
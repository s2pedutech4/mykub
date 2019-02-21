import {Component,  ElementRef,EventEmitter,  OnInit, VERSION, ViewChild,NgZone,TemplateRef, SystemJsNgModuleLoader} from '@angular/core';
import { ROUTES } from '../components/sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../rest.service';
import { LawyersService } from '../services/lawyers/lawyers.service';

// import {Directive, EventEmitter, Output} from '@angular/core';
// import {NgModel} from '@angular/forms';
//import { } from 'googlemaps';
//import {} from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Input,Output } from '@angular/core';
//declare const google = require('@types/googlemaps');
declare var System:any;

declare const google : any;
 

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
} 
@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss']
})
export class NewNavbarComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  @ViewChild('wizard') public wizardRef: TemplateRef<any>;
  @ViewChild('closeBtn') closeBtn: ElementRef;

    angularVersion: string;
    ViewMap : boolean = true;
  collapsed = true;
  map: any;
  serviceId: any;
  SelectedCategory: any;
  SelectedService: any;
  addSearchForm: FormGroup;
  CategorySearch: boolean = true;
  tableTitle: any = "Services";
  showTableToggle: boolean = false;
  CategorySearchData: Array<any> = [];
//   ServiceSearchData: Array<any> = [];
  title = 'app';
    allservices : Array<any> = [];
    myFunction(id)
    {
         console.log(id);
         console.log(this.SelectedCategory);
         let obj: any = {};
         obj.providerSelected = id;
         //obj.serviceId = this.SelectedCategory[0].id;
         //hard coding to 1
         obj.serviceId = this.serviceId;
         console.log(obj);
        this.router.navigate(['/login'] ,{ "queryParams":obj });
    }
items = [];
locations = [];
tableData:any = [];
searchTerm : string ;
searchService : string;
searchCity : string;
loginFormModalEmail = new FormControl('', Validators.email);
loginFormModalPassword = new FormControl('', Validators.required);

myControl = new FormControl();
  options: string[] = [];
  data : any;

searchshow : boolean = true;
mapOptions : {};
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
    
	constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private router : Router,public _ngZone: NgZone,private modalService: NgbModal,private rest: RestService,private lawyer: LawyersService,private _formBuilder: FormBuilder) {

    }
   

	ngOnInit() {
       console.log("in on init");
    // this.autocomplete = new google.maps.places.Autocomplete(input, {});
        // google.maps.event.addListener(this.autocomplete, 'place_changed', ()=> {
        //   var place = this.autocomplete.getPlace();
        //   this.invokeEvent(place);
    
        // });
        this.addSearchForm = this._formBuilder.group({
            addSearch: ['', Validators.required],
           
          });
        this.rest.getAllServices().subscribe((data) => {
            console.log(data);
            // this.allservices = [];
            this.allservices = data;
            // this.addMarker();
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
    this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
  }

addMarker(user){
console.log(user);
// var map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
let locLatLng = new google.maps.LatLng(user.lat, user.lon);
console.log(locLatLng);
var  marker = new google.maps.Marker({
    position: locLatLng,
    map: this.map
});


var infoWindow = new google.maps.InfoWindow();
marker.addListener('click', () => {
  
    this.rest.getReviewsInfo(user.userId).subscribe((data) => {
        console.log(data);
        // this.rest.getLawyerProfileInfo(user.userId).subscribe((data) => {
        //     console.log(data);
        // });
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
            console.log(ratings);
            console.log(winRatio);
            console.log(lawyerName);
            console.log(str);
            let infoContent: string = '<div><ul style="font-weight:bold;font-size:20px"> <li>Name : ' +  lawyerName +'</li><li>Court Name : ' + courtName + '</li><li>Ratings : ' +  showRating + '</li></ul><button class="btn btn-info " style="background-color: #13B9CE" onclick="window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.myFunction(\'' + user.userId + '\');})">Connect to Lawyer</button></div>';
            
        
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
		if (this.navBarTogglerIsVisible()) {
			console.log('collapseNav in NavigationComponent clicking navbarToggler')
			this.navbarToggler.nativeElement.click();
		}
	}

	private navBarTogglerIsVisible() {
		const isVisible: boolean = (this.navbarToggler.nativeElement.offsetParent !== null);
		return isVisible;
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
    }
    SearchService()
    {
        this.CategorySearch = false;
    }
    SelectCategory(item)
    {
        this.tableData = [];
        this.showTableToggle = true;
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
                this.addMarker(x);
                this.tableData.push(o);
                }
                });
               
                // this.addMarker(user);
        });

        
   }
   SelectService(item){
    this.showTableToggle = true;
    this.tableData = [];
    this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);    
 
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
            this.addMarker(x);
            this.tableData.push(o);
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
          console.log(this.options);
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

      addresses:any = [];
      addSearchTerm:string = "";
      @ViewChild("search")
  public searchElementRef: ElementRef;
  searchControl = new FormControl();
  ngAfterViewInit() {
    this.searchAdd();
}
userAddress:string = "";
      searchAdd()
      {
        this.mapsAPILoader.load().then(() => {
            
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ["address"]
            });
           
            autocomplete.addListener("place_changed", () => {
                //this.invokeEvent(autocomplete.getPlace());
                console.log(autocomplete.getPlace().formatted_address);
                this.userAddress = autocomplete.getPlace().formatted_address;
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
    
}
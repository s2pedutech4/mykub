import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { BASE_URL } from './base-url';
//import { RestService } from './rest.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentuser: any;
  token: string='';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     // 'withCredentials' : 'true'
    })
  };
   myOptions = {
    //params: myp,
    headers: null
  };
  constructor(private router: Router, private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  setAuthToken(token)
  {
    this.httpOptions.headers = new HttpHeaders({'Content-Type':  'application/json'});
    this.httpOptions.headers = this.httpOptions.headers.append("Authorization","Bearer " + token);
    this.token = token;
    this.myOptions.headers = this.httpOptions.headers;
    // store in localstorage for the browser refresh
    this.storage.set("token",token);
    console.log(this.token);
    console.log(this.httpOptions.headers);
  }
  getMyoptions(){
    if(this.myOptions.headers == null)
    {
    console.log("Getting options here");
    let o = this.storage.get("token");
    console.log(o);
    if(o==null)
    {
      console.log("Navigating to login page");
      this.router.navigateByUrl('');
    }
    this.setAuthToken(o);
    }
    return this.myOptions;
    
  }
  getAuthToken(){
    return this.token;
  }

  sendOTP(num): Observable<any>{
    //generate otp here
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    var otp = "123456";
    var otpurl = "http://sms.smsmob.in/api/mt/SendSMS?user=s2pedutech&password=s2p@321&senderid=WEBSMS&channel=Trans&DCS=0&flashsms=0&number=";
  otpurl += num;
  otpurl += "&text=" + val + "&route=8";
  this.storage.set('otp',val);
    return this.http.get(otpurl).pipe(
      catchError(this.handleError<any>('otp send failed'))
    );
  }
  Register(registerdata): Observable<any>{
    return this.http.post<any>(BASE_URL + 'rest/user/register', JSON.stringify(registerdata), this.httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  getUserByEmail(email): Observable<any>{
    return this.http.get(BASE_URL + 'rest/user/find/email?emailId='+email,this.myOptions).pipe(
      map(this.extractData));
  }
  getUserByMobile(mobileno): Observable<any>{
    return this.http.get(BASE_URL + 'rest/user/find/mobnum?mobnum='+mobileno,this.myOptions).pipe(
      map(this.extractData));
  }
  updateUserById(registerdata): Observable<any>{
    return this.http.post<any>(BASE_URL + 'rest/user/'+ registerdata.id, JSON.stringify(registerdata), this.httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  verifyUser(id)
  {
    let o : any ={};
    o.email_verified = false;
    o.admin_verified = false;
    o.userid = id
    return this.http.post<any>(BASE_URL + 'rest/userVerify', JSON.stringify(o), this.httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  LogOut(): Observable<any>{
    this.currentuser = null;
    this.token = null;
    this.storage.remove("token");
    this.storage.remove("currentuser");
    this.storage.remove("otp");
    // this.storage.remove("userAdd");


    // this.setAuthToken(null);
    // this.rest.setAuthToken(null);
    return this.http.get(BASE_URL + 'rest/token/logout', this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }

  Login(logindata): Observable<HttpResponse<any>>{
   var myParams: HttpParams = new HttpParams();
  //  myParams.append('username',logindata.username);
  //  myParams.append('password',logindata.password);

   var myp:any = {};
   myp.username = logindata.username;
   myp.password = logindata.password;
   let str = logindata.username + ":" + logindata.password;
   
  //  var myOptions = {
  //    //params: myp,
  //    headers: this.httpOptions.headers,
  //    observe: 'response'
  //  };
   
   //console.log(myOptions);
   //var proxy = 'https://cors-anywhere.herokuapp.com/';
   var url =  BASE_URL + 'access/login';
   var url1 = BASE_URL + 'rest/token/generate-token';
   console.log(url1);
   let ch = new HttpHeaders({"Content-Type":"application/json"});
   return this.http.post<any>(url1, myp,{headers: ch, observe: 'response'}).pipe(
      catchError(this.handleError<any>('Login Failure'))
    );
  }

  setCurrentUser(userData){
    this.currentuser = userData;
    this.storage.set("currentuser",userData);

    console.log(this.currentuser);
  }
  getCurrentUser()
  {
    console.log(this.currentuser);
    if(this.currentuser === null || typeof this.currentuser === "undefined")
    {
      let o = this.storage.get("currentuser");
    if(o === null || typeof o === "undefined")
    {
      return null;
    }
    else{
      this.currentuser = o
      return o;
    }
    }
    else
    return this.currentuser;
  }
  getUserByName(name): Observable<any>
  {
  // this.httpOptions.headers.append("Authorization","XMLHttpRequest");
   
   
   console.log(this.token);
   console.log(this.myOptions);
   let ch = new HttpHeaders({"Content-Type":"application/json", "Authorization": "Bearer " + this.token});
   console.log(this.httpOptions.headers);
    var url = BASE_URL + 'rest/user/find/username?username=' + name;
    return this.http.get(url, this.myOptions ).pipe(
      map(this.extractData));
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }
  showNotification(from, align,message){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}

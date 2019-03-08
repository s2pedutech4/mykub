import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEventType,HttpEvent,HttpResponse} from '@angular/common/http';
import {ResponseContentType, Http} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { BASE_URL } from './base-url';
import { first,last } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  User_Adress_Details: any;
  User_Exp_Details: any;
 
token: string = '';
httpOptions = {
  headers: new HttpHeaders({
   // 'Content-Type':  'application/json'
   // 'withCredentials' : 'true'
  })
};
 myOptions = {
  headers: null
};
  constructor(private http: HttpClient, private http1: Http, private auth:AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {


   }

  

   setAuthToken(token)
   {
    this.httpOptions.headers = new HttpHeaders({'Content-Type':  'application/json'});
     this.httpOptions.headers = this.httpOptions.headers.append("Authorization","Bearer " + token);
     this.token = token;
     this.myOptions.headers = this.httpOptions.headers;
    //  this.storage.set("token",token);
    //  console.log(this.token);
    //  console.log(this.httpOptions.headers);
    // console.log(this.myOptions);
    // if(this.myOptions.headers === null)
    // {
    //   this.myOptions = this.auth.getMyoptions();
    // }
   }
   getAll(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/user/getAll',this.myOptions).pipe(
      map(this.extractData));
  }
  getAllServices(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/kuber_services/details',this.myOptions).pipe(
      map(this.extractData));
  }
  
  getServiceById(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/kuber_services/' + id,this.myOptions).pipe(
      map(this.extractData));
  }
  getServiceProviderMappingById(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/services_provider_mapping/' + id,this.myOptions).pipe(
      map(this.extractData));
  }
  
  updateServiceProviderMapping(data): Observable<any>{
    this.myOptions = this.auth.getMyoptions();
    let url = BASE_URL + 'rest/services_provider_mapping/'+ data.id;
    return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  getAllConnections(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/office_details',this.myOptions).pipe(
      map(this.extractData));
  }

  getAvailService(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/services_availed/find/userId?userId=' + id,this.myOptions).pipe(
      map(this.extractData));
  }
  
  
  
  getTransaction(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/kuber_services_transaction/' + id,this.myOptions).pipe(
      map(this.extractData));
  }
  getAllCategory(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/category',this.myOptions).pipe(
      map(this.extractData));
  }

  getReviewsInfo(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/reviews/find/userId?userId='+id,this.myOptions).pipe(
      map(this.extractData));
  }
  getLawyerInfo(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/lawyers_info/find_by/user_id?userId='+id,this.myOptions).pipe(
      map(this.extractData));
  }

  getLawyerProfileInfo(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/lawyers_info/find_by/user_id?userId='+id,this.myOptions).pipe(
      map(this.extractData));
  }

  getUserInfo(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/user/'+id,this.myOptions).pipe(
      map(this.extractData));
  }
  updateUser(data): Observable<any>{
    this.myOptions = this.auth.getMyoptions();
    let url = BASE_URL + 'rest/user/'+ data.id;
    return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateAddress(registerdata): Observable<any>{
    this.myOptions = this.auth.getMyoptions();
    let url = BASE_URL +'rest/office_details';
    if(registerdata.id != null)
    {
        url += '/' + registerdata.id;
    }
    console.log(url);
    return this.http.post<any>(url, JSON.stringify(registerdata), this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateExperience(registerdata): Observable<any>{
    this.myOptions = this.auth.getMyoptions();
    let url = BASE_URL +'rest/lawyers_info';
    if(registerdata.id != null)
    {
        url += '/' + registerdata.id;
    }
    console.log(url);
    return this.http.post<any>(url, JSON.stringify(registerdata), this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }


  getUserPersonalDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/user/'+id,this.myOptions).pipe(
      map(this.extractData));
  }
 
  getServiceDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/services_basic_info/'+id,this.myOptions).pipe(
      map(this.extractData));
  }
  
  UploadDocument(id,file): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    let input = new FormData();
    input.append("file",file);
    let url = BASE_URL + 'rest/kuber_services_transaction/'+ id+ '/upload?userId=' + this.auth.getCurrentUser().id ;
    return this.http.post<any>(url,input,this.myOptions).pipe(
      map(this.extractData));
  }
  
  getLawyerImage(userid)
  {

  }
  uploadLawyerImage(userid, file)
  {
    this.myOptions = this.auth.getMyoptions();
    var input = new FormData();
    input.append("file",file);
    let url = BASE_URL + 'rest/userimage?userId='+ userid; 
    var o:any = this.myOptions;
    
    let o1: any = {};
    //o1.headers = new HttpHeaders({'Content-Type':  'multipart/form-data'});
    o1.headers = new HttpHeaders({});
    this.token = this.storage.get('token');
    console.log(this.token);
    o1.headers = o1.headers.append("Authorization","Bearer " + this.token);
    o1.reportProgress = true;
    o.reportProgress = true;
    console.log("OPTIONS");
    console.log(o1);
    console.log(input);
    const req = new HttpRequest('POST', url, input, o1);

    // return this.http.request(req).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap(message => this.showProgress(message)),
    //   last(), // return last (completed) message to caller
    //   catchError(this.handleError(file))
    // );
    return this.http.request(req).pipe(
    // map(this.extractData));
    );
  }
  uploadDocument(id, file)
  {
    this.myOptions = this.auth.getMyoptions();
    var input = new FormData();
    input.append("file",file);
    let url = BASE_URL + 'rest/kuber_services_transaction/'+ id+ '/upload' ; 
    var o:any = this.myOptions;
    
    var o1: any = {};
    //o1.headers = new HttpHeaders({'Content-Type':  'multipart/form-data'});
    o1.headers = new HttpHeaders({});
    // this.token = this.storage.get('token');
    o1.headers = o1.headers.append("Authorization","Bearer " + this.token);
    o1.reportProgress = true;
    o.reportProgress = true;
    console.log("OPTIONS");
    console.log(o1);
    console.log(input);
    const req = new HttpRequest('POST', url, input, o1);

    // return this.http.request(req).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap(message => this.showProgress(message)),
    //   last(), // return last (completed) message to caller
    //   catchError(this.handleError(file))
    // );
    return this.http.request(req).pipe(
    // map(this.extractData));
    );
    

  }

  sendEmail(to,subject,msg)
  {
    
    let httpOptions = {
      headers: new HttpHeaders({
       // 'Content-Type':  'application/json'
       // 'withCredentials' : 'true'
      })
    };
     let myOptions = {
      headers: null
    };

    httpOptions.headers = new HttpHeaders({'Content-Type':  'application/json'});
    let token="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";
     //httpOptions.headers = httpOptions.headers.append("Authorization","Bearer " + token);
     httpOptions.headers = httpOptions.headers.append("Access-Control-Allow-Origin","*");
     myOptions.headers = httpOptions.headers;

     let fburl = "https://us-central1-kuber-1df86.cloudfunctions.net/httpEmail";
     let params = new HttpParams();
     params.set('to','gandharpatwardhan@s2pedutech.com');
     params.set('from','gandharpatwardhan@s2pedutech.com');
     params.set('subject','Test email with fb');
     params.set('content','hello world convention');
     let data:any = {};
     data.to = to;
     data.from = "admin@fordit.com";
     data.subject = subject;
     data.content = msg;

     return this.http.post<any>(fburl, data, myOptions).pipe(
      catchError(this.handleError<any>('send mail failed'))
    );
  }
  
  uploadOutputDocument(id, file)
  {
    this.myOptions = this.auth.getMyoptions();
    var input = new FormData();
    input.append("file",file);
    let url = BASE_URL + 'rest/kuber_services_transaction/'+ id+ '/upload/output' ; 
    var o:any = this.myOptions;
    o.reportProgress = true;
    console.log("OPTIONS");
    console.log(o);
    console.log(input);

    var o1: any = {};
    //o1.headers = new HttpHeaders({'Content-Type':  'multipart/form-data'});
    o1.headers = new HttpHeaders({});
    this.token = this.storage.get('token');
    o1.headers = o1.headers.append("Authorization","Bearer " + this.token);
    o1.reportProgress = true;

    const req = new HttpRequest('POST', url, input, o1);

    // return this.http.request(req).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap(message => this.showProgress(message)),
    //   last(), // return last (completed) message to caller
    //   catchError(this.handleError(file))
    // );
    return this.http.request(req).pipe(
    // map(this.extractData));
    );
    

  }

  showProgress(m)
  {
      console.log(m);
  }

  getImageNameByUserId(userid): Observable<any>
  {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/userimage/findByUserId?userId='+userid, this.myOptions).pipe(
      map(this.extractData));
  }
  downloadUserImage(file,id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    let o1: any = {};
    o1.headers = new HttpHeaders({});
    //o1.headers = o1.headers.append("Content-Type", "application/json");
    this.token = this.storage.get('token');
    console.log(this.token);
    o1.headers = o1.headers.append("Authorization","Bearer " + this.token);
    o1.responseType = 'blob' as 'json';

   // o1.headers = o1.headers.append("responseType",ResponseContentType.Blob);
    console.log(o1);
    let o2:any = {};
    o2.headers = o1;
    
    return this.http.get(BASE_URL + 'rest/userimage/getUserImg/download?userId='+id+ '&filename='+ file,o1);
  }

  downloadDocument(file,id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    let o1: any = {};
    o1.headers = new HttpHeaders({});
    //o1.headers = o1.headers.append("Content-Type", "application/json");
    this.token = this.storage.get('token');
    o1.headers = o1.headers.append("Authorization","Bearer " + this.token);
    o1.responseType = 'blob' as 'json';

   // o1.headers = o1.headers.append("responseType",ResponseContentType.Blob);
    console.log(o1);
    let o2:any = {};
    o2.headers = o1;
    
    return this.http.get(BASE_URL + 'rest/kuber_services_transaction/download/'+file+ '/'+ id,o1);
  }
  /** Return distinct message for sent, upload progress, & response events */
private getEventMessage(event: HttpEvent<any>, file: File) {
  switch (event.type) {
    case HttpEventType.Sent:
      return `Uploading file "${file.name}" of size ${file.size}.`;

    case HttpEventType.UploadProgress:
      // Compute and show the % done:
      const percentDone = Math.round(100 * event.loaded / event.total);
      return `File "${file.name}" is ${percentDone}% uploaded.`;

    case HttpEventType.Response:
      return `File "${file.name}" was completely uploaded!`;

    default:
      return `File "${file.name}" surprising upload event: ${event.type}.`;
  }
}
  setUserAdressDetails(UserAddDetails){
      this.User_Adress_Details = UserAddDetails;
  }
  getUserAdressDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/office_details/findlawyer/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  
  getAllLawyersAdressDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/office_details/find/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
    getUserReviews(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/reviews/find/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  setTransaction(transactionData):Observable<any>
  {
    this.myOptions = this.auth.getMyoptions();
    let url = BASE_URL + 'rest/kuber_services_transaction?serviceId=' + transactionData.serviceId;
    url += '&providerSelected=' + transactionData.providerSelected + '&userId=' + transactionData.userId;
    return this.http.post<any>(url, null, this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  setUserExpDetails(UserAddDetails){
    this.User_Exp_Details = UserAddDetails;
}
  getUserExpDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/lawyers_info/find_by/user_id?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

   DownloadDoc(id,item):Observable<any>
   {
    this.myOptions = this.auth.getMyoptions();
     let url = BASE_URL + 'rest/kuber_services_transaction/transaction/delete/' + id;
     url += '?fileName=' + item;
     return this.http.post<any>(url, null, this.myOptions).pipe(
       catchError(this.handleError<any>('addProduct'))
     );
   }

   DeleteDoc(id,item):Observable<any>
   {
    this.myOptions = this.auth.getMyoptions();
     let url = BASE_URL + 'rest/kuber_services_transaction/transaction/delete/' + id;
     url += '?fileName=' + item;
     return this.http.post<any>(url, null, this.myOptions).pipe(
       catchError(this.handleError<any>('addProduct'))
     );
   }

   SendReview(data):Observable<any>
   {
    this.myOptions = this.auth.getMyoptions();
     let url = BASE_URL + 'rest/reviews';
     return this.http.post<any>(url, JSON.stringify(data), this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
   }

   SendMessage(data):Observable<any>
   {
    this.myOptions = this.auth.getMyoptions();
     let url = BASE_URL + 'rest/forum/message';
     return this.http.post<any>(url, JSON.stringify(data), this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
   }
 
   getForumData(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/forum/' + id, this.myOptions).pipe(
      map(this.extractData));
  }
  getLawyerName(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/user/lawyername/' + id, this.myOptions).pipe(
      map(this.extractData));
  }
  getLawyerCourtDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/practice_details/find/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

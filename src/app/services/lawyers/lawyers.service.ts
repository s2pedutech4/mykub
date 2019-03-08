import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEventType,HttpEvent,HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { BASE_URL } from '../../base-url';
import { first,last } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { httpFactory } from '@angular/http/src/http_module';

@Injectable({
  providedIn: 'root'
})
export class LawyersService {

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
    constructor(private http: HttpClient, private auth:AuthService) {
  
  
     }

     
     getAllTransaction(id): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/kuber_services_transaction/find/provider?providerId='+id,this.myOptions).pipe(
        map(this.extractData));
    }

    uploadOutputDocument(id, file)
  {
    var input = new FormData();
    input.append("file",file);
    let url = BASE_URL + 'rest/kuber_services_transaction/'+ id+ '/upload';
    var o:any = this.myOptions;
    o.reportProgress = true;
    const req = new HttpRequest('POST', url, input, o);

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

  getLocation(term: string):Observable<any> {
    
         return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+term+'+CA&key=AIzaSyDfakKA3ZoyTGjee0GZ68rklsK0lT6ska0').pipe(
           map(this.extractData));
  }

  
  getPlaces(term: string):Observable<any> {
   
    // return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+term+'+CA&key=AIzaSyC9vfNOYPOdLo1O3HpllHSwUzDlbmvD72E').pipe(
    //   map(this.extractData));
    // return this.http.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/output?input='+term+'+CA&key=AIzaSyC9vfNOYPOdLo1O3HpllHSwUzDlbmvD72E').pipe(
    //   map(this.extractData));
      let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDfakKA3ZoyTGjee0GZ68rklsK0lT6ska0";
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.get(url, httpOptions).pipe(map(this.extractData));
}

  updateEducationalInfo(registerdata): Observable<any>{
    let url = BASE_URL +'rest/educational_qualification';
    this.myOptions = this.auth.getMyoptions();
    if(registerdata.id != null)
    {
        url += '/' + registerdata.id;
    }
    console.log(url);
    return this.http.post<any>(url, JSON.stringify(registerdata), this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
      
  getAllEducationalDetails(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/educational_qualification',this.myOptions).pipe(
      map(this.extractData));
  }

  getLawyerBarDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/bar_details/findByUserId?userId' + id,this.myOptions).pipe(
      map(this.extractData));
  }
  updateBarDetails(barData) : Observable<any>
  {
    console.log(barData);
    let url = BASE_URL+ "rest/bar_details";
    this.myOptions = this.auth.getMyoptions();
    if(barData.id != null)
    {
      url += '/' + barData.id;
    }
    return this.http.post<any>(url, JSON.stringify(barData), this.myOptions).pipe(
      catchError(this.handleError<any>('add Bar Details'))
    );
  }

  updateExperienceInfo(registerdata): Observable<any>{
    let url = BASE_URL +'rest/practice_details';
    this.myOptions = this.auth.getMyoptions();
    if(registerdata.id != null)
    {
        url += '/' + registerdata.id;
    }
    console.log(url);
    return this.http.post<any>(url, JSON.stringify(registerdata), this.myOptions).pipe(
      catchError(this.handleError<any>('add Experience Details'))
    );
  }

  getAllExperienceDetails(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/practice_details',this.myOptions).pipe(
      map(this.extractData));
  }

  getBarDetails(id):Observable<any>
  {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/bar_details/findByUserId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  getUserExpDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/practice_details/find/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  getUserEducationalDetails(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/educational_qualification/find_by_user?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  
  markVerify(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/userVerify/userId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  unmarkVerify(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/userVerify/reject/userId?userId='+id, this.myOptions).pipe(
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
    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }
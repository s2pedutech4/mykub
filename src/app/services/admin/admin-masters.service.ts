import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEventType,HttpEvent,HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { BASE_URL } from '../../base-url';
import { first,last } from 'rxjs/operators';
import { AuthService } from '../../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminMastersService {

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
     getAllTransaction(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/kuber_services_transaction' ,this.myOptions).pipe(
        map(this.extractData));
    }
     getAllAdminConnections(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/user/find/admins',this.myOptions).pipe(
        map(this.extractData));
    }

     getAllAdmins(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/user/find/admins',this.myOptions).pipe(
        map(this.extractData));
    }
    getAllProviders(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/user/find/lawyers',this.myOptions).pipe(
        map(this.extractData));
    }
    getKuberServiceById(id) : Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/kuber_services/' + id,this.myOptions).pipe(
        map(this.extractData));
    }
    getKuberServiceBasicInfoById(id) : Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/services_basic_info/' + id,this.myOptions).pipe(
        map(this.extractData));
    }
    getKuberServiceDescriptionById(id) : Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/services_description/' + id,this.myOptions).pipe(
        map(this.extractData));
    }

    getKuberServicePaymentInfoById(id) : Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/services_payment_info/' + id,this.myOptions).pipe(
        map(this.extractData));
    }
    getKuberServiceProviderMappingById(id) : Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/services_provider_mapping/' + id,this.myOptions).pipe(
        map(this.extractData));
    }

    getAllServices_Basic(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/kuber_services/service/basic',this.myOptions).pipe(
        map(this.extractData));
    }
     addCategory(data): Observable<any>{
      let url = BASE_URL + 'rest/category';
      this.myOptions = this.auth.getMyoptions();
      if(data.id != null){
        url = BASE_URL + 'rest/category/'+ data.id;
      }
      console.log(this.myOptions);
      return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
        catchError(this.handleError<any>('addProduct'))
      );
    }
    getAllCategories(): Observable<any> {
      this.myOptions = this.auth.getMyoptions();
      return this.http.get(BASE_URL + 'rest/category',this.myOptions).pipe(
        map(this.extractData));
    }
    deleteCategory(id):Observable<any>
   {
     let url = BASE_URL + 'rest/category/' + id;
     this.myOptions = this.auth.getMyoptions();
     console.log(this.myOptions);
     return this.http.delete(url, this.myOptions).pipe(
       catchError(this.handleError<any>('addProduct'))
     );
   }
   deleteServices(id):Observable<any>
   {
    let url = BASE_URL + 'rest/kuber_services/' + id;
    this.myOptions = this.auth.getMyoptions();
    console.log(this.myOptions);
    return this.http.delete(url, this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
   addBank(data): Observable<any>{
    let url = BASE_URL + 'rest/bank_master';
    this.myOptions = this.auth.getMyoptions();
    if(data.id != null){
      url = BASE_URL + 'rest/bank_master/'+ data.id;
    }
    console.log(this.myOptions);
    return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    );
  }
  getAllBanks(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/bank_master',this.myOptions).pipe(
      map(this.extractData));
  }
  getLawyerStatus(id): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/userVerify/findByUserId?userId='+id, this.myOptions).pipe(
      map(this.extractData));
  }
  
  getAllLawyers(): Observable<any> {
    this.myOptions = this.auth.getMyoptions();
    return this.http.get(BASE_URL + 'rest/user/find/lawyers',this.myOptions).pipe(
      map(this.extractData));
  }
  deleteBank(id):Observable<any>
 {
   let url = BASE_URL + 'rest/bank_master/' + id;
   this.myOptions = this.auth.getMyoptions();
   console.log(this.myOptions);
   return this.http.delete(url, this.myOptions).pipe(
     catchError(this.handleError<any>('addProduct'))
   );
 }

 addAccount(data): Observable<any>{
  let url = BASE_URL + 'rest/account';
  this.myOptions = this.auth.getMyoptions();
  if(data.id != null){
    url = BASE_URL + 'rest/account/'+ data.id;
  }
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}
getAllAccounts(): Observable<any> {
  this.myOptions = this.auth.getMyoptions();
  return this.http.get(BASE_URL + 'rest/account',this.myOptions).pipe(
    map(this.extractData));
}
deleteAccount(id):Observable<any>
{
 let url = BASE_URL + 'rest/account/' + id;
 this.myOptions = this.auth.getMyoptions(); 
 console.log(this.myOptions);
 return this.http.delete(url, this.myOptions).pipe(
   catchError(this.handleError<any>('addProduct'))
 );
}

addDocument_type(data): Observable<any>{
  let url = BASE_URL + 'rest/document_type';
  this.myOptions = this.auth.getMyoptions();
  if(data.id != null){
    url = BASE_URL + 'rest/document_type/'+ data.id;
  }
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}
getAllDocument_types(): Observable<any> {
  this.myOptions = this.auth.getMyoptions();
  return this.http.get(BASE_URL + 'rest/document_type',this.myOptions).pipe(
    map(this.extractData));
}
deleteDocument_type(id):Observable<any>
{
 let url = BASE_URL + 'rest/document_type/' + id;
 this.myOptions = this.auth.getMyoptions();
 console.log(this.myOptions);
 return this.http.delete(url, this.myOptions).pipe(
   catchError(this.handleError<any>('addProduct'))
 );
}

addPayment_type(data): Observable<any>{
  let url = BASE_URL + 'rest/payment_type';
  this.myOptions = this.auth.getMyoptions();
  if(data.id != null){
    url = BASE_URL + 'rest/payment_type/'+ data.id;
  }
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}
getAllPayment_types(): Observable<any> {
  this.myOptions = this.auth.getMyoptions();
  return this.http.get(BASE_URL + 'rest/payment_type',this.myOptions).pipe(
    map(this.extractData));
}
deletePayment_type(id):Observable<any>
{
 let url = BASE_URL + 'rest/payment_type/' + id;
 this.myOptions = this.auth.getMyoptions();
 console.log(this.myOptions);
 return this.http.delete(url, this.myOptions).pipe(
   catchError(this.handleError<any>('addProduct'))
 );
}

addService_type(data): Observable<any>{
  let url = BASE_URL + 'rest/service_type';
  this.myOptions = this.auth.getMyoptions();
  if(data.id != null){
    url = BASE_URL + 'rest/service_type/'+ data.id;
  }
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}
getAllService_types(): Observable<any> {
  this.myOptions = this.auth.getMyoptions();
  return this.http.get(BASE_URL + 'rest/service_type',this.myOptions).pipe(
    map(this.extractData));
}
deleteService_type(id):Observable<any>
{
 let url = BASE_URL + 'rest/service_type/' + id;
 this.myOptions = this.auth.getMyoptions();
 console.log(this.myOptions);
 return this.http.delete(url, this.myOptions).pipe(
   catchError(this.handleError<any>('addProduct'))
 );
}

addService_Basic_Info(data): Observable<any>{
  let url = BASE_URL + 'rest/services_basic_info';
  this.myOptions = this.auth.getMyoptions();
  if(data.id != null){
    url = BASE_URL + 'rest/services_basic_info/'+ data.id;
  }
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}

updateKuberService(serviceId, data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services/' + serviceId;
  this.myOptions = this.auth.getMyoptions();
  console.log("Service update data")
  console.log(data);
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('Update Kuber Services Failed'))
  );
}
addService_Description(id,data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services/update';
  this.myOptions = this.auth.getMyoptions();
  
  console.log(data);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('Add Service Description'))
  );
}
addService_Payment_Info(id,data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services/update';
  this.myOptions = this.auth.getMyoptions();
  
  console.log(data);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('Add Service Description'))
  );
}
addServiceBasicInfo(data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services/insert';
  this.myOptions = this.auth.getMyoptions();
  
  console.log(data);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('Add Service Basic info'))
  );
}
addService_Providers(id,data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services/update';
  this.myOptions = this.auth.getMyoptions();
  
  console.log(data);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('Add Service Description'))
  );
}

create_kuber_service(data): Observable<any>{
  let url = BASE_URL + 'rest/kuber_services';
  this.myOptions = this.auth.getMyoptions();
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
}

update_serviceId(data,id): Observable<any>{
  let url = BASE_URL + 'rest/services_basic_info/'+id;
  this.myOptions = this.auth.getMyoptions();
  console.log(this.myOptions);
  return this.http.post<any>(url, JSON.stringify(data),this.myOptions).pipe(
    catchError(this.handleError<any>('addProduct'))
  );
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

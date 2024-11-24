import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs";
import { url } from "node:inspector";
// import { totalmem } from "os";
@Injectable({
  providedIn: "root"
})
/// common service is responsible for make Get, Post API 
export class CommonServices {

  baseUrl: string = "https://localhost:7036/";
  LoanDetails: any;
  service: any;
  constructor(public _http: HttpClient, private router: Router) {

  }
  /// name:PostRequest
  /// description : this is responsible for call POST API
  //// Parameter : model and url
  /// output: return all what ever is API will return 
  public PostRequest(model: any, _url: string) {

    /// 
    return this._http.post<any>(this.baseUrl + _url, model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",

      })
    });
  }

  /// name:GetRequest
  /// description : this is responsible for call Get API
  //// Parameter :  url
  /// output: return all what ever is API will return 
  public GetRequest(_url: string) {
    return this._http.get<any>(this.baseUrl + _url, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    });
  }


  public GetRequestById(UserID: any, _url: string) {
    return this._http.get<any>(`${this.baseUrl}${_url}?Id=${UserID}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  public Delete(id: any, _url: string) {
    return this._http.delete<any>(`${this.baseUrl}${_url}?Id=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

};

import { Injectable } from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { environment }  from '../../environments/environment';

@Injectable()
export class CoreHttpService {

  appUrl: string = environment.appUrl;
  
  constructor(
    protected http: Http
  ){}

  private getToken(){
    return localStorage.getItem('authToken');
  }

  private getHeader() {
    let headers = new Headers;
    headers.append('Content-Type', "application/json");
    headers.append('x-access-token', this.getToken());
    return headers;
  }

  private getMultiPartHeader() {
    let headers = new Headers;
    headers.append('x-access-token', this.getToken());
    return headers;
  }

  get(extension:string): Promise<any>{
    let url = this.appUrl + extension
    return this.http.get(url, { headers: this.getHeader() })
    .toPromise().then(this.onSuccessHandle).catch(this.onErrorHandle);
  }

  post(extension:string, data): Promise<any>{
    let url = this.appUrl + extension;
    return this.http.post(url, data, { headers: this.getHeader() })
    .toPromise().then(this.onSuccessHandle).catch(this.onErrorHandle);
  }

  put(extension:string, data): Promise<any>{
    let url = this.appUrl + extension;
    return this.http.put(url, data, { headers: this.getHeader() })
      .toPromise().then(this.onSuccessHandle).catch(this.onErrorHandle);
  }

  delete(extension:string, data): Promise<any>{
    let url = this.appUrl + extension;
    return this.http.delete(url, { headers:  this.getHeader() , body : data })
    .toPromise().then(this.onSuccessHandle).catch(this.onErrorHandle);
  }

  multipartPost(extension:string, data): Promise<any>{
    let url = this.appUrl + extension;
    return this.http.post(url, data, { headers: this.getMultiPartHeader() })
    .toPromise().then(this.onSuccessHandle).catch(this.onErrorHandle);
  }

  private onSuccessHandle = (response) => {
    return response.json();
  }

  private onErrorHandle = (err) =>  {
    return err;
  }

}

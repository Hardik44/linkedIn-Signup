import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  client: string = '77juj3uar8bbp3';
  redirect_url = 'http://localhost:4200/signup';
  scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
  secret = '1ysKqdm2j6GeDs9R';
  ACCESS_TOKEN: string = 'AccessToken';
  private userDetails = {};

  constructor(private httpClient: HttpClient) { }

  public callSignup(){
    let url = this.getURL();
    let header = new HttpHeaders();
    header = header.set('Access-Control-Allow-Origin','*')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    return this.httpClient.get(url);
  }

  public getURL(){
    return 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + this.client +
      '&redirect_uri='+ this.redirect_url +'&state=aRandomString' + '&scope=' + this.scope;
  }

  public getAccessToken(authCode){
    const URL = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=' + authCode + '&redirect_uri=' +
                  this.redirect_url + '&client_id=' + this.client + '&client_secret=' + this.secret;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    const body = {
      'Host': 'www.linkedin.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    this.httpClient.post(URL, body, httpOptions).subscribe(data => {
        localStorage.setItem('AccessToken', data['access_token']);
        console.log(data);
    });
  }

  public getUserName(){
    const URL = 'https://api.linkedin.com/v2/me';
    return this.getResponse(URL);
  }

  public getUserEmail(){
    const URL = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))';
    return this.getResponse(URL);
  }

  public getResponse(URL){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem(this.ACCESS_TOKEN)
      })
    };

    return this.httpClient.get(URL, httpOptions);
  }
}


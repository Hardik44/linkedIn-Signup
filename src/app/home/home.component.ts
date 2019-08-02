import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  URL: string = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77juj3uar8bbp3&redirect_uri=http://localhost:4200/signup&state=aRandomString&scope=r_liteprofile%20r_emailaddress%20w_member_social';
  constructor() { }

  ngOnInit(): void {

  }


}

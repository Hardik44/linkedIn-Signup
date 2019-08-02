import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetails} from '../user-details';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.sass']
})
export class SignupDetailsComponent implements OnInit {
  Access_code;
  ACCESS_TOKEN: string = 'AccessToken';
  private user: UserDetails;
  private email: string;
  profileForm;

  constructor(
    private ApiService: HttpService,
    private activatedRoute: ActivatedRoute,
    private Router: Router,
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.Access_code = params['code'];
    });

    if(!localStorage.getItem(this.ACCESS_TOKEN)){
      this.ApiService.getAccessToken(this.Access_code);
    }

    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  ngOnInit() {
    this.ApiService.getUserName().subscribe((user: any) =>{
      this.user = user;

      this.profileForm.setValue({
        firstName: this.user.localizedFirstName,
        lastName: this.user.localizedLastName,
        email: this.profileForm.controls['email'].value,
        password: '',
      });
    });

    this.ApiService.getUserEmail().subscribe((data: any) =>{
      this.email = data['elements'][0]['handle~']['emailAddress'];

      this.profileForm.setValue({
        firstName: this.profileForm.controls['firstName'].value,
        lastName: this.profileForm.controls['lastName'].value,
        email: this.email,
        password: this.profileForm.controls['password'].value,
      });
    });
  }

  onSubmit(){
    console.log(this.profileForm.value);
    this.Router.navigate(['thank-you']);
  }

}

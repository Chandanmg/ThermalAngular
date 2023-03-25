import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { addSettingCustomer } from '../settings.model';
import { settingsService } from '../settings.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  
  private api_url = 'http://15.207.185.137:3000';

  customername: addSettingCustomer[] = [];

  private postUpdated = new Subject<addSettingCustomer[]>();

  constructor(private http: HttpClient, private settingservice: settingsService) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(){
    this.http.get<{message: string, posts: any}>("http://13.233.107.178:3000/customerlist")
    .pipe(map((postdata)=>{
      return postdata.posts.map(post => {
        return {
          customer : post.customer
        }
      })
    }))
    .subscribe(post =>{
      this.customername = post;
      // console.log(this.customername);
      this.postUpdated.next([...this.customername])
    })
  }

  addLocationCustomer(form: NgForm){
    if(form.invalid){
      return;
    }
    // console.log(form.value);
    this.settingservice.addcustomer(form.value.customer, form.value.location, form.value.thermal_sensors);
  }

}

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Measure } from 'src/app/screens/dashboard-measurement/measurement-model';
import { measurementService } from 'src/app/screens/dashboard-measurement/measurement_service';
import { addSettingCustomer } from 'src/app/screens/settings/settings.model';
import { settingsService } from 'src/app/screens/settings/settings.service';
import { environment } from 'src/environments/environment';
import { SensorsPageComponent } from '../sensors-page.component';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.scss']
})
export class SensorCardComponent implements OnInit {

  private api_url = 'http://15.207.185.137:3000';

  posts: Measure[] = [];

  totalsensors=0;
  totalmeasurements=0;
  wrongcount=0;
  correctcount=0;

  public posts3 = [];
  online=0;
  offline=0;

  constructor(private router: Router, private dailog: MatDialog, private settingservice: settingsService, private measureservice: measurementService, private http: HttpClient) { }

  ngOnInit() {
    this.getCustomer();
    this.totalMeasurements();
    this.getOnline();
    this.totalImages();
  }

  getCustomer(){
    // this.settingservice.getcustomer();
    this.settingservice.getPostUpdateListener()
      .subscribe((posts: addSettingCustomer[]) => {
        this.totalsensors = posts.length;
        
      })
  }

  totalMeasurements(){ //`${this.api_url}/getdata`
    this.http
    .get<{message: string, posts: any}>(`${this.api_url}/getdata`)
    .pipe(map((postData) => {
        return postData.posts.map(post => {
            return {
              // Image_Result: post.Image_Result
            }
        })
    }))
    .subscribe(post => {
        this.totalmeasurements = post.length;
        
    })
  }

  getOnline(){//`${this.api_url}/customerlist`
    this.http.get<{message: string, posts: any}>(`${this.api_url}/Last_Responded/Date`)
    .pipe(map((postdata) => {
        return postdata.posts.map(post => {
            return {
                lastresponse: post.Last_Responded,
            }
        })
    }))
    .subscribe(post => {
        // console.log(post);
        this.posts3 = post;

        var today = new Date();
        let changedDate;
        let pipe = new DatePipe('en-US');

        let ChangedFormat = pipe.transform(today, 'MMM d, y');
        changedDate = ChangedFormat;
        // console.log(changedDate);
                                                                      
        let newdate = [];
        let str;
        let str2
        for(let i=0; i<this.posts3.length; i++) {
          // newdate.push({
          //    new: pipe.transform(this.posts3[i]["lastresponse"], 'hh:mm:ss')
          // });
          str =  pipe.transform(this.posts3[i]["lastresponse"], 'MMM d, y');
          // console.log(str);

          if (changedDate == str) {
            this.online = this.online+1;
          } else {
            this.offline = this.offline+1;
          }
          
          // str2 = new Date('1970-01-01T' + str + 'Z').getTime() / 1000;

        }
        
    })
  }

  totalImages(){ //`${this.api_url}/getdata`
    this.http
    .get<{message: string, posts: any}>(`${this.api_url}/getdata`)
    .pipe(map((postData) => {
        return postData.posts.map(post => {
            return {
              Image_Result: post.Image_Result
            }
        })
    }))
    .subscribe(post => {
        // this.totalmeasurements = post.length;
        let imageArr =[];
        imageArr = post; 

        let imgArr;

        let count;

        for(let i=0; i<imageArr.length; i++) {

          imgArr = imageArr[i]["Image_Result"];
          // console.log(imgArr);
          // newdate.push({
          //    new: pipe.transform(this.posts3[i]["lastresponse"], 'hh:mm:ss')
          // });
          count = "1";
          let wrongc = "0";
          // console.log(str);

          if (imgArr == count) {
            this.correctcount = this.correctcount+1;
          } 
          if (imgArr == wrongc) {
            this.wrongcount = this.wrongcount+1;
          }
          
          // str2 = new Date('1970-01-01T' + str + 'Z').getTime() / 1000;

        }
        
    })
  }

}

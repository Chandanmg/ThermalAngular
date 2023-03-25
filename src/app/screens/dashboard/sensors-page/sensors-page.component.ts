import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashboardMeasurementComponent } from '../../dashboard-measurement/dashboard-measurement.component';
import { Measure } from '../../dashboard-measurement/measurement-model';
import { measurementService } from '../../dashboard-measurement/measurement_service';
import { addSettingCustomer } from '../../settings/settings.model';
import { settingsService } from '../../settings/settings.service';

@Component({
  selector: 'app-sensors-page',
  templateUrl: './sensors-page.component.html',
  styleUrls: ['./sensors-page.component.scss']
})
export class SensorsPageComponent implements OnInit {
  
  private api_url = 'http://15.207.185.137:3000';

  private postsub : Subscription;
  
  posts: addSettingCustomer[] = [];
  
  posts2: addSettingCustomer[] = [];

  public posts3 = [];
  public lastdata=[];
  public online = 0;
  public offline = 0;

  public merged = [];

  wrongcount=0;
  correctcount=0;

  public totalCorrectWrong=[];

  dataSource: MatTableDataSource<addSettingCustomer>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dataSource= [];
  
  constructor(private router: Router, private http: HttpClient, private settingservice: settingsService, private measureservice: measurementService) { }

  ngOnInit() {
    this.getCustomer();
    this.getLastThermalData();
    // this.getOnline();
    this.totalImageResult();
    this.getAllCorrectWrong();
  }
  
  displayedColumns: string[] = ['sl', 'customer', 'location', 'sensorid', 'lastresponse', 'totalimages', 'correctresult', 'wrongresult', 'view'];


  view(id: string){
    // console.log(id);
    this.measureservice.getAllThermalData(id);
    this.router.navigate(['/measurement']);
  }

  getCustomer(){
    this.settingservice.getcustomer();
    this.postsub = this.settingservice.getPostUpdateListener()
      .subscribe((post: addSettingCustomer[]) => {
        this.posts = post;

      })

  }

  getLastThermalData(){
    this.http
    .get<{message: string, posts: any}>(`${this.api_url}/Last_Responded/Date`)
    .subscribe(post => {
        this.lastdata = post.posts;

        this.posts3 = this.posts;

        // for(let i=0; i<this.posts.length; i++) {
        //   merged.push({
        //   ...this.posts[i], 
        //   ...this.lastdata[i]
        //   });
        // }

        for(let i=0; i<this.posts3.length; i++) {
          this.merged.push({
           ...this.posts3[i], 
           ...(this.lastdata.find((itmInner) => itmInner["_id"] === this.posts3[i]["thermalsensor"]))}
          );
        }
    })
  }

  getAllCorrectWrong(){
    this.http
    .get<{message: string, posts: any}>(`${this.api_url}/list/correctWrong`)
    .subscribe(post => {
        this.totalCorrectWrong = post.posts;

        // this.posts2 = this.mergeById(this.posts,this.lastdata);
        
        let mergedCorrectWrong = [];

        this.posts3 = this.posts;

        for(let i=0; i<this.merged.length; i++) {
          mergedCorrectWrong.push({
           ...this.merged[i], 
           ...(this.totalCorrectWrong.find((itmInner) => itmInner["_id"] === this.merged[i]["thermalsensor"]))}
          );
        }

        // console.log(mergedCorrectWrong);

        

        this.dataSource = new MatTableDataSource(mergedCorrectWrong);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  totalImageResult(){ //`${this.api_url}/getdata`
    this.http
    .get<{message: string, posts: any}>(`${this.api_url}/getdata1`)
    .pipe(map((postData) => {
        return postData.posts.map(post => {
          // console.log(postData.posts);
            return {
              id: post.Sensor_Name,
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
        // console.log(this.correctcount);
        // console.log(this.wrongcount);
        
    })
  }
  
}

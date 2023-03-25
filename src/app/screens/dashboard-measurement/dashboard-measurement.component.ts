import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../snackbar';
import { AddThermal, Measure } from './measurement-model';
import { measurementService } from './measurement_service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.scss']
})
export class DashboardMeasurementComponent implements OnInit {

  private api_url = 'http://15.207.185.137:3000';
  
  imageurl;
  normalimage;

  private postSub: Subscription;

  dataSource: MatTableDataSource<Measure>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['sl','time', 'people','temp','view'];

  mainposts: Measure[] = [];
  posts: Measure[] = [];
  posts2: Measure[] = [];

  firstdate;

  
  constructor(private snackbar: SnackbarService,private router: Router, private measureservice: measurementService, private http: HttpClient) { }


  thermaldate="12:00:00";
  numberofpeople=0;
  Thermal_Date= "";
  Thermal_Value= "";
  Number_Of_People= 0;
  Sensor_Name= "";
  Image_Result= 0;
  Processed= "";
  Temp="";
  serialnumber="0"


  ngOnInit() {
    
    console.log("hello");
    // this.measureservice.getAllThermalData();
    this.postSub = this.measureservice.getPostUpdateListener()
      .subscribe((post: Measure[]) => {
        this.posts = post;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.serialnumber = "1";
        this.firstdate = this.posts[0]['Thermal_Date'];

        var a = this.firstdate.split(",");
        this.thermaldate = a[1];

        this.numberofpeople = this.posts[0]['Number_Of_People'];
        let id = this.posts[0]['id'];
        this.getImage(id);
        this.viewButton(id);

        let coId = this.measureservice.idFromPrevious;
        // console.log(coId);

        localStorage.setItem("coool-id", JSON.stringify(coId));

      });
      
    let coodata = localStorage.getItem("coool-id");

    // console.log(coodata);
    this.refresh(coodata);
  }

  refresh(id: string){
    // console.log(id);
    let string = id.replace(/[^a-zA-Z0-9]/g, '');
    // console.log(string);
    this.measureservice.getAllThermalData(string);
  }
  
  view(id: string, i){ 
    this.viewButton(id);
    this.getImage(id);
    this.serialnumber=(i);
    // this.thermaldate = await this.measureservice.tDate();
    // this.numberofpeople = await this.measureservice.nOfPeople();
  
  }

  // getPreviousId(id: string){
  //   console.log(id);
  // }

  newid="";
  viewButton(id: string){
      this.newid = id;
      this.http.get<{message: string, posts: any}>(`${this.api_url}/getdata/measurement/view/`+ id)
      .subscribe(post => {

        let date = moment(post.posts.Thermal_Date).format('hh:mm:ss');
        // console.log(date);

          this.thermaldate = date;
          this.numberofpeople = post.posts.Number_Of_People;
            // console.log(this.thermal);
      })
  }

  correct(){
    const add: AddThermal = {
      // id: this.newid,
      Sensor_Name: this.Sensor_Name,
      Thermal_Date: this.Thermal_Date,
      Thermal_Value: this.Thermal_Value,
      Number_Of_People: this.Number_Of_People,
      Image_Result: 1,
      Thermal_Image: this.imageurl,
      Normal_Image: this.normalimage,
      Processed: this.Processed,
      Temp: this.Temp,
    }
    this.http.post(`${this.api_url}/AddThermal/measurement/view/`+this.newid, add)
    .subscribe((response:any) => {
      if(response){
        // console.log("response")
        this.snackbar.showMessage("added successfully..");
                // this.dailog.closeAll();
        // window.location.reload();
      }
    })
  }

  wrong(){
    const add: AddThermal = {
      // id: this.newid,
      Sensor_Name: this.Sensor_Name,
      Thermal_Date: this.Thermal_Date,
      Thermal_Value: this.Thermal_Value,
      Number_Of_People: this.Number_Of_People,
      Image_Result: 0,
      Thermal_Image: this.imageurl,
      Normal_Image: this.normalimage,
      Processed: this.Processed,
      Temp: this.Temp,
    }
    this.http.post(`${this.api_url}/AddThermal/measurement/view/`+this.newid, add)
    .subscribe((response:any) => {
      if(response){
        // console.log("response")
        this.snackbar.showMessage("added successfully..");
                // this.dailog.closeAll();
        // window.location.reload();
      }
    })
  }

  getImage(id: string){

    this.http.get<{message: string, posts: any}>(`${this.api_url}/getdata/measurement/view/`+ id)
      .subscribe(post => {

        let date = moment(post.posts.Thermal_Date).format('DD-MM-YY, HH:mm:ss');
        // console.log(date);

        this.Thermal_Date = date;
        this.Thermal_Value = post.posts.Thermal_Value;
        this.Number_Of_People = post.posts.Number_Of_People;
        this.Sensor_Name = post.posts.Sensor_Name;
        this.Image_Result = post.posts.Image_Result;
        this.Processed = post.posts.Processed;
        this.Temp = post.posts.Temp;
        this.imageurl = `https://sensiablebucket.s3.ap-south-1.amazonaws.com/`+post.posts.Thermal_Image;
        this.normalimage = `https://sensiablebucket.s3.ap-south-1.amazonaws.com/`+post.posts.Normal_Image;
      })
  }
  

  back(){
    this.router.navigate([''])
  }

  next(){
    let arr = [];
    let getid = "";
    var y: number = +this.serialnumber;

    //serial number
    let i = y+1;
    let z = i.toString();

    //date
    let m = y;
    let n = m.toString();
    // console.log(this.measureservice.posts[i]);
    // this.posts2 = this.measureservice.posts[i];
    this.posts2 = this.measureservice.posts[n];
    getid = this.posts2['id'];
    this.view(getid,z);

    // console.log(getid);

  }

  previous(){
    let arr = [];
    let getid = "";
    var y: number = +this.serialnumber;

    if(y-1==0){
      return;
    }
    else{
      
      //serial number
      let i = y-1;
      let z = i.toString();

      //date
      let m = y-2;
      let n = m.toString();
      
      this.posts2 = this.measureservice.posts[n];
      getid = this.posts2['id'];
      this.view(getid,z);

      // console.log(getid);
    }


  }

  dateselect(form: NgForm){
    // console.log(form.value.picker);
    var date = form.value.picker,
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    var correctDateFormat = ([date.getFullYear(), mnth, day].join("-"));
    this.measureservice.getAllThermalDataForDate(correctDateFormat);

    this.measureservice.getPostSelectedDateListener()
      .subscribe((post: Measure[]) => {
        // console.log(post.length);
        this.posts = post;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.serialnumber = "1";
        this.firstdate = this.posts[0]['Thermal_Date'];

        var a = this.firstdate.split(",");
        this.thermaldate = a[1];

        this.numberofpeople = this.posts[0]['Number_Of_People'];
        let id = this.posts[0]['id'];
        this.getImage(id);
        this.viewButton(id);

      });
  }

  
}

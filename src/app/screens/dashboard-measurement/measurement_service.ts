
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddThermal, Measure } from './measurement-model';
import * as moment from 'moment';

@Injectable({ providedIn : 'root'})
export class measurementService{
    
    private api_url = 'http://15.207.185.137:3000';

    public posts: Measure[] = [];
    public posts2: Measure[] = [];
    public lastdata;
    private postUpdated = new Subject<Measure[]>();


    public idFromPrevious;
    public postsSelectedDate: Measure[] = [];
    private postUpdatedSelectedDate = new Subject<Measure[]>();
  

    // private posts: AddBuildingPage[] = [];
    // private postUpdated = new Subject<AddBuildingPage[]>();

    constructor(private http: HttpClient){}

    getAllThermalData(id : string){
        // console.log(id)
        this.idFromPrevious=id;

        this.http
        .get<{message: string, posts: any}>(`${this.api_url}/customerlist/name/`+id)
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                let thisdate = moment(post.Thermal_Date).format('DD-MM-YY, hh:mm:ss A');
                // console.log(date);
                return {
                    id: post._id,
                    Thermal_Date: thisdate,
                    Thermal_Value: post.Thermal_Value,
                    Number_Of_People: post.Number_Of_People,
                    Image_Result: post.Image_Result,
                    Temp: post.Temp
                }
            })
        }))
        .subscribe(post => {
            // console.log(post[0]);
            this.posts = post,
            this.postUpdated.next([...this.posts]);
            this.lastdata = (this.posts[this.posts.length - 1]);
            // console.log(this.lastdata);
        })
    }

    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }

    

    
    getLastThermalData(id : string){
        // console.log(id);
        this.http
        .get<{message: string, posts: any}>(`${this.api_url}/customerlist/name/`+id)
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                let thisdate = moment(post.Thermal_Date).format('DD-MM-YY, hh:mm:ss');
                // console.log(date);
                return {
                    // id: post._id,
                    Thermal_Date: thisdate,
                }
            })
        }))
        .subscribe(post => {
            // console.log(post[0]);
            this.posts2 = post[post.length-1];
            // this.postUpdated.next([...this.posts]);
            // this.lastdata = (this.posts2[this.posts2.length - 1]);
            this.lastdata = this.posts2;
            console.log(this.lastdata);
        })
    }

    getAllThermalDataForDate(date : string){
        
        var id = this.idFromPrevious;

        // console.log(date);
        // console.log(id);

        this.http
        .get<{message: string, posts: any}>(`${this.api_url}/customerlist/name/`+id + `/` +date)
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                let thisdate = moment(post.Thermal_Date).format('DD-MM-YY, hh:mm:ss A');
                // console.log(date);
                return {
                    id: post._id,
                    Thermal_Date: thisdate,
                    Thermal_Value: post.Thermal_Value,
                    Number_Of_People: post.Number_Of_People,
                    Image_Result: post.Image_Result,
                    Temp: post.Temp
                }
            })
        }))
        .subscribe(post => {
            // console.log(post);
            this.posts = post;
            this.postUpdatedSelectedDate.next([...this.posts]);
            // this.lastdata = (this.posts[this.posts.length - 1]);
            // console.log(this.lastdata);
        })
    }

    getPostSelectedDateListener(){
        return this.postUpdatedSelectedDate.asObservable();
    }



    
}
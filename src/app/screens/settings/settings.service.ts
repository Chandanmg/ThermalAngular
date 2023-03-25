import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SnackbarService } from "../snackbar";
import { addSettingCustomer } from "./settings.model";




@Injectable({ providedIn : 'root'})
export class settingsService{

    private api_url = 'http://15.207.185.137:3000';

    public posts: addSettingCustomer[] = [];
    
    private postUpdated = new Subject<addSettingCustomer[]>();

    constructor(private http: HttpClient, private snackbar: SnackbarService, private dailog: MatDialog){}

    addcustomer(customer: string,location: string,thermal_sensors: string){
        const add: addSettingCustomer = {customer: customer, location: location, thermal_sensors: thermal_sensors}

        this.http.post(`${this.api_url}/customerlist`, add)
        .subscribe((response:any) => {
            if(response){
                this.snackbar.showMessage("added successfully..");
                this.dailog.closeAll();
                window.location.reload();
            }
        })
    }

    getcustomer(){//`${this.api_url}/customerlist`
        this.http.get<{message: string, posts: any}>(`${this.api_url}/customerlist`)
        .pipe(map((postdata) => {
            return postdata.posts.map(post => {
                return {
                    customer: post.customer,
                    location: post.location,
                    thermalsensor: post.thermal_sensors,
                }
            })
        }))
        .subscribe(post => {
            // console.log(post);
            this.posts = post,
            this.postUpdated.next([...this.posts]);
        })
    }

    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }
}
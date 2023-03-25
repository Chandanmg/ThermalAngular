import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDailogComponent } from '../add-dailog/add-dailog.component';
import { AddLocationComponent } from '../add-location/add-location.component';
import { addSettingCustomer } from '../settings.model';
import { settingsService } from '../settings.service';

@Component({
  selector: 'app-settings-content',
  templateUrl: './settings-content.component.html',
  styleUrls: ['./settings-content.component.scss']
})
export class SettingsContentComponent implements OnInit {

  private postsub : Subscription;
  
  posts: addSettingCustomer[] = [];

  dataSource: MatTableDataSource<addSettingCustomer>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // dataSource= [];
  
  constructor(private router: Router, private dailog: MatDialog, private settingservice: settingsService) { }

  ngOnInit() {
    this.getCustomer();
  }
  
  displayedColumns: string[] = ['sl', 'customer', 'location', 'thermalsensor'];

  addcustomerDailog(){
    this.dailog.open(AddDailogComponent, {
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // height: '50%',
      width: '25%',
      // panelClass: 'full-screen-modal'
    });
  }

  getCustomer(){
    this.settingservice.getcustomer();
    this.postsub = this.settingservice.getPostUpdateListener()
      .subscribe((posts: addSettingCustomer[]) => {
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  addlocationDailog(){
    this.dailog.open(AddLocationComponent, {
      width: '25%',
    });
  }

  


}

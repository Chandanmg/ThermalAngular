import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from '../../snackbar';
import { map, tap } from 'rxjs/operators';
import { measurementService } from '../measurement_service';
import { Subscription } from 'rxjs';
import { Measure } from '../measurement-model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-left-data',
  templateUrl: './left-data.component.html',
  styleUrls: ['./left-data.component.scss']
})
export class LeftDataComponent implements OnInit {


  private postSub: Subscription;

  dataSource: MatTableDataSource<Measure>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['sl','time', 'people','view'];

  posts: Measure[] = [];

  constructor(private snackbar: SnackbarService,private http: HttpClient, private measureservice: measurementService) { }

  ngOnInit() {
    // this.measureservice.getAllThermalData();
    this.postSub = this.measureservice.getPostUpdateListener()
      .subscribe((posts: Measure[]) => {
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  tdate;
  
  view(id: string){
    // this.measureservice.mesurementViewButton(id);
    // this.measureservice.viewButton(id);
    // this.tdate = this.measureservice.name();
    // console.log(this.tdate);
    // setTimeout(()=>{
    //   this.tdate = this.measureservice.name();
    //   console.log(this.tdate);
    // },0.1000);
  
  }



}

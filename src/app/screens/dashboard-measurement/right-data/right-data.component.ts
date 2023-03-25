import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../snackbar';
import { measurementService } from '../measurement_service';

@Component({
  selector: 'app-right-data',
  templateUrl: './right-data.component.html',
  styleUrls: ['./right-data.component.scss']
})
export class RightDataComponent implements OnInit {
  
  // Thermal_Date;
  // Number_Of_People;

  constructor(private router: Router, private snackbar: SnackbarService, private measureservice: measurementService) { }

  ngOnInit() {
    // setTimeout(()=>{          
    //   this.Thermal_Date = this.measureservice.viewDate();
    //   console.log(this.Thermal_Date);
    //   // this.Number_Of_People = this.measureservice.viewNoPeople();
    // }, 0.1000);
  }

  back(){
    this.router.navigate([''])
  }

  correct(){
    this.snackbar.showMessage('Saved successfully....');
  }

  wrong(){
    this.snackbar.showMessage('Saved successfully....');
  }

}

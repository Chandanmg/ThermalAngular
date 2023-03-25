import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { settingsService } from '../settings.service';

@Component({
  selector: 'app-add-dailog',
  templateUrl: './add-dailog.component.html',
  styleUrls: ['./add-dailog.component.scss']
})
export class AddDailogComponent implements OnInit {

  constructor(private settingservice: settingsService) { }

  ngOnInit() {
  }

  addCustomer(form: NgForm){
    if(form.invalid){
      return;
    }
    // console.log(form.value);
    this.settingservice.addcustomer(form.value.customer, form.value.location, form.value.thermal_sensors);
  }

}

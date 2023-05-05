import { Component, OnInit } from '@angular/core';
import { DaterangerPickerModel } from './daterangerpicker.model';
import { DaterangerpickerService } from './daterangerpicker.service';

@Component({
  selector: 'app-daterangerpicker',
  templateUrl: './daterangerpicker.component.html',
  styleUrls: ['./daterangerpicker.component.css']
})
export class DaterangerpickerComponent implements OnInit {

  //------------------------------Table-------------------------------------
  date1: any;
  date2: any;
  public allCurrent!: Array<DaterangerPickerModel>;

  isLoading = true;

  constructor(private http: DaterangerpickerService) { }

  ngOnInit(): void {
    //setInterval(() => {
    //  this.getAll();
    //}, 1000);
      
    }


  //getAll() {
  //  this.http.Get2date(this.date1, this.date2).subscribe(
  //    (res) => {
  //      this.allCurrent = res;
  //      this.isLoading = false;
  //    },
  //    (err) => {
  //      console.log(err);
  //      this.isLoading = false;
  //    }
  //  );
  //}
}

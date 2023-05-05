import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DaterangerPickerModel } from './daterangerpicker.model';

@Injectable({
  providedIn: 'root'
})
export class DaterangerpickerService {

  BaseUrl = "https://localhost:5001"
  // Post-Test
  postcurrent(data: any): Observable<Array<DaterangerPickerModel>> {
    return this.http.post<Array<DaterangerPickerModel>>('https://localhost:5001/dtsu666', data);
  }



  timedaya = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss")


  timedayb = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss")

  timeweek = moment().endOf('day').subtract(7, 'day').format("YYYY-MM-DDTHH:mm:ss")
  timemonth = moment().endOf('day').subtract(30, 'day').format("YYYY-MM-DDTHH:mm:ss")


  constructor(private http: HttpClient) { }

  //____________________________Get Date____________________________
 

  //Get2date(date1: string, date2: string): Observable<any> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?start=${startDate}&end=${endDate}`;
  //  return this.http.get(url);
  //}
  Get21date(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

}

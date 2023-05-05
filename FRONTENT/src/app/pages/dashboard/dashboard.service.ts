import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DashBoardModel } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  BaseUrl = "https://localhost:5001"
  // Post-Test
  postcurrent(data: any): Observable<Array<DashBoardModel>> {
    return this.http.post<Array<DashBoardModel>>('https://localhost:5001/dtsu666', data);
  }




  timedaya = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss")
  timedayb = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss")
  timeweek = moment().endOf('day').subtract(7, 'day').format("YYYY-MM-DDTHH:mm:ss")
  timemonth = moment().endOf('day').subtract(30, 'day').format("YYYY-MM-DDTHH:mm:ss")


  constructor(private http: HttpClient) { }

  //-----------------------------------------------------------------------------------------Moment --------------------------------------------------------------
  //---------------------------------------------------------------------DTSU66------------------------------
  //---------------Điện áp pha ----------------
  DTSU666_dienappha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ua,Ub,Uc,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }

  //---------------Điện áp dây ----------------
  DTSU666_dienapday_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Uab,Ubc,Uca&start=' + this.timedaya + '&end=' + this.timedayb)
  }

  //---------------cosphi ----------------
  DTSU666_cosphi_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Cosft,Cosfa,Cosfb,Cosfc&start=' + this.timedaya + '&end=' + this.timedayb)
  }


  //---------------Dòng điện pha ----------------
  DTSU666_dongdienpha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ia,Ib,Ic,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }

  //---------------Tần số----------------
  DTSU666_tan_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Hz&start=' + this.timedaya + '&end=' + this.timedayb)
  }


  //---------------P tieu thu pha----------------
  DTSU666_ptieuthupha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Pft,Pfa,Pfb,Pfc,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }


  //---------------Công suất phản kháng pha----------------
  DTSU666_qphankhangpha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Qft,Qfa,Qfb,Qfc,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }

  //---------------Điện năng phản kháng ngày----------------
  DTSU666_dienangphankhangpha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Q1,Q2,Q3,Q4,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }


  //---------------Điện năng tiêu thụ ngày ----------------
  DTSU666_dienangtieuthu_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=A_sum,A_imp,A_exp,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }














  //---------------------------------------------------------------------DTSU66------------------------------
  //---------------Điện áp pha,Điện áp dây, Dòng điện pha ----------------
  //DTSU_upha() {
  //  return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic&start=' + this.timedaya + '&end=' + this.timedayb)
  //}

  DTSU_upha(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  //---------------Công suất theo pha: p,q ; Cosphi ; Hz ----------------
  DTSU_cs() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Pft,Pfa,Pfb,Pfc,Qft,Qfa,Qfb,Qfc,Cosft,Cosfa,Cosfb,Cosfc,Hz&start=' + this.timedaya + '&end=' + this.timedayb)
  }
  //-------------Công suất -------------------
  DTSU_cs1() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=A_sum,A_imp,A_exp,Q1,Q2,Q3,Q4,Date&start=' + this.timedaya + '&end=' + this.timedayb)
  }


  //---------------------------------------------------------------------PZEM-017------------------------------
  Pzem_da() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/pzem017?&Fields=U1&start=' + this.timedaya + '&end=' + this.timedayb)
  }

  //---------------------------------------------------------------------Tuần----------------------------------------------------

  //---------------Điện áp pha,Điện áp dây, Dòng điện pha ----------------
  DTSU_upha_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic&start=' + this.timemonth + '&end=' + this.timedayb)
  }
  //---------------Công suất theo pha: p,q ; Cosphi ; Hz ----------------
  DTSU_cs_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Pft,Pfa,Pfb,Pfc,Qft,Qfa,Qfb,Qfc,Cosft,Cosfa,Cosfb,Cosfc,Hz&start=' + this.timemonth + '&end=' + this.timedayb)
  }
  //-------------Công suất -------------------
  DTSU_cs1_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=A_sum,A_imp,A_exp,Q1,Q2,Q3,Q4&start=' + this.timemonth + '&end=' + this.timedayb)
  }
  //---------------------------------------------------------------------------Month-------------------------------------------------------
  GetTimemonth() {
    return this.http.get(this.BaseUrl + '/dtsu666?start=' + this.timemonth + '&end=' + this.timedayb)
  }

  //--------------------------------------------------------The Custom-----------------------------------------------

  Get21date(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

  //Bieu do

  Bieudo_demo(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?start=${startDate}&end=${endDate}&Fields=Hz`;
    return this.http.get(url);
  }

}

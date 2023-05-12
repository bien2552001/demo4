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

  //-----------------------------------------------------------------------------------------TO DAY--------------------------------------------------------------
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

  //---------------------------------------------------------------------PZEM017------------------------------
  //---------------Điện áp pha ----------------
  PZEM017_dienappha_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/pzem017?&Fields1=U1,Date1&Start1=' + this.timedaya + '&End1=' + this.timedayb)
  }

  //---------------Dòng điện ----------------
  PZEM017_dongdien_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/pzem017?&Fields1=I1,Date1&Start1=' + this.timedaya + '&End1=' + this.timedayb)
  }

  //---------------Công suất tiêu thụ ----------------
  PZEM017_ptieuthu_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/pzem017?&Fields1=P1,Date1&Start1=' + this.timedaya + '&End1=' + this.timedayb)
  }

  //---------------Điện năng tiêu thụ ----------------
  PZEM017_atieuthu_today() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/pzem017?&Fields1=A1,Date1&Start1=' + this.timedaya + '&End1=' + this.timedayb)
  }










  //---------------------------------------------------------------------------------------------Moment---------------------------------------------------------------------
  //-------------------------------------DTSU66--------------------------------------------------------
  //---------------Điện áp pha,Điện áp dây, Dòng điện pha ----------------
  //DTSU_upha() {
  //  return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic&start=' + this.timedaya + '&end=' + this.timedayb)
  //}

  DTSU666_uimoment(): Observable<any> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  //---------------Công suất theo pha: p,q ; Cosphi ; Hz ----------------
  DTSU666_pqphimoment(): Observable<any> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=Pft,Pfa,Pfb,Pfc,Qft,Qfa,Qfb,Qfc,Cosft,Cosfa,Cosfb,Cosfc,Hz&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  //-------------Công suất -------------------
  DTSU666_amoment(): Observable<any> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=A_sum,A_imp,A_exp,Q1,Q2,Q3,Q4&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

  //---------------------------------------------------------------------PZEM-017------------------------------
  // Điện áp
  Pzem017_uipamoment(): Observable<any> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=U1,I1,P1,A1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get(url);
  }

  //---------------------------------------------------------------------Today----------------------------------------------------

  //---------------Điện áp pha,Điện áp dây, Dòng điện pha ----------------
  DTSU_upha_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic&start=' + this.timedaya + '&end=' + this.timedayb)
  }
  //---------------Công suất theo pha: p,q ; Cosphi ; Hz ----------------
  DTSU_cs_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=Pft,Pfa,Pfb,Pfc,Qft,Qfa,Qfb,Qfc,Cosft,Cosfa,Cosfb,Cosfc,Hz&start=' + this.timedaya + '&end=' + this.timedayb)
  }
  //-------------Công suất -------------------
  DTSU_cs1_w() {
    return this.http.get<Array<DashBoardModel>>(this.BaseUrl + '/dtsu666?&Fields=A_sum,A_imp,A_exp,Q1,Q2,Q3,Q4&start=' + this.timedaya + '&end=' + this.timedayb)
  }
  //---------------------------------------------------------------------------Last Week-------------------------------------------------------
  //Biến 
   last_1day = moment().subtract(1, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_2day = moment().subtract(2, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_3day = moment().subtract(3, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_4day = moment().subtract(4, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_5day = moment().subtract(5, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_6day = moment().subtract(6, 'day').format("YYYY-MM-DDTHH:mm:ss");
   last_7day = moment().subtract(7, 'day').format("YYYY-MM-DDTHH:mm:ss");

  //-------------------------------------DTSU666_LAST WEEK------------------------------
  // last 1 day
  DTSU666_last1day(): Observable<any> {
    const startDate = moment(this.last_1day).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(this.last_1day).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ua,Ub,Uc,Ia,Ib,Ic,Pft,Pfa,Pfb,Pfc,A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

  //-----------------------------------------------------------------------The Custom----------------------------------------------------------
  //-------- DTSU666-FILTER DATE----------
  // Bảng chi tiết  
  DTSU666_bangcustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  // Điện áp pha 
  DTSU666_dienapphacustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ua,Ub,Uc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  // Dòng điện pha 
  DTSU666_dongienphacustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ia,Ib,Ic,Date&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  // Công suất tiêu thụ 
  DTSU666_cstieuthucustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Pft,Pfa,Pfb,Pfc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }
  // Điện năng tiêu thụ 
  DTSU666_atieuthucustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
    return this.http.get(url);
  }

  //-------- PZEM017-FILTER DATE----------
  // Điện áp DC 
  PZEM017_dienapDCcustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=U1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get(url);
  }
  // Dòng điện DC 
  PZEM017_dongdienDCcustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=I1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get(url);
  }
  // Công suất DC 
  PZEM017_conguatDCcustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=P1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get(url);
  }
  // Điện năng DC 
  PZEM017_diennangDCcustom(date1: string, date2: string): Observable<any> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=A1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get(url);
  }

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import * as moment from 'moment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DashBoardModel } from './dashboard.model';
import { DashboardService } from './dashboard.service';

//Custom
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: DashboardService) { }

  // Khai báo biến 
  //-----------------------thẻ chung ---------------
  //Thời gian :
  hientai = moment().format("HH:mm:ss");


  //---------------------Thẻ Moment-------------------------
  public dtsu_ngay: Array<DashBoardModel> = [];
  public dtsu1_ngay: Array<DashBoardModel> = [];
  public dtsu2_ngay: Array<DashBoardModel> = [];
  public pzem_ngay: Array<DashBoardModel> = [];

  //---------------------Thẻ To Day--------------------


  //---------------------Thẻ Last week---------------------


  //---------------------Thẻ Last Month--------------------



  //---------------------Thẻ Custom------------------------
  datea!: any;
  dateb!: any;



  isLoading = true;
  public daterangertable!: Array<DashBoardModel>;
  public daterangertable1!: Array<DashBoardModel>;
  public dtsu666custom!: Array<DashBoardModel>;

  public myChart!: Chart;
  // Lọc
  startDate!: Date;
  endDate!: Date;


  //---------------------------------------------------------------------------------------------------------------------------------------
  // Hàm khởi tạo sau constructor
  ngOnInit(): void {
    //---------------------Thẻ Chung--------------------
    setInterval(() => {
      this.hientai = moment().format("HH:mm:ss");
    }, 1000);

    document.getElementById("today")?.click();
    setTimeout(() => {
      document.getElementById("today")?.click();
    }, 100);

    //---------------------Thẻ Today--------------------
    this.DTSU666_ui_moment();
    this.DTSU666_pqphi_moment();
    this.DTSU666_a_moment();
    this.Pzem017_uipa_moment();

    //---------------------Thẻ Last week--------------------

    //---------------------Thẻ Last Month--------------------

    //---------------------Thẻ Custom--------------------

    this.DateRangerPicker_custom();

  }

  //---------------------------------------------------------------------------------------------------------------------------------------






  // Hàm được sử dụng
  //---------------------Thẻ Moment--------------------
  DTSU666_ui_moment() {
    this.http.DTSU666_uimoment()
      .subscribe(cs => {
        this.dtsu_ngay = cs;
      });
  }

  DTSU666_pqphi_moment() {
    this.http.DTSU666_pqphimoment()
      .subscribe(cs => {
        this.dtsu1_ngay = cs;
      });
  }

  DTSU666_a_moment() {
    this.http.DTSU666_amoment()
      .subscribe(cs => {
        this.dtsu2_ngay = cs;
      });
  }

  Pzem017_uipa_moment() {
    this.http.Pzem017_uipamoment().subscribe(da => {
      this.pzem_ngay = da;
    })
  }

  //---------------------Thẻ To day--------------------

  //---------------------Thẻ Last week--------------------

  

  //---------------------Thẻ Custom--------------------
  //----DTSU666 Filter Date----
  async dtsu666_uphacustom() {
    this.http.DTSU666_dienapphacustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.dtsu666custom.map(data => data.Ua);
        const ub = this.dtsu666custom.map(data => data.Ub);
        const uc = this.dtsu666custom.map(data => data.Uc);
        const date1 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_ua = Array.from({ length: ua.length }, () => ua.reduce((acc, val) => acc + val) / ua.length);
        const avgArray_ub = Array.from({ length: ub.length }, () => ub.reduce((acc, val) => acc + val) / ub.length);
        const avgArray_uc = Array.from({ length: uc.length }, () => uc.reduce((acc, val) => acc + val) / uc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapphatodaycustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_dienapphatodaycustom', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Uatb',
                data: avgArray_ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Ub',
                data: ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ubtb',
                data: avgArray_ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Uc',
                data: uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Uctb',
                data: avgArray_uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN ÁP PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },

              }

            },

          },

        });

      })
  }
  async dtsu666_iphacustom() {

    await this.http.DTSU666_dongienphacustom(this.datea, this.dateb).subscribe(

      result => {
        this.dtsu666custom = result;
        const ia1 = this.dtsu666custom.map(data => data.Ia);
        const ib1 = this.dtsu666custom.map(data => data.Ib);
        const ic1 = this.dtsu666custom.map(data => data.Ic);
        const date1 = this.dtsu666custom.map(data => data.Date);
        // Tính trung bình
        const avgArray_ia1 = Array.from({ length: ia1.length }, () => ia1.reduce((acc, val) => acc + val) / ia1.length);
        const avgArray_ib1 = Array.from({ length: ib1.length }, () => ib1.reduce((acc, val) => acc + val) / ib1.length);
        const avgArray_ic1 = Array.from({ length: ic1.length }, () => ic1.reduce((acc, val) => acc + val) / ic1.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dongdienphacustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_dongdienphacustom', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ia',
                data: ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Iatb',
                data: avgArray_ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Ib',
                data: avgArray_ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ibtb',
                data: ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Ic',
                data: ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ictb',
                data: avgArray_ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'DÒNG ĐIỆN PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },


              }

            },

          },

        });

      })
  }
  async dtsu666_pphacustom() {

    //await this.dtsu666today.dtsu666_ppha_today().subscribe(
    await this.http.DTSU666_cstieuthucustom(this.datea, this.dateb).subscribe(

      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const pft = this.dtsu666custom.map(data => data.Pft);
        const pfa = this.dtsu666custom.map(data => data.Pfa);
        const pfb = this.dtsu666custom.map(data => data.Pfb);
        const pfc = this.dtsu666custom.map(data => data.Pfc);
        const date1 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_ft = Array.from({ length: pft.length }, () => pft.reduce((acc, val) => acc + val) / pft.length);
        const avgArray_fa = Array.from({ length: pfa.length }, () => pfa.reduce((acc, val) => acc + val) / pfa.length);
        const avgArray_fb = Array.from({ length: pfb.length }, () => pfb.reduce((acc, val) => acc + val) / pfb.length);
        const avgArray_fc = Array.from({ length: pfc.length }, () => pfc.reduce((acc, val) => acc + val) / pfc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_pphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('dtsu666_pphacustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Pt',
                data: pft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Pttb',
                data: avgArray_ft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Pa',
                data: pfa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Patb',
                data: avgArray_fa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Pb',
                data: pfb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Pbtb',
                data: avgArray_fb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Pc',
                data: pfc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Pctb',
                data: avgArray_fc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'CÔNG SUẤT TIÊU THỤ PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              //decimation: {
              //  enabled: false,
              //  algorithm: 'min-max',
              //},
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async dtsu666_aphacustom() {

    await this.http.DTSU666_atieuthucustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const asum = this.dtsu666custom.map(data => data.A_sum);
        const aimp = this.dtsu666custom.map(data => data.A_imp);
        const aexp = this.dtsu666custom.map(data => data.A_exp);
        const date22 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_asum = Array.from({ length: asum.length }, () => asum.reduce((acc, val) => acc + val) / asum.length);
        const avgArray_aimp = Array.from({ length: aimp.length }, () => aimp.reduce((acc, val) => acc + val) / aimp.length);
        const avgArray_aexp = Array.from({ length: aexp.length }, () => aexp.reduce((acc, val) => acc + val) / aexp.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_diennangtieuthucustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_diennangtieuthucustom', {
          type: 'line',
          data: {
            labels: date22.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Asum',
                data: asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Asumtb',
                data: avgArray_asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Aimp',
                data: aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Aimptb',
                data: avgArray_aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Aexp',
                data: aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Aexptb',
                data: avgArray_aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN NĂNG TIÊU THỤ NGÀY',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  //PZEM017 FilterDate
  async pzem017_uphatoday() {

    await this.http.PZEM017_dienapDCcustom(this.datea, this.dateb).subscribe(
      result => {
      this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
      const u1 = this.dtsu666custom.map(data => data.U1);
      const date1 = this.dtsu666custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_u1 = Array.from({ length: u1.length }, () => u1.reduce((acc, val) => acc + val) / u1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dienapphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dienapphacustom', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'U1',
                data: u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'U1tb',
                data: avgArray_u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN ÁP',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_iphatoday() {

    this.http.PZEM017_dongdienDCcustom(this.datea,this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const i1 = this.dtsu666custom.map(data => data.I1);
        const date1 = this.dtsu666custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_i1 = Array.from({ length: i1.length }, () => i1.reduce((acc, val) => acc + val) / i1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dongdienphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dongdienphacustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'I1',
                data: i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'I1tb',
                data: avgArray_i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - DÒNG ĐIỆN',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_pphatoday() {

    this.http.PZEM017_conguatDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const p1 = this.dtsu666custom.map(data => data.P1);
        const date1 = this.dtsu666custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_p1 = Array.from({ length: p1.length }, () => p1.reduce((acc, val) => acc + val) / p1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017congsuatcustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017congsuatcustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'P1',
                data: p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'P1tb',
                data: avgArray_p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - CÔNG SUẤT',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_aphatoday() {

    this.http.PZEM017_diennangDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const a1 = this.dtsu666custom.map(data => data.A1);
        const date1 = this.dtsu666custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_a1 = Array.from({ length: a1.length }, () => a1.reduce((acc, val) => acc + val) / a1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017diennangcustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017diennangcustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'A1',
                data: a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'A1tb',
                data: avgArray_a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN NĂNG',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                //type: 'linear',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async DateRangerPicker_custom() {
    await this.http.DTSU666_bangcustom(this.datea, this.dateb).subscribe(
      (data) => {
      this.daterangertable = data;
        this.dtsu666_uphacustom();
        this.dtsu666_iphacustom();
        this.dtsu666_pphacustom();
        this.dtsu666_aphacustom();
        this.pzem017_uphatoday();
        this.pzem017_iphatoday();
        this.pzem017_pphatoday();
        this.pzem017_aphatoday();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
    });
  }

  //--------hết  Bieu do 1----------




  //---------------------Thẻ Chung--------------------
  ngAfterViewInit() {
    const t = document.getElementById("today");
    const w = document.getElementById("week");
    const m = document.getElementById("month");
    const y = document.getElementById("year");
    const date = document.getElementById("date");

    // logic for today button when the user is on dashboard
    t?.addEventListener('click', () => {
      date!.innerHTML = moment().format('MMMM, Do YYYY');
    });

    w?.addEventListener('click', () => {
      const startOfWeek = moment().startOf('week').format('MMMM Do');
      const endOfWeek = moment().endOf('week').format('MMMM Do, YYYY');
      date!.innerHTML = `From ${startOfWeek} to ${endOfWeek}`;
    });

    // logic for month button when the user is on dashboard
    m?.addEventListener('click', () => {
      date!.innerHTML = moment().format('MMMM, YYYY');
    });

    // logic for year button when the user is on dashboard
    y?.addEventListener('click', () => {
      date!.innerHTML = moment().format('YYYY');
    });

  }




  //---------------------------------------------------------------------------------------------------------------------------------------

}
//// Lọc dữ liệu theo khoảng thời gian được chọn từ datepicker
        //const filteredData = this.filterDataByDateRange(data, startDate, endDate);

        //// Cập nhật dữ liệu cho biểu đồ
        //this.myChart.data.datasets[0].data = filteredData.map(item => item.ua);
        //this.myChart.data.datasets[1].data = filteredData.map(item => item.ub);
        //this.myChart.data.datasets[2].data = filteredData.map(item => item.uc);
        //this.myChart.data.labels = filteredData.map(item => format(new Date(item.date), 'hh:mm'));

        //// Vẽ lại biểu đồ
        //this.myChart.update();



















//import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import { Chart, registerables } from 'chart.js';
//import { format } from 'date-fns';
//import * as moment from 'moment';
//import { map, Observable } from 'rxjs';
//import { DashBoardModel } from './dashboard.model';
//import { DashboardService } from './dashboard.service';

////Custom
//Chart.register(...registerables);


//@Component({
//  selector: 'app-dashboard',
//  templateUrl: './dashboard.component.html',
//  styleUrls: ['./dashboard.component.css']
//})
//export class DashboardComponent implements OnInit {
//  constructor(private http: DashboardService) { }

//  // Khai báo biến 
//  //-----------------------thẻ chung ---------------
//  //Thời gian :
//  hientai = moment().format("HH:mm:ss");
 
 
//  //---------------------Thẻ Today-------------------------
//  public dtsu_ngay: Array<DashBoardModel> = [];
//  public dtsu1_ngay: Array<DashBoardModel> = [];
//  public dtsu2_ngay: Array<DashBoardModel> = [];
//  public pzem_ngay: Array<DashBoardModel> = [];

//  //---------------------Thẻ Last week---------------------

//  //---------------------Thẻ Last Month--------------------

//  //---------------------Thẻ Custom------------------------
//  datea: any;
//  dateb: any;

//  isLoading = true;
//  public daterangertable!: Array<DashBoardModel>;
//  //Bieu do
//  data: any;
//  CHART_COLORS = {
//    red: 'rgb(255, 99, 132)',
//    orange: 'rgb(255, 159, 64)',
//    yellow: 'rgb(255, 205, 86)',
//    green: 'rgb(75, 192, 192)',
//    blue: 'rgb(54, 162, 235)',
//    purple: 'rgb(153, 102, 255)',
//    grey: 'rgb(201, 203, 207)'
//  };

//  public myChart!: Chart;
//  // Lọc
//  startDate!: Date;
//  endDate!: Date;




//  //---------------------------------------------------------------------------------------------------------------------------------------





//  // Hàm khởi tạo sau constructor
//  ngOnInit(): void {
//    //---------------------Thẻ Chung--------------------
//    setInterval(() => {
//      this.hientai = moment().format("HH:mm:ss");
//      //Custom
//      this.DateRangerPicker_demo();
//    }, 1000);

//    document.getElementById("today")?.click();
//    setTimeout(() => {
//      document.getElementById("today")?.click();
//    }, 100);

//  //---------------------Thẻ Today--------------------
//    this.DTSU_ngay();
//    this.DTSU1_ngay();
//    this.DTSU2_ngay();
//    this.PZEM_ngay();

//  //---------------------Thẻ Last week--------------------

//  //---------------------Thẻ Last Month--------------------

//  //---------------------Thẻ Custom--------------------
//    this.P1bieudoduongconnectdata();
   
//  }

//  //---------------------------------------------------------------------------------------------------------------------------------------






//  // Hàm được sử dụng
//  //---------------------Thẻ Today--------------------
//  DTSU_ngay() {
//    this.http.DTSU_upha(this.datea,this.dateb)
//      .subscribe(cs => {
//        this.dtsu_ngay = cs;
//      });
//  }

//  DTSU1_ngay() {
//    this.http.DTSU_cs()
//      .subscribe(cs => {
//        this.dtsu1_ngay = cs;
//      });
//  }

//  DTSU2_ngay() {
//    this.http.DTSU_cs1()
//      .subscribe(cs => {
//        this.dtsu2_ngay = cs;
//      });
//  }

//  PZEM_ngay() {
//    this.http.Pzem_da().subscribe(da => {
//      this.pzem_ngay = da;
//    })
//  }

//  //---------------------Thẻ Last week--------------------

//  //---------------------Thẻ Last Month--------------------

//  //---------------------Thẻ Custom--------------------
//  //----Bang Filter Date---- 
//  DateRangerPicker_demo() {
//    this.http.Get21date(this.datea, this.dateb).subscribe(
//      (res) => {
//        this.daterangertable = res;
//        this.isLoading = false;
//      },
//      (err) => {
//        console.log(err);
//        this.isLoading = false;
//      }
//    );
//  }
//  //-------- Bieu do 1----------

//  async P1bieudoduongconnectdata() {

//    await this.http.Get21date(this.datea, this.dateb).subscribe(

//      result => {
//        this.daterangertable = result;

//        const arr1 = [];
//        for (let i = 0; i < this.daterangertable.length; i++) {
//          arr1.push(this.daterangertable[i].Ua)
//        }
//        const arr3 = [];
//        for (let i = 0; i < this.daterangertable.length; i++) {
//          arr3.push(this.daterangertable[i].Ub)
//        }
//        const arr4 = [];
//        for (let i = 0; i < this.daterangertable.length; i++) {
//          arr4.push(this.daterangertable[i].Uc)
//        }
//        const arr2 = [];
//        for (let i = 0; i < this.daterangertable.length; i++) {
//          arr2.push(this.daterangertable[i].Date)
//        }
//        const minYValue = Math.min(...arr3);
//        const minY1Value = Math.min(...arr1);
//        const suggestedMinYValue = Math.min(minYValue, minY1Value);
//        // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới 
//        if (this.myChart) {
//          this.myChart.destroy();
//        }

//        this.myChart = new Chart('p1bieudoduongconnectdata', {
//          type: 'line',
//          data: {
//            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
//            labels: arr2.map(date => format(new Date(date), 'hh:mm')),
//            datasets: [
//              {
//                label: 'Ua',
//                data: arr1,
//                borderColor: this.CHART_COLORS.red,
//                backgroundColor: this.CHART_COLORS.red,
//              },
//              {
//                label: 'Ub',
//                data: arr3,
//                borderColor: this.CHART_COLORS.blue,
//                backgroundColor: this.CHART_COLORS.blue,
//                //pointRadius: 3,
//                //pointHoverRadius: 3,
//                //showLine: true,           // tắt đường nối giữa các điểm
//                borderWidth: 1,
//              },
//              {
//                label: 'Uc',
//                data: arr4,
//                borderColor: this.CHART_COLORS.yellow,
//                backgroundColor: this.CHART_COLORS.yellow,
//                borderWidth: 1,
//              }
//            ]
//          },
//          options: {
//            plugins: {
//              datalabels: {
//                color: '#cccccc',
//                display: true,
//                anchor: 'end',
//                align: 'top',
//                font: {
//                  size: 10
//                },
//                formatter: function (value, context) {
//                  return value + 'V';
//                }
//              },
//              decimation: {
//                enabled: false,
//                algorithm: 'min-max',
//              },
//            },
//            scales: {
//              x: {
//                offset: true,
//                grid: {
//                  color: '#2d2b2b'
//                },
//              },
//              y: {
//                offset: true,
//                suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
//                grid: {
//                  color: '#2d2b2b'
//                }
//              }

//            },
//          },
//        });

//      })
//  }


//  //--------hết  Bieu do 1----------

//  //---------------------Thẻ Chung--------------------
//  ngAfterViewInit() {
//    const t = document.getElementById("today");
//    const w = document.getElementById("week");
//    const m = document.getElementById("month");
//    const y = document.getElementById("year");
//    const date = document.getElementById("date");

//    // logic for today button when the user is on dashboard
//    t?.addEventListener('click', () => {
//      date!.innerHTML = moment().format('MMMM, Do YYYY');
//    });

//    w?.addEventListener('click', () => {
//      const startOfWeek = moment().startOf('week').format('MMMM Do');
//      const endOfWeek = moment().endOf('week').format('MMMM Do, YYYY');
//      date!.innerHTML = `From ${startOfWeek} to ${endOfWeek}`;
//    });

//    // logic for month button when the user is on dashboard
//    m?.addEventListener('click', () => {
//      date!.innerHTML = moment().format('MMMM, YYYY');
//    });

//    // logic for year button when the user is on dashboard
//    y?.addEventListener('click', () => {
//      date!.innerHTML = moment().format('YYYY');
//    });

//  }




//  //---------------------------------------------------------------------------------------------------------------------------------------

//}
////// Lọc dữ liệu theo khoảng thời gian được chọn từ datepicker
//        //const filteredData = this.filterDataByDateRange(data, startDate, endDate);

//        //// Cập nhật dữ liệu cho biểu đồ
//        //this.myChart.data.datasets[0].data = filteredData.map(item => item.ua);
//        //this.myChart.data.datasets[1].data = filteredData.map(item => item.ub);
//        //this.myChart.data.datasets[2].data = filteredData.map(item => item.uc);
//        //this.myChart.data.labels = filteredData.map(item => format(new Date(item.date), 'hh:mm'));

//        //// Vẽ lại biểu đồ
//        //this.myChart.update();

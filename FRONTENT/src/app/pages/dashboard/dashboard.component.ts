



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


  //---------------------Thẻ Today-------------------------
  public dtsu_ngay: Array<DashBoardModel> = [];
  public dtsu1_ngay: Array<DashBoardModel> = [];
  public dtsu2_ngay: Array<DashBoardModel> = [];
  public pzem_ngay: Array<DashBoardModel> = [];

  //---------------------Thẻ Last week---------------------

  //---------------------Thẻ Last Month--------------------

  //---------------------Thẻ Custom------------------------
  datea!: any;
  dateb!: any;



  isLoading = true;
  public daterangertable!: Array<DashBoardModel>;
  public daterangertable1!: Array<DashBoardModel>;
  //Bieu do

  CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

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
    this.DTSU_ngay();
    this.DTSU1_ngay();
    this.DTSU2_ngay();
    this.PZEM_ngay();

    //---------------------Thẻ Last week--------------------

    //---------------------Thẻ Last Month--------------------

    //---------------------Thẻ Custom--------------------

    this.DateRangerPicker_demo();

  }

  //---------------------------------------------------------------------------------------------------------------------------------------






  // Hàm được sử dụng
  //---------------------Thẻ Today--------------------
  DTSU_ngay() {
    this.http.DTSU_upha(this.datea, this.dateb)
      .subscribe(cs => {
        this.dtsu_ngay = cs;
      });
  }

  DTSU1_ngay() {
    this.http.DTSU_cs()
      .subscribe(cs => {
        this.dtsu1_ngay = cs;
      });
  }

  DTSU2_ngay() {
    this.http.DTSU_cs1()
      .subscribe(cs => {
        this.dtsu2_ngay = cs;
      });
  }

  PZEM_ngay() {
    this.http.Pzem_da().subscribe(da => {
      this.pzem_ngay = da;
    })
  }

  //---------------------Thẻ Last week--------------------

  //---------------------Thẻ Last Month--------------------

  //---------------------Thẻ Custom--------------------
  //----Bang Filter Date----

  async chartData() {
    try {
      // Lấy dữ liệu từ server
      const result = await this.http.Get21date(this.datea, this.dateb).toPromise();
      const ua = result.map((data: { Ua: number; }) => data.Ua);
      const ub = result.map((data: { Ub: number; }) => data.Ub);
      const uc = result.map((data: { Uc: number; }) => data.Uc);
      const date11 = result.map((data: { Date: string; }) => data.Date);

      //const minYValue = Math.min(...arr3);
      //const minY1Value = Math.min(...arr1);
      //const suggestedMinYValue = Math.min(minYValue, minY1Value);

      // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biểu đồ cũ sẽ hủy nó và tạo biểu đồ mới
      if (this.myChart) {
        this.myChart.destroy();
      }

      // Tạo biểu đồ mới
      this.myChart = new Chart('p1bieudoduongconnectdata', {
        type: 'line',
        data: {
          //labels: date11.map((date: string) => format(new Date(date), 'hh:mm')),
          labels: date11.map((date1: moment.MomentInput) => moment(date1).format('HH:mm')),
          datasets: [
            {
              label: 'Ua',
              data: ua,
              borderColor: this.CHART_COLORS.red,
              backgroundColor: this.CHART_COLORS.red,
              borderWidth: 1,
              pointRadius: 1,
            },
            {
              label: 'Ub',
              data: ub,
              borderColor: this.CHART_COLORS.blue,
              backgroundColor: this.CHART_COLORS.blue,
              borderWidth: 1,
              pointRadius: 1,
            },
            {
              label: 'Uc',
              data: uc,
              borderColor: this.CHART_COLORS.yellow,
              backgroundColor: this.CHART_COLORS.yellow,
              borderWidth: 1,
              pointRadius: 1,
            }
          ]
        },
        options: {
          elements: {
            point: {
              radius: 2,  // đặt bán kính của điểm là 0 để ẩn điểm
            }
          },
          plugins: {
            datalabels: {
              display:false
              }
            //datalabels: {
            //  color: '#cccccc',
            //  display: true,
            //  anchor: 'end',
            //  align: 'top',
            //  font: {
            //    size: 10
            //  },
            //  formatter: function (value, context) {
            //    return value + 'V';
            //  }
            //},
            //decimation: {
            //  enabled: false,
            //  algorithm: 'min-max',
            //},
          },
          scales: {
            x: {
              offset: true,
              grid: {
                color: '#2d2b2b'
              },
            },
            y: {
              offset: true,
              //suggestedMin: suggestedMinYValue, // thiết lập suggestedMin để sát với giá trị nhất
              grid: {
                color: '#2d2b2b'
              }
            }
          }
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  DateRangerPicker_demo() {
    this.http.Get21date(this.datea, this.dateb).subscribe(
      (data) => {
      this.daterangertable = data;
        this.chartData();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
    });
  }




  //DateRangerPicker_demo() {
  //  this.http.Get21date(this.datea, this.dateb).subscribe(
  //    (res) => {
  //      this.daterangertable = res;
  //      this.isLoading = false;
  //    },
  //    (err) => {
  //      console.log(err);
  //      this.isLoading = false;
  //    }
  //  );
  //}
  //-------- Bieu do 1----------
 

  //async P1bieudoduongconnectdata() {
  //  const result = await this.http.Get21date(this.datea, this.dateb).toPromise();
  //  const arr1 = result.map((data: { Ua: number; }) => data.Ua);
  //  const arr3 = result.map((data: { Ub: number; }) => data.Ub);
  //  const arr4 = result.map((data: { Uc: number; }) => data.Uc);
  //  const arr2 = result.map((data: { Date: string; }) => data.Date);

  //  const minYValue = Math.min(...arr3);
  //  const minY1Value = Math.min(...arr1);
  //  const suggestedMinYValue = Math.min(minYValue, minY1Value);

  //  // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới
  //  if (this.myChart) {
  //    this.myChart.destroy();
  //  }

  //  this.myChart = new Chart('p1bieudoduongconnectdata', {
  //    type: 'line',
  //    data: {
  //      labels: arr2.map((date: string | number) => format(new Date(date), 'hh:mm')),
  //      datasets: [
  //        {
  //          label: 'Ua',
  //          data: arr1,
  //          borderColor: this.CHART_COLORS.red,
  //          backgroundColor: this.CHART_COLORS.red,
  //        },
  //        {
  //          label: 'Ub',
  //          data: arr3,
  //          borderColor: this.CHART_COLORS.blue,
  //          backgroundColor: this.CHART_COLORS.blue,
  //          borderWidth: 1,
  //        },
  //        {
  //          label: 'Uc',
  //          data: arr4,
  //          borderColor: this.CHART_COLORS.yellow,
  //          backgroundColor: this.CHART_COLORS.yellow,
  //          borderWidth: 1,
  //        }
  //      ]
  //    },
  //    options: {
  //      plugins: {
  //        datalabels: {
  //          color: '#cccccc',
  //          display: true,
  //          anchor: 'end',
  //          align: 'top',
  //          font: {
  //            size: 10
  //          },
  //          formatter: function (value, context) {
  //            return value + 'V';
  //          }
  //        },
  //        decimation: {
  //          enabled: false,
  //          algorithm: 'min-max',
  //        },
  //      },
  //      scales: {
  //        x: {
  //          offset: true,
  //          grid: {
  //            color: '#2d2b2b'
  //          },
  //        },
  //        y: {
  //          offset: true,
  //          suggestedMin: suggestedMinYValue, // thiết lập suggestedMin để sát với giá trị nhất
  //          grid: {
  //            color: '#2d2b2b'
  //          }
  //        }
  //      }
  //    }
  //  });
  //}


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

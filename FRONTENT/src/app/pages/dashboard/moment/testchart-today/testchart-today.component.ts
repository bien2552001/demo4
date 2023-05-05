

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
Chart.register(...registerables);
@Component({
  selector: 'app-testchart-today',
  templateUrl: './testchart-today.component.html',
  styleUrls: ['./testchart-today.component.css']
})
export class TestchartTodayComponent implements OnInit {

  myChart!: Chart;

  public dtsu666model!: Array<DashBoardModel>;



  constructor(private chartjsdata123: DashboardService) { }

  ngOnInit(): void {
    setInterval(() => {
      //Custom
      //this.P1bieudoduongconnectdata();
    }, 1000);

    this.P1bieudoduongconnectdata();
  }


  CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };


  datea!: any;
  dateb!: any;

  async P1bieudoduongconnectdata() {

    await this.chartjsdata123.Get21date(this.datea, this.dateb).subscribe(

      result => {
        this.dtsu666model = result;

        const ua = [];
        for (let i = 0; i < this.dtsu666model.length; i++) {
          ua.push(this.dtsu666model[i].Ua)
        }
        const ub = [];
        for (let i = 0; i < this.dtsu666model.length; i++) {
          ub.push(this.dtsu666model[i].Ub)
        }
        const uc = [];
        for (let i = 0; i < this.dtsu666model.length; i++) {
          uc.push(this.dtsu666model[i].Uc)
        }
        const date11 = [];
        for (let i = 0; i < this.dtsu666model.length; i++) {
          date11.push(this.dtsu666model[i].Date)
        }
        //const minYValue = Math.min(...arr3);
        //const minY1Value = Math.min(...arr1);
        //const suggestedMinYValue = Math.min(minYValue, minY1Value);

        // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới 
        if (this.myChart) {
          this.myChart.destroy();
        }


        this.myChart = new Chart('p1bieudoduongconnectdata', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            labels: date11.map(date => format(new Date(date), 'hh:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua,
                borderColor: this.CHART_COLORS.red,
                backgroundColor: this.CHART_COLORS.red,
                borderWidth: 1,
              },
              {
                label: 'Ub',
                data: ub,
                borderColor: this.CHART_COLORS.blue,
                backgroundColor: this.CHART_COLORS.blue,
                //pointRadius: 3,
                //pointHoverRadius: 3,
                //showLine: true,           // tắt đường nối giữa các điểm
                borderWidth: 1,
              },
              {
                label: 'Uc',
                data: uc,
                borderColor: this.CHART_COLORS.yellow,
                backgroundColor: this.CHART_COLORS.yellow,
                borderWidth: 1,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                color: '#cccccc',
                display: true,
                anchor: 'end',
                align: 'top',
                font: {
                  size: 10
                },
                formatter: function (value, context) {
                  return value + 'V';
                }
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
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
                type: 'logarithmic',
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                }
              }

            },
          },
        });

      })
  }


}






















//import { Component, OnInit } from '@angular/core';
//import { Chart, registerables } from 'chart.js';
//import { format } from 'date-fns';
//import { DashBoardModel } from '../../dashboard.model';
//import { DashboardService } from '../../dashboard.service';
//Chart.register(...registerables);
//@Component({
//  selector: 'app-testchart-today',
//  templateUrl: './testchart-today.component.html',
//  styleUrls: ['./testchart-today.component.css']
//})
//export class TestchartTodayComponent implements OnInit {

//  myChart!: Chart;

//  public dtsu666model!: Array<DashBoardModel>;



//  constructor(private chartjsdata123: DashboardService) { }

//  ngOnInit(): void {
//    setInterval(() => {
//      //Custom
//      //this.P1bieudoduongconnectdata();
//    }, 1000);

//    this.P1bieudoduongconnectdata();
//  }


//  CHART_COLORS = {
//    red: 'rgb(255, 99, 132)',
//    orange: 'rgb(255, 159, 64)',
//    yellow: 'rgb(255, 205, 86)',
//    green: 'rgb(75, 192, 192)',
//    blue: 'rgb(54, 162, 235)',
//    purple: 'rgb(153, 102, 255)',
//    grey: 'rgb(201, 203, 207)'
//  };


//  datea!: any;
//  dateb!: any;

//  async P1bieudoduongconnectdata() {

//    await this.chartjsdata123.Get21date(this.datea, this.dateb).subscribe(

//      result => {
//        this.dtsu666model = result;

//        const arr1 = [];
//        for (let i = 0; i < this.dtsu666model.length; i++) {
//          arr1.push(this.dtsu666model[i].Ua)
//        }
//        const arr3 = [];
//        for (let i = 0; i < this.dtsu666model.length; i++) {
//          arr3.push(this.dtsu666model[i].Ub)
//        }
//        const arr4 = [];
//        for (let i = 0; i < this.dtsu666model.length; i++) {
//          arr4.push(this.dtsu666model[i].Uc)
//        }
//        const arr2 = [];
//        for (let i = 0; i < this.dtsu666model.length; i++) {
//          arr2.push(this.dtsu666model[i].Date)
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
//                //pointRadius: 3,
//                //pointHoverRadius: 3,
//                //showLine: true,           // tắt đường nối giữa các điểm
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
//            //plugins: {
//            //  display: true,
//            //  decimation: {
//            //    enabled: false,
//            //    algorithm: 'min-max',
//            //  },

//            //},
//            scales: {
//              x: {
//                offset:true,
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


//}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { format, subDays } from 'date-fns';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-uphalastweek',
  templateUrl: './dtsu666-uphalastweek.component.html',
  styleUrls: ['./dtsu666-uphalastweek.component.css']
})
export class Dtsu666UphalastweekComponent implements OnInit {
  // Biến 
  public dtsu666_dienappha_today!: Array<DashBoardModel>;
  myChart!: Chart;
  //Điện áp pha
  upha_last1day!: Array<DashBoardModel>;

  avgArray: number[] = [];
  date111!: any[];


  constructor(private dtsu666lastweek: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_uphalast1day();
    this.chung();
  }

  chung() {
    this.dtsu666lastweek.DTSU666_last1day().subscribe(data1 =>
      this.upha_last1day = data1
    )
  }

  async dtsu666_uphalast1day() {
    this.dtsu666lastweek.DTSU666_last1day().subscribe(
      result => {
        this.upha_last1day = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.upha_last1day.map(data => data.Ua);
        const ub = this.upha_last1day.map(data => data.Ub);
        const uc = this.upha_last1day.map(data => data.Uc);
        this.date111 = this.upha_last1day.map(data => data.Date);

        // Tính trung bình
        const avgArray_ua = ua.reduce((acc, val) => acc + val) / ua.length;
        const avgArray_ub = ub.reduce((acc, val) => acc + val) / ub.length;
        const avgArray_uc = uc.reduce((acc, val) => acc + val) / uc.length;
         this.avgArray = [avgArray_ua, avgArray_ub, avgArray_uc];

      })
    
  }
  charttest() {
    // Hủy Chart hiện tại (nếu có)
    const chart = Chart.getChart('dtsu666_upha_last1day');
    if (chart) {
      chart.destroy();
    }
    this.myChart = new Chart('dtsu666_upha_last1day', {
      type: 'bar',
      data: {
        labels: this.date111.map(date => moment(date).format('DD/MM')),
        datasets: [
          {
            label: 'U',
            data: this.avgArray,
            backgroundColor: ['red', 'yellow', 'green'],
            borderWidth: 1.5,
          },
        ],
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
            offset: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
}

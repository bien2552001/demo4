import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-pzem017-dongdientoday',
  templateUrl: './pzem017-dongdientoday.component.html',
  styleUrls: ['./pzem017-dongdientoday.component.css']
})
export class Pzem017DongdientodayComponent implements OnInit {
  // Biến 
  public pzem017_dongdien_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.pzem017_itoday();
  }
  async pzem017_itoday() {

    this.dtsu666today.PZEM017_dongdien_today().subscribe(
      result => {
        this.pzem017_dongdien_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const i1 = this.pzem017_dongdien_today.map(data => data.I1);
        const date1 = this.pzem017_dongdien_today.map(data => data.Date1);

        // Tính trung bình
        const avgArray_i1 = Array.from({ length: i1.length }, () => i1.reduce((acc, val) => acc + val) / i1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dongdientoday');
        if (chart) {
          chart.destroy();
        }



        this.mychart = new Chart('pzem017_dongdientoday', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
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
                text: 'DÒNG ĐIỆN',
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
}

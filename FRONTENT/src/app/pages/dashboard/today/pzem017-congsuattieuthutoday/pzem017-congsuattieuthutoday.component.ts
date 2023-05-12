import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-pzem017-congsuattieuthutoday',
  templateUrl: './pzem017-congsuattieuthutoday.component.html',
  styleUrls: ['./pzem017-congsuattieuthutoday.component.css']
})
export class Pzem017CongsuattieuthutodayComponent implements OnInit {
  // Biến 
  public pzem017_dongdien_today!: Array<DashBoardModel>;
  mychart!: Chart;
  constructor(private dtsu666today: DashboardService) { }
  ngOnInit(): void {
    this.pzem017_ptoday();
  }
  async pzem017_ptoday() {

    this.dtsu666today.PZEM017_ptieuthu_today().subscribe(
      result => {
        this.pzem017_dongdien_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const p1 = this.pzem017_dongdien_today.map(data => data.P1);
        const date1 = this.pzem017_dongdien_today.map(data => data.Date1);

        // Tính trung bình
        const avgArray_p1 = Array.from({ length: p1.length }, () => p1.reduce((acc, val) => acc + val) / p1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_ptieuthutoday');
        if (chart) {
          chart.destroy();
        }

        this.mychart = new Chart('pzem017_ptieuthutoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'P1',
                data: p1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'P1tb',
                data: avgArray_p1,
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
                text: 'CÔNG SUẤT',
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

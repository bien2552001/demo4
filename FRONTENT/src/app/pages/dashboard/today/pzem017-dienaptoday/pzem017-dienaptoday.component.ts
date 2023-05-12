import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-pzem017-dienaptoday',
  templateUrl: './pzem017-dienaptoday.component.html',
  styleUrls: ['./pzem017-dienaptoday.component.css']
})
export class Pzem017DienaptodayComponent implements OnInit {
  // Biến 
  public pzem017_dienappha_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private pzem017today: DashboardService) { }

  ngOnInit(): void {
    this.pzem017_uphatoday();
  }
  async pzem017_uphatoday() {

    this.pzem017today.PZEM017_dienappha_today().subscribe(
      result => {
        this.pzem017_dienappha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const u1 = this.pzem017_dienappha_today.map(data => data.U1);
        const date1 = this.pzem017_dienappha_today.map(data => data.Date1);
        // Tính trung bình
        const avgArray_u1 = Array.from({ length: u1.length }, () => u1.reduce((acc, val) => acc + val) / u1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dienapphatoday');
        if (chart) {
          chart.destroy();
        }


        this.mychart = new Chart('pzem017_dienapphatoday', {
          type: 'line',
          data: {
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
                text: 'ĐIỆN ÁP',
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

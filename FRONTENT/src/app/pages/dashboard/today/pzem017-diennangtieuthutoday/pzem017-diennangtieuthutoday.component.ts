import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-pzem017-diennangtieuthutoday',
  templateUrl: './pzem017-diennangtieuthutoday.component.html',
  styleUrls: ['./pzem017-diennangtieuthutoday.component.css']
})
export class Pzem017DiennangtieuthutodayComponent implements OnInit {
  // Biến 
  public pzem017_a_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.pzem017_atoday();
  }
  async pzem017_atoday() {

    this.dtsu666today.PZEM017_atieuthu_today().subscribe(
      result => {
        this.pzem017_a_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const a1 = this.pzem017_a_today.map(data => data.A1);
        const date1 = this.pzem017_a_today.map(data => data.Date1);

        // Tính trung bình
        const avgArray_a1 = Array.from({ length: a1.length }, () => a1.reduce((acc, val) => acc + val) / a1.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_atieuthutoday');
        if (chart) {
          chart.destroy();
        }

        this.mychart = new Chart('pzem017_atieuthutoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'A1',
                data: a1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'A1tb',
                data: avgArray_a1,
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
                text: 'ĐIỆN NĂNG TIÊU THỤ',
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

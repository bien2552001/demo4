import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-qphankhangphatoday',
  templateUrl: './dtsu666-qphankhangphatoday.component.html',
  styleUrls: ['./dtsu666-qphankhangphatoday.component.css']
})
export class Dtsu666QphankhangphatodayComponent implements OnInit {

  // Biến 
  public dtsu666_qpha_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_pphatoday();
  }
  async dtsu666_pphatoday() {

    //await this.dtsu666today.dtsu666_qpha_today().subscribe(
    await this.dtsu666today.DTSU666_qphankhangpha_today().subscribe(

      result => {
        this.dtsu666_qpha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const qft = this.dtsu666_qpha_today.map(data => data.Qft);
        const qfa = this.dtsu666_qpha_today.map(data => data.Qfa);
        const qfb = this.dtsu666_qpha_today.map(data => data.Qfb);
        const qfc = this.dtsu666_qpha_today.map(data => data.Qfc);
        const date2 = this.dtsu666_qpha_today.map(data => data.Date);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_qphankhangphatoday');
        if (chart) {
          chart.destroy();
        }



        this.mychart = new Chart('dtsu666_qphankhangphatoday', {
          type: 'line',
          data: {
            labels: date2.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Qft',
                data: qft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.5,
                pointRadius: 0,
              },
              {
                label: 'Qfa',
                data: qfa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.5,
                pointRadius: 0,
              },
              {
                label: 'Qfb',
                data: qfb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.5,
                pointRadius: 0,
              },
              {
                label: 'Qfc',
                data: qfc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 0.5,
                pointRadius: 0,
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
                text: 'CÔNG SUẤT PHẢN KHÁNG PHA',
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
}

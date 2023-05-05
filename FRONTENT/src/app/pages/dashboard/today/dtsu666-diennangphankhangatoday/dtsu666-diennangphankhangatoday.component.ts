import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-diennangphankhangatoday',
  templateUrl: './dtsu666-diennangphankhangatoday.component.html',
  styleUrls: ['./dtsu666-diennangphankhangatoday.component.css']
})
export class Dtsu666DiennangphankhangatodayComponent implements OnInit {


  // Biến 
  public dtsu666_diennangtieuthu_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_pphatoday();
  }
  async dtsu666_pphatoday() {

    await this.dtsu666today.DTSU666_dienangphankhangpha_today().subscribe(

      result => {
        this.dtsu666_diennangtieuthu_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const q1 = this.dtsu666_diennangtieuthu_today.map(data => data.Q1);
        const q2 = this.dtsu666_diennangtieuthu_today.map(data => data.Q2);
        const q3 = this.dtsu666_diennangtieuthu_today.map(data => data.Q3);
        const q4 = this.dtsu666_diennangtieuthu_today.map(data => data.Q4);
        const date21 = this.dtsu666_diennangtieuthu_today.map(data => data.Date);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_diennangphankhangtoday');
        if (chart) {
          chart.destroy();
        }


        this.mychart = new Chart('dtsu666_diennangphankhangtoday', {
          type: 'line',
          data: {
            labels: date21.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Q1',
                data: q1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 1,
              },
              {
                label: 'Q2',
                data: q2,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 1,
              },
              {
                label: 'Q3',
                data: q3,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 1,
              },
              {
                label: 'Q4',
                data: q4,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1,
                pointRadius: 1,
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
                text: 'ĐIỆN NĂNG PHẢN KHÁNG NGÀY',
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




 
}

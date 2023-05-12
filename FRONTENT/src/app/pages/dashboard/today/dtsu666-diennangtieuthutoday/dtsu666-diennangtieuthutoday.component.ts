import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-diennangtieuthutoday',
  templateUrl: './dtsu666-diennangtieuthutoday.component.html',
  styleUrls: ['./dtsu666-diennangtieuthutoday.component.css']
})
export class Dtsu666DiennangtieuthutodayComponent implements OnInit {

  // Biến 
  public dtsu666_diennangphankhang_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_aphatoday();
  }
  async dtsu666_aphatoday() {

    //await this.dtsu666today.dtsu666_diennangphankhang_today().subscribe(
    await this.dtsu666today.DTSU666_dienangtieuthu_today().subscribe(

      result => {
        this.dtsu666_diennangphankhang_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const asum = this.dtsu666_diennangphankhang_today.map(data => data.A_sum);
        const aimp = this.dtsu666_diennangphankhang_today.map(data => data.A_imp);
        const aexp = this.dtsu666_diennangphankhang_today.map(data => data.A_exp);
        const date22 = this.dtsu666_diennangphankhang_today.map(data => data.Date);

        // Tính trung bình
        const avgArray_asum = Array.from({ length: asum.length }, () => asum.reduce((acc, val) => acc + val) / asum.length);
        const avgArray_aimp = Array.from({ length: aimp.length }, () => aimp.reduce((acc, val) => acc + val) / aimp.length);
        const avgArray_aexp = Array.from({ length: aexp.length }, () => aexp.reduce((acc, val) => acc + val) / aexp.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_diennangtieuthutoday');
        if (chart) {
          chart.destroy();
        }

        this.mychart = new Chart('dtsu666_diennangtieuthutoday', {
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

}

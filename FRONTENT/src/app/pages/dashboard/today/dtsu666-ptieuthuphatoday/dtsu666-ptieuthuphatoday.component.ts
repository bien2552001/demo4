import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-ptieuthuphatoday',
  templateUrl: './dtsu666-ptieuthuphatoday.component.html',
  styleUrls: ['./dtsu666-ptieuthuphatoday.component.css']
})
export class Dtsu666PtieuthuphatodayComponent implements OnInit {

  // Biến 
  public dtsu666_ppha_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_pphatoday();
  }
  async dtsu666_pphatoday() {

    //await this.dtsu666today.dtsu666_ppha_today().subscribe(
    await this.dtsu666today.DTSU666_ptieuthupha_today().subscribe(

      result => {
        this.dtsu666_ppha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const pft = this.dtsu666_ppha_today.map(data => data.Pft);
        const pfa = this.dtsu666_ppha_today.map(data => data.Pfa);
        const pfb = this.dtsu666_ppha_today.map(data => data.Pfb);
        const pfc = this.dtsu666_ppha_today.map(data => data.Pfc);
        const date1 = this.dtsu666_ppha_today.map(data => data.Date);

        // Tính trung bình
        const avgArray_ft = Array.from({ length: pft.length }, () => pft.reduce((acc, val) => acc + val) / pft.length);
        const avgArray_fa = Array.from({ length: pfa.length }, () => pfa.reduce((acc, val) => acc + val) / pfa.length);
        const avgArray_fb = Array.from({ length: pfb.length }, () => pfb.reduce((acc, val) => acc + val) / pfb.length);
        const avgArray_fc = Array.from({ length: pfc.length }, () => pfc.reduce((acc, val) => acc + val) / pfc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_pphatoday');
        if (chart) {
          chart.destroy();
        }


        this.mychart = new Chart('dtsu666_pphatoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Pt',
                data: pft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Pttb',
                data: avgArray_ft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Pa',
                data: pfa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Patb',
                data: avgArray_fa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Pb',
                data: pfb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Pbtb',
                data: avgArray_fb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Pc',
                data: pfc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Pctb',
                data: avgArray_fc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
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
                text: 'CÔNG SUẤT TIÊU THỤ PHA',
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

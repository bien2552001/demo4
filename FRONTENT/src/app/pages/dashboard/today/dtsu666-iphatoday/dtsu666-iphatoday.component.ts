import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-iphatoday',
  templateUrl: './dtsu666-iphatoday.component.html',
  styleUrls: ['./dtsu666-iphatoday.component.css']
})
export class Dtsu666IphatodayComponent implements OnInit {
  // Biến 
  public dtsu666_dongdienpha_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_iphatoday();
  }
  async dtsu666_iphatoday() {

    await this.dtsu666today.DTSU666_dongdienpha_today().subscribe(

      result => {
        this.dtsu666_dongdienpha_today = result;
        const ia1 = this.dtsu666_dongdienpha_today.map(data => data.Ia);
        const ib1 = this.dtsu666_dongdienpha_today.map(data => data.Ib);
        const ic1 = this.dtsu666_dongdienpha_today.map(data => data.Ic);
        const date1 = this.dtsu666_dongdienpha_today.map(data => data.Date);

        // Tính trung bình
        const avgArray_ia = Array.from({ length: ia1.length }, () => ia1.reduce((acc, val) => acc + val) / ia1.length);
        const avgArray_ib = Array.from({ length: ib1.length }, () => ib1.reduce((acc, val) => acc + val) / ib1.length);
        const avgArray_ic = Array.from({ length: ic1.length }, () => ic1.reduce((acc, val) => acc + val) / ic1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dongdienphatoday');
        if (chart) {
          chart.destroy();
        }

        this.mychart = new Chart('dtsu666_dongdienphatoday', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ia',
                data: ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Iatb',
                data: avgArray_ia,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Ib',
                data: avgArray_ib,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ibtb',
                data: ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
              {
                label: 'Ic',
                data: ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ictb',
                data: avgArray_ic,
                borderColor: 'green',
                backgroundColor: 'green',
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
                text: 'DÒNG ĐIỆN PHA',
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

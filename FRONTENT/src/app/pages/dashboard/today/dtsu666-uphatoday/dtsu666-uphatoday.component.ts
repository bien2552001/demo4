import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format, subDays } from 'date-fns';
import * as moment from 'moment';

//------------------- Dùng chung tất cả biểu đồ ------------------------
// Đăng kí 1 lần dùng cho tất cả các biểu đồ , không cần đăng kí lại ở các lớp khác 
Chart.register(...registerables);
Chart.register(ChartDataLabels);
// Tất cả màu trong biểu đồ
Chart.defaults.color = '#808080';
// font trục x,y 
Chart.defaults.font.size = 10;
//----------------------hết-Dùng chung tất cả biểu đồ---------------------



@Component({
  selector: 'app-dtsu666-uphatoday',
  templateUrl: './dtsu666-uphatoday.component.html',
  styleUrls: ['./dtsu666-uphatoday.component.css']
})
export class Dtsu666UphatodayComponent implements OnInit {
  // Biến 
  public dtsu666_dienappha_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_iphatoday();
  }
  async dtsu666_iphatoday() {

    this.dtsu666today.DTSU666_dienappha_today().subscribe(
      result => {
        this.dtsu666_dienappha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.dtsu666_dienappha_today.map(data => data.Ua);
        const ub = this.dtsu666_dienappha_today.map(data => data.Ub);
        const uc = this.dtsu666_dienappha_today.map(data => data.Uc);
        const date_ua = this.dtsu666_dienappha_today.map(data => data.Date);
        // Tính trung bình
        const avgArray_ua = Array.from({ length: ua.length }, () => ua.reduce((acc, val) => acc + val) / ua.length);
        const avgArray_ub = Array.from({ length: ub.length }, () => ub.reduce((acc, val) => acc + val) / ub.length);
        const avgArray_uc = Array.from({ length: uc.length }, () => uc.reduce((acc, val) => acc + val) / uc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapphatoday');
        if (chart) {
        }


        this.mychart = new Chart('dtsu666_dienapphatoday', {
          type: 'line',
          data: {
            labels: date_ua.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: false,
              },
              {
                label: 'Uatb',
                data: avgArray_ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: false,
              },
              {
                label: 'Ub',
                data: ub,
                hidden: true,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.5,
                pointRadius: 0.5,
              },
              {
                label: 'Ubtb',
                data: avgArray_ub,
                hidden: true,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 0,
              },
              {
                label: 'Uc',
                data: uc,
                hidden: true,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.5,
                pointRadius: 0.5,
              },
              {
                label: 'Uctb',
                data: avgArray_uc,
                hidden: true,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
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
                //ticks: {
                //  font: {
                //    size: 10
                //  }
                //}
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







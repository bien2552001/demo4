import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-dtsu666-dienappha-today',
  templateUrl: './dtsu666-dienappha-today.component.html',
  styleUrls: ['./dtsu666-dienappha-today.component.css']
})
export class Dtsu666DienapphaTodayComponent implements OnInit {

  public dtsu666_dienappha_today!: Array<DashBoardModel>;
  myChart1!: Chart;
  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.P1bieudoduongconnectdata();
  }

  //-------- Bieu do 1----------


  async P1bieudoduongconnectdata() {

  this.dtsu666today.DTSU666_dienappha_today().subscribe(

      result => {
        this.dtsu666_dienappha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const ua = this.dtsu666_dienappha_today.map(data => data.Ua);
        const ub = this.dtsu666_dienappha_today.map(data => data.Ub);
        const uc = this.dtsu666_dienappha_today.map(data => data.Uc);
        const date1 = this.dtsu666_dienappha_today.map(data => data.Date);

        // lấy giá trị cuối cùng của mỗi phần tử 
        const ua1 = ua[ua.length - 1];
        const ub1 = ub[ub.length - 1];
        const uc1 = uc[uc.length - 1];

        ////Hỗ trợ vẽ chi tiết cho biểu đồ ( dùng cho biểu đồ đường)
        //const minUa1Value = Math.min(ua1);
        //const minUb1Value = Math.min(ub1);
        //const minUc1Value = Math.min(uc1);
        //const suggestedMinYValue = Math.min(minUa1Value, minUb1Value, minUc1Value);
        // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới 
        if (this.myChart1) {
          this.myChart1.destroy();
        }

         new Chart('dtsu666_dienappha_today', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            labels: date1.map(date => format(new Date(date), 'hh:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua1,
                borderColor: 'red',
                backgroundColor: 'red',
              },
              {
                label: 'Ub',
                data: ub1,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1,
              },
              {
                label: 'Uc',
                data: uc1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                color: '#cccccc',
                display: true,
                anchor: 'end',
                align: 'top',
                font: {
                  size: 10
                },
                formatter: function (value, context) {
                  return value + 'V';
                }
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                offset: true,
                //suggestedMin: suggestedMinYValue,   // thiết lập suggestedMin để sát với giá trị nhất
                grid: {
                  color: '#2d2b2b'
                }
              }
            },
          },
        });
      });
  }

}

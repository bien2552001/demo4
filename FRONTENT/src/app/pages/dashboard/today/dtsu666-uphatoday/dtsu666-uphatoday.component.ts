import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format, subDays } from 'date-fns';

//------------------- Dùng chung tất cả biểu đồ ------------------------
// Đăng kí 1 lần dùng cho tất cả các biểu đồ , không cần đăng kí lại ở các lớp khác 
Chart.register(...registerables);
Chart.register(ChartDataLabels);
// Tất cả màu trong biểu đồ
 Chart.defaults.color = '#808080';
//-------------------------------------------------------------------------------
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
    this.dtsu666_uphatoday();
  }

  private dtsu666_uphatoday() {

    this.dtsu666today.DTSU666_dienappha_today().subscribe(

      result => {
        this.dtsu666_dienappha_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.dtsu666_dienappha_today.map(data => data.Ua);
        const ub = this.dtsu666_dienappha_today.map(data => data.Ub);
        const uc = this.dtsu666_dienappha_today.map(data => data.Uc);
        //const date1 = this.dtsu666_dienappha_today.map(data => data.Date);

        // lấy giá trị cuối cùng của mỗi phần tử
        const ua1 = ua[ua.length - 1];
        const ub1 = ub[ub.length - 1];
        const uc1 = uc[uc.length - 1];

        // Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới 
        if (this.mychart)
        { this.mychart.destroy();
        }


        this.mychart = new Chart('dtsu666_dienapphatoday', {
          type: 'bar',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse().map(date => format(date, 'MMM dd')),
            labels: ['Ua', 'Ub', 'Uc'],
            datasets: [{
              //barPercentage: 1,
              categoryPercentage: 1,
              barThickness: 40,
              //maxBarThickness: 50,
              minBarLength: 1.5,
              label: 'Value',
              data: [ua1, ub1, uc1],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            aspectRatio: 1.5,
            plugins: {
              datalabels: {
                color: '#cccccc',
                display: true,
                anchor: 'end',
                align: 'top',
                font: {
                  size: 10
                },
                formatter: function (value) {
                  return value + ' V';
                }
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
                  bottom: 20
                }
              },
              legend: {
              display: false
              },
            },
          },
          plugins: [ChartDataLabels]
        });
      }
    )
  }

}







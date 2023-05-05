import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dtsu666-udaytoday',
  templateUrl: './dtsu666-udaytoday.component.html',
  styleUrls: ['./dtsu666-udaytoday.component.css']
})
export class Dtsu666UdaytodayComponent implements OnInit {
  // Biến 
  public dtsu666_dienapday_today!: Array<DashBoardModel>;
  mychart11!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_udaytoday();
  }

  private dtsu666_udaytoday() {

    this.dtsu666today.DTSU666_dienapday_today().subscribe(

      result => {
        this.dtsu666_dienapday_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const uab = this.dtsu666_dienapday_today.map(data => data.Uab);
        const ubc = this.dtsu666_dienapday_today.map(data => data.Ubc);
        const uca = this.dtsu666_dienapday_today.map(data => data.Uca);

        // lấy giá trị cuối cùng của mỗi phần tử
        const ua1 = uab[uab.length - 1];
        const ub1 = ubc[ubc.length - 1];
        const uc1 = uca[uca.length - 1];

        //// Kiểm tra xem biểu đồ tồn tại hay chưa , nếu tồn tại biều đồ cũ sẽ hủy nó và tạo biểu đồ mới 
        //if (this.mychart11) {
        //  this.mychart11.destroy();
        //}

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapday1today');
        if (chart) {
          chart.destroy();
        }

        this.mychart11 = new Chart('dtsu666_dienapday1today', {
          type: 'bar',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse().map(date => format(date, 'MMM dd')),
            labels: ['Uab', 'Ubc', 'Uca'],
            datasets: [{
              //barPercentage: 1,
              categoryPercentage: 1,
              barThickness: 40,
              //maxBarThickness: 50,
              minBarLength: 1.5,
              label: 'Value',
              data: [ua1, ub1, uc1],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
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
                text: 'ĐIỆN ÁP DÂY',
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

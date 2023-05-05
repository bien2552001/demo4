import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { format, subDays } from 'date-fns';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dtsu666-uphalastweek',
  templateUrl: './dtsu666-uphalastweek.component.html',
  styleUrls: ['./dtsu666-uphalastweek.component.css']
})
export class Dtsu666UphalastweekComponent implements OnInit {
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

        // Tính trung bình

        // Tính tổng các giá trị trong mảng ua
        const sum = ua.reduce((total, current) => total + current, 0);

        // Tính số lần đo
        const count = ua.length;

        // Tính giá trị trung bình
        const average = sum / count;

        // Làm tròn giá trị trung bình sau dấu phẩy một số
        const roundedAverage = average.toFixed(1);

        console.log(`Giá trị trung bình của ua là: ${roundedAverage}`);


        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapphalastweek');
        if (chart) {
          chart.destroy();
        }

        new Chart('dtsu666_dienapphalastweek', {
          type: 'bar',
          data: {
            labels: Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse().map(date => format(date, 'MMM dd')),
            datasets: [
              {
                label: 'Dataset 1',
                data: [roundedAverage, uc1],
                backgroundColor: 'red',
              },
              {
                label: 'Dataset 2',
                data: [ub1, ub1],
                backgroundColor: 'blue',
              },
              {
                label: 'Dataset 3',
                data: [uc1, ua1],
                backgroundColor: 'green',
              },
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          }
          //type: 'bar',
          //data: {
          //  //labels: Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse().map(date => format(date, 'MMM dd')),
          //  labels: ['Ua', 'Ub', 'Uc'],
          //  datasets: [{
          //    //barPercentage: 1,
          //    categoryPercentage: 1,
          //    barThickness: 40,
          //    //maxBarThickness: 50,
          //    minBarLength: 1.5,
          //    label: 'Value',
          //    data: [ua1, ub1, uc1],
          //    backgroundColor: [
          //      'rgba(255, 99, 132, 0.2)',
          //      'rgba(255, 159, 64, 0.2)',
          //      'rgba(255, 205, 86, 0.2)',
          //    ],
          //    borderColor: [
          //      'rgb(255, 99, 132)',
          //      'rgb(255, 159, 64)',
          //      'rgb(255, 205, 86)',
          //    ],
          //    borderWidth: 1
          //  }]
          //},
          //options: {
          //  maintainAspectRatio: false,
          //  responsive: true,
          //  aspectRatio: 1.5,
          //  plugins: {
          //    datalabels: {
          //      color: '#cccccc',
          //      display: true,
          //      anchor: 'end',
          //      align: 'top',
          //      font: {
          //        size: 10
          //      },
          //      formatter: function (value) {
          //        return value + ' V';
          //      }
          //    },
          //    subtitle: {
          //      display: true,
          //      text: 'ĐIỆN ÁP PHA',
          //      font: {
          //        size: 15,
          //        family: "'Nunito', sans-serif",
          //      },
          //      color: 'white',
          //      padding: {
          //        top: 5,
          //        bottom: 20
          //      }
          //    },
          //    legend: {
          //      display: false
          //    },
          //  },
          //},
          ///*plugins: [ChartDataLabels]*/
        });
      }
    )
  }

}

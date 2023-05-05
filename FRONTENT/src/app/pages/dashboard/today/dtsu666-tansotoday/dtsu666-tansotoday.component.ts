import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dtsu666-tansotoday',
  templateUrl: './dtsu666-tansotoday.component.html',
  styleUrls: ['./dtsu666-tansotoday.component.css']
})
export class Dtsu666TansotodayComponent implements OnInit {
  // Biến 
  public dtsu666_tanso_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_udaytoday();
  }

  private dtsu666_udaytoday() {

    this.dtsu666today.DTSU666_tan_today().subscribe(

      result => {
        this.dtsu666_tanso_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const hz = this.dtsu666_tanso_today.map(data => data.Hz);


        // lấy giá trị cuối cùng của mỗi phần tử
        const hz1 = hz[hz.length - 1];

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_tansotoday');
        if (chart) {
          chart.destroy();
        }


        this.mychart = new Chart('dtsu666_tansotoday', {
          type: 'doughnut',
          data: {
            datasets: [{
              label: 'Value',
              data: [hz1],
              borderColor: 'black',
              backgroundColor: '#32CD32',
              hoverOffset: 4,
              borderWidth:3
            }]
          },
          options: {
            plugins: {
              datalabels: {
                color: '#90EE90',
                display: true,
                anchor: 'end',
                align: 'top',
                font: {
                  size: 50
                },
                formatter: function (value) {
                  return value + ' Hz';
                }
              },
              //subtitle: {
              //  display: true,
              //  text: 'TẦN SỐ',
              //  font: {
              //    size: 15,
              //    family: "'Nunito', sans-serif",
              //  },
              //  color: 'white',
              //  padding: {
              //    top: 5,
              //    bottom: 5
              //  }
              //},
            },
            cutout: 80, // set cutoutPercentage to 50%
            circumference: 180,
            rotation: -90,
            scales: {
              x: {

                }
              }
          }
        });



          //type: 'doughnut',
          //data: {
          //  labels: ['Uab', 'Ubc', 'Uca'],
          //  datasets: [{
          //    label: 'Value',
          //    data: [ua1, ub1, uc1],
          //    backgroundColor: [
          //      'rgba(75, 192, 192, 0.2)',
          //      'rgba(153, 102, 255, 0.2)',
          //      'rgba(255, 159, 64, 0.2)',
          //    ],
          //    borderColor: [
          //      'rgba(75, 192, 192, 1)',
          //      'rgba(153, 102, 255, 1)',
          //      'rgba(255, 159, 64, 1)',
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
          //      text: 'ĐIỆN ÁP DÂY',
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
          //plugins: [ChartDataLabels]
        
      }
    )
  }
}

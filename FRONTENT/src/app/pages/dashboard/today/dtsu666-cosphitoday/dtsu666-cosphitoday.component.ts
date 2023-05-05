import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DashBoardModel } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
@Component({
  selector: 'app-dtsu666-cosphitoday',
  templateUrl: './dtsu666-cosphitoday.component.html',
  styleUrls: ['./dtsu666-cosphitoday.component.css']
})
export class Dtsu666CosphitodayComponent implements OnInit {

  // Biến 
  public dtsu666_cosphi_today!: Array<DashBoardModel>;
  mychart!: Chart;

  constructor(private dtsu666today: DashboardService) { }

  ngOnInit(): void {
    this.dtsu666_cosphitoday();
  }

  public dtsu666_cosphitoday() {

    this.dtsu666today.DTSU666_cosphi_today().subscribe(

      result => {
        this.dtsu666_cosphi_today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const cosft = this.dtsu666_cosphi_today.map(data => data.Cosft);
        const cosfa = this.dtsu666_cosphi_today.map(data => data.Cosfa);
        const cosfb = this.dtsu666_cosphi_today.map(data => data.Cosfb);
        const cosfc = this.dtsu666_cosphi_today.map(data => data.Cosfc);

        // lấy giá trị cuối cùng của mỗi phần tử
        const ft1 = cosft[cosft.length - 1];
        const fa1 = cosfa[cosfa.length - 1];
        const fb1 = cosfb[cosfb.length - 1];
        const fc1 = cosfc[cosfc.length - 1];

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_cosphitoday');
        if (chart) {
          chart.destroy();
        }


        this.mychart = new Chart('dtsu666_cosphitoday', {
          type: 'bar',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse().map(date => format(date, 'MMM dd')),
            labels: ['Cosft', 'Cosfa', 'Cosfb', 'Cosfc'],
            datasets: [{
              //barPercentage: 1,
              //categoryPercentage: 1,
              //barThickness: 40,
              ////maxBarThickness: 50,
              //minBarLength: 1.5,
              label: 'Value',
              data: [ft1, fa1, fb1, fc1],
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            //maintainAspectRatio: false,
            //responsive: true,
            //aspectRatio: 1.5,
            plugins: {
              datalabels: {
                color: '#cccccc',
                display: true,
                anchor: 'end',
                align: 'right',
                font: {
                  size: 10
                },
              },
              subtitle: {
                display: true,
                text: 'COSPHI',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 5
                }
              },
              legend: {
                display: false
              },
            },
            indexAxis: 'y',
            scales: {

              x: {
                type: 'linear',
                min:0,
                max:1.3
              },
              //y: {
              //  type: 'linear',
              //  min: 0,
              //  max: 1.5
              //}
            }
          },
          plugins: [ChartDataLabels]
        });
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { format, subMonths } from 'date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-testchartjs123',
  templateUrl: './testchartjs123.component.html',
  styleUrls: ['./testchartjs123.component.css']
})
export class Testchartjs123Component implements OnInit {
  mychart!: Chart;
  // Tất cả màu trong biểu đồ
  label = Chart.defaults.color = '#808080';

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    //1.1 Cơ bản
    this.GETTING_STEPBYSTEP_1_1_Coban();
  }

  //1.1 Cơ bản
  public GETTING_STEPBYSTEP_1_1_Coban() {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    new Chart('stepbystep_chart',
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ],
        },
        options: {
          plugins: {
            datalabels: {
              color: '#cccccc',
              display: true,
              anchor: 'end',
              align: 'right',
              font: {
                size: 10
              },
              formatter: function (value, context) {
                return value + 'V';
              }
            }
          },
          //Thanh ngang
          indexAxis: 'y',
          //scales: {
          //  y: {
          //    beginAtZero: true,
          //    grid: {
          //      color: 'rgba(255,255,255,0.2)'
          //    },
          //  }
          //}
        },
        plugins: [ChartDataLabels]
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sabor',
  templateUrl: './sabor.component.html',
  styleUrls: ['./sabor.component.css']
})
export class SaborComponent implements OnInit {
  sabor: string;
  Limon: string;
  Fresa: string;
  Sandia: string;
  public pieChartLabels: Label[] = [['Limon'], ['Fresa'], 'Sandia'];
  public pieChartData: number[] = [8, 10, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.actualizarSabores();
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  async actualizarSabores() {
    (await this.dataService.contar('http://localhost:3000/api/Limon')).subscribe((resultado) => {
      localStorage.setItem('Limón', resultado.toString());
    });
    (await this.dataService.contar('http://localhost:3000/api/Fresa')).subscribe((resultado) => {
      localStorage.setItem('Fresa', resultado.toString());
    });
    (await this.dataService.contar('http://localhost:3000/api/Sandia')).subscribe((resultado) => {
      localStorage.setItem('Sandia', resultado.toString());
    });
  }

  async actualizarS() {
    this.actualizarSabores();
    this.Limon = localStorage.getItem('Limón');
    this.Fresa = localStorage.getItem('Fresa');
    this.Sandia = localStorage.getItem('Sandia');

    await console.log(this.Limon, this.Fresa, this.Sandia);
    this.pieChartData = [ parseInt(this.Limon), parseInt(this.Fresa), parseInt(this.Sandia) ];
  }

}

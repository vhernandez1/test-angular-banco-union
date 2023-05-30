import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { DataGraficaConsultorParcial } from 'src/app/model/data-grafica-consultor.model';
import { DesempenhoTotalConsultorFinal } from 'src/app/model/desempenho-consultor-total-final.model';
import { DesempenhoService } from 'src/app/service/desempenho.service';

@Component({
  selector: 'app-desempehno-consultor',
  templateUrl: './desempehno-consultor.component.html',
  styleUrls: ['./desempehno-consultor.component.css']
})
export class DesempehnoConsultorComponent implements OnInit {

  clientesByConsultor: Cliente[];
  consultorSelected: string;
  dataGraficaConsultorParcial: DataGraficaConsultorParcial;

  desempenhoTotalFila: DesempenhoTotalConsultorFinal[] = [
    { totalComissaoFinal: 0, totalLiquidoFinal: 0, totalSumFinal: 0, totalSumImpuesto: 0 }
  ];

  displayedColumns: string[] = ['Total', 'valorLiquido', 'comissao'];


  constructor(private desempenhoService: DesempenhoService) { }


  ngOnInit(): void {

    this.desempenhoService.getSearchClientesByConsultorObservable().subscribe(clientes => {
      this.clientesByConsultor = clientes;
    });

    this.desempenhoService.getConsultorSelectedObservable().subscribe(consultorSelected => {
      this.consultorSelected = consultorSelected;
    });

    this.desempenhoService.getSumaTotalParcialSubjectObservable().subscribe(desempenhoTotalConsultor => {
      this.desempenhoTotalFila[0].totalComissaoFinal =
        this.desempenhoTotalFila[0].totalComissaoFinal + desempenhoTotalConsultor.totalComissao;

      this.desempenhoTotalFila[0].totalLiquidoFinal =
        this.desempenhoTotalFila[0].totalComissaoFinal + desempenhoTotalConsultor.totalLiquido;

      this.desempenhoTotalFila[0].totalSumFinal =
        this.desempenhoTotalFila[0].totalSumFinal + desempenhoTotalConsultor.totalSum;

      this.desempenhoTotalFila[0].totalSumFinal =
        this.desempenhoTotalFila[0].totalSumFinal + desempenhoTotalConsultor.totalSum;

      this.desempenhoTotalFila[0].totalSumFinal =
        this.desempenhoTotalFila[0].totalSumFinal + desempenhoTotalConsultor.totalSum;
    });
  }

}
